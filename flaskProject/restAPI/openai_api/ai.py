import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env
load_dotenv()

# Retrieve the API key from environment variables
openai_api_key = os.getenv("OPENAI_API_KEY")

# Set the API key
client = OpenAI(api_key=openai_api_key)

def generate_study_plan(goal):
    # Define the prompt for generating the study plan
    # Generate the study plan
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a study assistant, skilled in breaking down goals into actionable tasks."},
            {"role": "user", "content": f"What are the steps I should take to {goal}?"}
        ]
    )
    
    return completion.choices[0].message.content

# Example
student_goal = "Study for math exam"
study_plan = generate_study_plan(student_goal)

print("Study Plan:")
print(study_plan)