"""
Register form and login form
"""
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Email, EqualTo


class RegisterForm(FlaskForm):
    """Register form"""
    username = StringField('Username', validators=[DataRequired()], render_kw={"placeholder": "Ex: JohnDoe"})
    email = StringField('Email', validators=[DataRequired(), Email()], render_kw={"placeholder": "Ex: jdoe@agribot.io"})
    password = PasswordField("Password", validators=[DataRequired()], render_kw={"placeholder": "Ex: 123456"})
    confirm = PasswordField("Confirm Password", validators=[DataRequired(), EqualTo('password')], render_kw={"placeholder": "Ex: 123456"})
    submit = SubmitField("Register")


class LoginForm(FlaskForm):
    """Login form"""
    email = StringField('Email', validators=[DataRequired(), Email()], render_kw={"placeholder": "Ex: jdoe@agribot.io"})
    password = PasswordField("Password", validators=[DataRequired()], render_kw={"placeholder": "Ex: 123456"})
    remember = BooleanField("Remember Me")
    submit = SubmitField("Login")


class ForgotForm(FlaskForm):
    """Forgot password form"""
    email = StringField('Email', validators=[DataRequired(), Email()], render_kw={"placeholder": "Ex:jdoe@agribot.io"})
    submit = SubmitField("Send Email")


class ResetForm(FlaskForm):
    """
    Reset password form
    """
    new_password = PasswordField("New Password", validators=[DataRequired()], render_kw={"placeholder": "Ex: 123456"})
    confirm = PasswordField("Confirm Password", validators=[DataRequired(), EqualTo('new_password')], render_kw={"placeholder": "Ex: 123456"})
    submit = SubmitField("Reset Password")
