from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
import sqlite3
import os
from datetime import datetime

# ============================================================
# TONY AI - AUTONOMOUS MULTI-AGENT BACKEND
# ============================================================

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=api_key)

app = FastAPI(title="TONY AI Autonomous Backend")


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# DATABASE / MEMORY CORE
# ============================================================

DB_PATH = "tony_memory.db"


def init_database():
    connection = sqlite3.connect(DB_PATH)

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS memories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_message TEXT NOT NULL,
            agent TEXT NOT NULL,
            ai_response TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


init_database()


def save_memory(user_message, agent, ai_response):

    connection = sqlite3.connect(DB_PATH)

    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO memories
        (user_message, agent, ai_response, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (
            user_message,
            agent,
            ai_response,
            datetime.now().isoformat()
        )
    )

    connection.commit()
    connection.close()


def get_recent_memories(limit=5):

    connection = sqlite3.connect(DB_PATH)

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT user_message, agent, ai_response, created_at
        FROM memories
        ORDER BY id DESC
        LIMIT ?
        """,
        (limit,)
    )

    rows = cursor.fetchall()

    connection.close()

    return rows


# ============================================================
# REQUEST MODEL
# ============================================================

class ChatRequest(BaseModel):
    message: str
    agent: str = "AUTO"


# ============================================================
# AGENT DEFINITIONS
# ============================================================

SYSTEM_PROMPTS = {

    "Developer Core": """
You are TONY's Developer Core.

Your specialization:
- Python
- Java
- JavaScript
- React
- APIs
- debugging
- algorithms
- software architecture
- databases
- development tools

Give practical, accurate technical answers.
When writing code, provide clean and usable code.
""",

    "Security Core": """
You are TONY's Security Core.

Your specialization:
- cybersecurity
- networking
- secure coding
- threat analysis
- vulnerability analysis
- malware analysis
- defensive security

Focus on ethical and defensive cybersecurity.
""",

    "Research Core": """
You are TONY's Research Core.

Your specialization:
- research
- technical explanations
- comparisons
- learning
- analysis
- summarization
- knowledge discovery

Give structured and evidence-oriented answers.
""",

    "Career Core": """
You are TONY's Career Core.

Your specialization:
- resumes
- interviews
- career planning
- job preparation
- professional communication
- professional development

Give practical career guidance.
"""
}


# ============================================================
# AUTONOMOUS AGENT ROUTER
# ============================================================

def select_agent(message):

    text = message.lower()

    developer_keywords = [
        "code",
        "python",
        "java",
        "javascript",
        "react",
        "bug",
        "error",
        "program",
        "function",
        "api",
        "database",
        "sql",
        "github",
        "terminal",
        "npm",
        "vite",
        "fastapi"
    ]

    security_keywords = [
        "security",
        "cyber",
        "virus",
        "malware",
        "hack",
        "hacking",
        "attack",
        "threat",
        "vulnerability",
        "firewall",
        "network"
    ]

    research_keywords = [
        "research",
        "study",
        "explain",
        "analyze",
        "analysis",
        "compare",
        "information",
        "learn",
        "what is",
        "how does"
    ]

    career_keywords = [
        "career",
        "resume",
        "cv",
        "interview",
        "job",
        "linkedin",
        "employment",
        "placement"
    ]

    scores = {
        "Developer Core": 0,
        "Security Core": 0,
        "Research Core": 0,
        "Career Core": 0
    }

    for keyword in developer_keywords:
        if keyword in text:
            scores["Developer Core"] += 1

    for keyword in security_keywords:
        if keyword in text:
            scores["Security Core"] += 1

    for keyword in research_keywords:
        if keyword in text:
            scores["Research Core"] += 1

    for keyword in career_keywords:
        if keyword in text:
            scores["Career Core"] += 1

    selected_agent = max(scores, key=scores.get)

    if scores[selected_agent] == 0:
        selected_agent = "Research Core"

    return selected_agent


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():

    return {
        "status": "online",
        "project": "TONY AI Autonomous Backend",
        "version": "2.0"
    }


# ============================================================
# HEALTH
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "memory": "connected",
        "agents": len(SYSTEM_PROMPTS)
    }


# ============================================================
# MEMORY
# ============================================================

@app.get("/memory")
def memory():

    memories = get_recent_memories(20)

    return {
        "count": len(memories),
        "memories": [
            {
                "message": row[0],
                "agent": row[1],
                "response": row[2],
                "created_at": row[3]
            }
            for row in memories
        ]
    }


# ============================================================
# CHAT
# ============================================================

@app.post("/chat")
def chat(request: ChatRequest):

    try:

        # ----------------------------------------------------
        # Autonomous agent selection
        # ----------------------------------------------------

        if request.agent == "AUTO":
            selected_agent = select_agent(request.message)
        else:
            selected_agent = request.agent

        system_prompt = SYSTEM_PROMPTS.get(
            selected_agent,
            SYSTEM_PROMPTS["Research Core"]
        )

        # ----------------------------------------------------
        # Retrieve recent memory
        # ----------------------------------------------------

        memories = get_recent_memories(5)

        memory_context = ""

        if memories:

            memory_context = "\n\nRecent TONY memory:\n"

            for memory in reversed(memories):

                memory_context += (
                    f"- User: {memory[0]}\n"
                    f"  Agent: {memory[1]}\n"
                    f"  TONY: {memory[2]}\n"
                )

        # ----------------------------------------------------
        # Build autonomous prompt
        # ----------------------------------------------------

        prompt = f"""
You are TONY, an autonomous multi-agent AI system.

Current active agent:
{selected_agent}

{system_prompt}

Your responsibilities:

1. Understand the user's intent.
2. Use the capabilities of the active agent.
3. Consider relevant recent memory.
4. Give a useful and direct response.
5. Do not mention internal implementation details unless asked.
6. Maintain continuity with previous interactions.

{memory_context}

Current user request:

{request.message}
"""

        # ----------------------------------------------------
        # Gemini Interactions API
        # ----------------------------------------------------

        interaction = client.interactions.create(
            model="gemini-3.6-flash",
            input=prompt
        )

        reply = interaction.output_text

        # ----------------------------------------------------
        # Save memory
        # ----------------------------------------------------

        save_memory(
            request.message,
            selected_agent,
            reply
        )

        # ----------------------------------------------------
        # Response
        # ----------------------------------------------------

        return {
            "reply": reply,
            "agent": selected_agent,
            "interaction_id": interaction.id,
            "memory_saved": True
        }

    except Exception as error:

        print(f"TONY AI ERROR: {error}")

        raise HTTPException(
            status_code=500,
            detail="TONY AI service failed."
        )
