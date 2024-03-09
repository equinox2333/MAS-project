# app.py

# Required imports
# import os
# from flask import Flask, request, jsonify
# from firebase_admin import credentials, firestore, initialize_app
#
# # Initialize Flask app
# app = Flask(__name__)
#
# # Initialize Firestore DB
# cred = credentials.Certificate('key.json')
# default_app = initialize_app(cred)
# db = firestore.client()
# todo_ref = db.collection('todos')
#
# @app.route('/add', methods=['POST'])
# def create():
#     """
#         create() : Add document to Firestore collection with request body.
#         Ensure you pass a custom ID as part of json body in post request,
#         e.g. json={'id': '1', 'title': 'Write a blog post'}
#     """
#     try:
#         id = request.json['id']
#         todo_ref.document(id).set(request.json)
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return f"An Error Occurred: {e}"
#
# @app.route('/list', methods=['GET'])
# def read():
#     """
#         read() : Fetches documents from Firestore collection as JSON.
#         todo : Return document that matches query ID.
#         all_todos : Return all documents.
#     """
#     try:
#         # Check if ID was passed to URL query
#         todo_id = request.args.get('id')
#         if todo_id:
#             todo = todo_ref.document(todo_id).get()
#             return jsonify(todo.to_dict()), 200
#         else:
#             all_todos = [doc.to_dict() for doc in todo_ref.stream()]
#             return jsonify(all_todos), 200
#     except Exception as e:
#         return f"An Error Occurred: {e}"
#
# @app.route('/update', methods=['POST', 'PUT'])
# def update():
#     """
#         update() : Update document in Firestore collection with request body.
#         Ensure you pass a custom ID as part of json body in post request,
#         e.g. json={'id': '1', 'title': 'Write a blog post today'}
#     """
#     try:
#         id = request.json['id']
#         todo_ref.document(id).update(request.json)
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return f"An Error Occurred: {e}"
#
# @app.route('/delete', methods=['GET', 'DELETE'])
# def delete():
#     """
#         delete() : Delete a document from Firestore collection.
#     """
#     try:
#         # Check for ID in URL query
#         todo_id = request.args.get('id')
#         todo_ref.document(todo_id).delete()
#         return jsonify({"success": True}), 200
#     except Exception as e:
#         return f"An Error Occurred: {e}"
#
# port = int(os.environ.get('PORT', 8080))
# if __name__ == '__main__':
#     app.run(threaded=True, host='0.0.0.0', port=port)


from flask import Flask, session, request, redirect, render_template
import pyrebase
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
@app.route('/', methods=['POST','GET'])
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
    return render_template('home.html')

@app.route('/logout')
def logout():
    session.pop('user')
    return redirect('/')
if __name__ == '__main__':
    app.run()