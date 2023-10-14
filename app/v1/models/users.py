"""
Set up database tables for data storage
"""
from operator import is_
from flask_login import UserMixin
from sqlalchemy.sql import func
from db import db as database


class User(database.Model, UserMixin):
    """User class for storing user information"""
    __tablename__ = 'users'
    id = database.Column(database.Integer, primary_key=True)
    username = database.Column(database.String(64), nullable=False, unique=True)
    email = database.Column(database.String(128), nullable=False, unique=True)
    password = database.Column(database.String(128), nullable=False)
    is_active = database.Column(database.Boolean(), default=True)
    created_at = database.Column(database.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = database.Column(database.DateTime(timezone=True),
                           server_default=func.now(),
                           onupdate=func.now())

    def __init__(self, username, email, password):
        """Initialize a new user"""
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        """Return a string representation of this user"""
        return '<User %r>' % self.username
    
    def to_dict(self):
        """Return a dictionary representation of this user"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    def save(self):
        """Save this user to the database"""
        database.session.add(self)
        database.session.commit()
    
    def delete(self):
        """Delete this user from the database"""
        database.session.delete(self)
        database.session.commit()

    
    def get_id(self):
        """Return the id of this user"""
        return self.id
    
    @property
    def is_authenticated(self):
        """Return True if this user is authenticated"""
        return True
    
    @property
    def is_anonymous(self):
        """Return False if this user is not anonymous"""
        return False
    
    

    