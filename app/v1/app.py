#!/usr/bin/python3
"""
Flask app that integrates with a RESTFul API
"""
import os
from flask import Flask, render_template
from flask_login import LoginManager
from flask_cors import CORS
from db import db

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
login_manager = LoginManager()
cors = CORS(app, resources={r"/*": {"origins": "0.0.0.0"}})
app.secret_key = "secret"
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
login_manager.init_app(app)
login_manager.login_view = "app_views.login" # type: ignore

@login_manager.user_loader
def load_user(user_id):
    """Load user"""
    from models.users import User
    return User.query.get(int(user_id))


def register_blueprint():
    """Register blueprints"""
    from views.app_views import app_views
    app.register_blueprint(app_views)

register_blueprint()


@app.errorhandler(404)
def page_not_found(e):
    """Return a custom 404 error"""
    return render_template('404.html'), 404

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, threaded=True, debug=True)
