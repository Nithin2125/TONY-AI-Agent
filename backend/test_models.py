from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

for model in client.models.list():
    actions = getattr(model, "supported_actions", [])
    if "generateContent" in actions:
        print(model.name)

      