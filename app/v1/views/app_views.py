"""
Application views that handle template rendering
"""

from flask import Blueprint, render_template

app_views = Blueprint('app_views', __name__, url_prefix='/')

@app_views.route('/', strict_slashes=False)
def index():
    """Render index.html"""
    return render_template('index.html')


@app_views.route("login", strict_slashes=False)
def login():
    """Render the login page"""
    return render_template("login.html")


@app_views.route("register", strict_slashes=False)
def register():
    """Render the registration page"""
    return render_template("register.html")


@app_views.route("forgot-password", strict_slashes=False)
def forgot_password():
    """Render the forgot password page"""
    return render_template("reset.html")


@app_views.route("reset", strict_slashes=False)
def reset():
    """Render the password reset page"""
    return render_template("new-pw.html")
