from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import uuid
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

db = firestore.client()
user_Ref = db.collection('user')

openai_api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=openai_api_key)

userAPI = Blueprint('userAPI', __name__)

def generate_study_plan(goal):
    try:
        # Generate the study plan using OpenAI
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a productivity assistant, skilled in breaking down goals into actionable tasks with steps about how to complete those tasks."},
                {"role": "user", "content": f"What are the tasks I should accomplish to complete {goal}? Break it down each task by a title and then a short description about how to complete each task. Do this in list form."}
            ]
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"Error generating study plan: {e}"




@userAPI.route('/add',methods=['POST'])
def create():
    try:
        # Extract data from request
        data = request.json
        goal = data.get('goal')
        # Generate study plan
        study_plan = generate_study_plan(goal)
        # Save study plan to database
        id = uuid.uuid4().hex
        user_Ref.document(id).set({"name": study_plan, "user_input":goal})
        return jsonify({"success": True, "study_plan_id": id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@userAPI.route('/list')
def read():
    try:
        all_users = [doc.to_dict() for doc in user_Ref.stream()]
        return jsonify(all_users),200
    except Exception as e:
        return f"Error: {e}"
