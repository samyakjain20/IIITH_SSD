from flask import Flask, render_template, url_for, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///main.db'
db = SQLAlchemy(app)

class UserClass(db.Model):
    username = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), primary_key=True)
    password = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return '<User %r>' % self.email


@app.route('/user/signup', methods=['POST'])
def index():
    if request.method == 'POST':
        username = request.json.get('username')
        email = request.json.get('email')
        password = request.json.get('password')

        if username is None or password is None:
            return "Enter username and password"
    
        # Check for existing users
        new_user = UserClass(username = username, email = email, password = password)
        try:
            db.session.add(new_user)
            db.session.commit()
            return (jsonify({'username': new_user.username}), 201)
        except:
            return 'There was an issue adding your task'
    else:
        return "INcorrect Req"


# @app.route('/delete/<int:id>')
# def delete(id):
#     task_to_delete = Todo.query.get_or_404(id)

#     try:
#         db.session.delete(task_to_delete)
#         db.session.commit()
#         return redirect('/')
#     except:
#         return 'There was a problem deleting that task'

# @app.route('/update/<int:id>', methods=['GET', 'POST'])
# def update(id):
#     task = Todo.query.get_or_404(id)

#     if request.method == 'POST':
#         task.content = request.form['content']

#         try:
#             db.session.commit()
#             return redirect('/')
#         except:
#             return 'There was an issue updating your task'

#     else:
#         return render_template('update.html', task=task)


if __name__ == '__main__':
    app.run(host='localhost', port=7200, debug=True, threaded=True)
