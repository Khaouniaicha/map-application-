from flask import Flask, render_template, url_for
import firebase_admin
from firebase_admin import credentials

app = Flask(__name__)

# Initialize Firebase Admin SDK
cred = credentials.Certificate("./confg.json")
firebase_admin.initialize_app(cred)




@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')


@app.route('/mapp')
def mapp():
    return render_template('mapp.html')

@app.route('/register')
def register():
    return render_template('registre.html')

@app.route('/home.html')
def home():
    return render_template('home.html')



if __name__ == '__main__':
    app.run(debug=True)
