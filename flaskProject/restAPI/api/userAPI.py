from flask import Blueprint, request, jsonify, Flask, session, redirect, render_template
from firebase_admin import firestore
import uuid
import os
import pyrebase
from dotenv import load_dotenv
from openai import OpenAI
from datetime import datetime

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
                {"role": "system", "content": "You are a study assistant, skilled in breaking down goals into actionable tasks."},
                {"role": "user", "content": f"What are the steps I should take to {goal}?"}
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
        user_Ref.document(id).set({"output": study_plan, 
                                   "user_input":goal,
                                   "createTime":datetime.now().strftime("%d/%m/%Y %H:%M:%S"),
                                   "id": id
                                   })
        return jsonify({"success": True, "study_plan_id": id, "study_plan": study_plan}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@userAPI.route('/list')
def read():
    try:
        all_users = [doc.to_dict() for doc in user_Ref.stream()]
        return jsonify(all_users),200
    except Exception as e:
        return f"Error: {e}"


#new parts that integrate authentication
app = Flask(__name__)
config = {
  'apiKey': "AIzaSyBtlZjqrSV20C3-5aS73fhSFaf1fI8YY9Y",
  'authDomain': "flask-test-a9df8.firebaseapp.com",
  'databaseURL': "https://flask-test-a9df8-default-rtdb.firebaseio.com",
  'projectId': "flask-test-a9df8",
  'storageBucket': "flask-test-a9df8.appspot.com",
  'messagingSenderId': "442349353641",
  'appId': "1:442349353641:web:112bf48c7cd058427187b8",
  'measurementId': "G-KY4CF8ER8W",
    'databaseURL': ''
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

app.secret_key = 'secret'
@app.route('/login', methods=['POST','GET'])

def index():
    if ('user' in session):
        return 'Hi, {}'.format(session['user'])
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        try:
            user = auth.sign_in_with_email_and_password(email, password)
            session['user'] = email
        except:
            return 'Failed to log in'
    return jsonify({"success": True}), 200
    # return render_template('home.html')

@app.route('/logout')
def logout():
    session.pop('user')
    return redirect('/')