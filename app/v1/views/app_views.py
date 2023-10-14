"""
Application views that handle template rendering
"""

from flask import Blueprint, flash, redirect, render_template, request, url_for
from forms import LoginForm, RegisterForm
from models.users import User
from flask_login import login_user, logout_user, login_required, current_user
from utils import check_password, hash_password


app_views = Blueprint('app_views', __name__, url_prefix='/')

@app_views.route('/', strict_slashes=False)
@app_views.route('home', strict_slashes=False)
@login_required
def home():
    """Render index.html"""
    return render_template('index.html')


@app_views.route("login", methods=["POST", "GET"], strict_slashes=False)
def login():
    """Render the login page"""
    if current_user.is_authenticated: # type: ignore
        return redirect(url_for("home"))
    form = LoginForm()
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        if email is None or email == "":
            flash("email is required", "error")
        elif password is None or password == "":
            flash("Password is required", "error")
        else:
            user = User.query.filter_by(email=email).first()
            if user is None or not check_password(password, user.password):
                flash("Incorrect email or password", "error")
            else:
                login_user(user, remember=form.remember.data)
                flash("Login successful", "success")
                return redirect(url_for("app_views.home"))
    return render_template("login.html", title="Login", form=form)


@app_views.route("register", methods=["POST", "GET"], strict_slashes=False)
def register():
    """Render the registration page"""
    if current_user.is_authenticated: # type: ignore
        return redirect(url_for("home"))
    form = RegisterForm()
    if request.method == "POST":
        username = request.form.get("username")
        email = request.form.get("email")
        password = request.form.get("password")
        confirm = request.form.get("confirm")
        if username is None or username == "":
            flash("Username is required", "error")
        elif email is None or email == "":
            flash("Email is required", "error")
        elif password is None or password == "":
            flash("Password is required", "error")
        elif confirm is None or confirm == "":
            flash("Please confirm your password", "error")
        elif password != confirm:
            flash("Passwords do not match", "error")
        else:
            user = User.query.filter_by(username=username).first()
            if user is not None:
                flash("Username already exists", "error")
            else:
                password = hash_password(password)
                user = User(username, email, password)
                user.save()
                flash("Registration successful", "success")
                return redirect(url_for("app_views.login"))
    return render_template("register.html", title="Register", form=form)


@app_views.route("logout", strict_slashes=False)
def logout():
    """Log a user out"""
    logout_user()
    return redirect(url_for("app_views.login"))


@app_views.route("forgot-password", methods=["POST", "GET"], strict_slashes=False)
def forgot_password():
    """Render the forgot password page"""
    return render_template("reset.html")


@app_views.route("reset", strict_slashes=False)
def reset():
    """Render the password reset page"""
    return render_template("new-pw.html")
