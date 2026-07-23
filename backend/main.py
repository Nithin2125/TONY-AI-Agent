from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
import os

# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=api_key)

app = FastAPI(title="TONY AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # We'll secure this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    agent: str


@app.get("/")
def root():
    return {
        "status": "online",
        "project": "TONY AI Backend"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


SYSTEM_PROMPTS = {
    "Developer Core": (
        "You are TONY's Developer Core. "
        "Help with programming, debugging, algorithms, software architecture, "
        "and explain code clearly."
    ),

    "Security Core": (
        "You are TONY's Security Core. "
        "Help with cybersecurity, networking, malware analysis, secure coding, "
        "and defensive security."
    ),

    "Research Core": (
        "You are TONY's Research Core. "
        "Provide detailed research, summaries, comparisons, and explanations."
    ),

    "Career Core": (
        "You are TONY's Career Core. "
        "Help with resumes, interview preparation, career planning, and professional development."
    )
}


@app.post("/chat")
def chat(request: ChatRequest):

    system_prompt = SYSTEM_PROMPTS.get(
        request.agent,
        "You are TONY, an intelligent AI assistant."
    )

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=f"""
{system_prompt}

User:
{request.message}
"""
    )

    return {
        "reply": response.text
    }