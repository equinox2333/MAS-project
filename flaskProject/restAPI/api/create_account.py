import pyrebase

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

email = 'txing0011@gmail.com' #you can change the input here to be user input 
password = '123456' #you can change the input here to be user input 

user = auth.create_user_with_email_and_password(email, password)
# print(user)

# user = auth.sign_in_with_email_and_password(email, password)
# print(user)
# info = auth.get_account_info(user['idToken'])
# print(info)

# auth.send_email_verification(user['idToken'])
#
# auth.send_email_verification(user['idToken'])