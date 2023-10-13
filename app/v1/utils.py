"""
Define utility functions here
"""
from bcrypt import hashpw, gensalt, checkpw


def hash_password(password):
    """Hash a password"""
    return hashpw(password.encode('utf-8'), gensalt())


def check_password(password, hashed):
    """Check a password against a hash"""
    return checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

