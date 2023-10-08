from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class Users(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-chats.user', '-_password_hash',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    number = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    profile_pic = db.Column(db.String)
    _password_hash = db.Column(db.String, nullable = False)

    # one to many relationship
    chats = db.relationship('Chats', backref='user')

    @hybrid_property
    def password_hash(self):
        return 'Unauthorized'
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'
            )
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @validates('email')
    def validate_email(self, key, email):
        if '@' not in email:
            raise ValueError('Invalid Email')
        return email

class Contacts(db.Model, SerializerMixin):
    __tablename__ = 'contacts'

    serialize_rules = ('-chats.contact',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    number = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    profile_pic = db.Column(db.String)

    # one to many relationship
    chats = db.relationship('Chats', backref='contact')

class Chats(db.Model, SerializerMixin):
    __tablename__ = 'chats'

    serialize_rules = ('-contact.chats', '-user.chats','-contact_id', '-user_id', '-created_at')

    id = db.Column(db.Integer, primary_key=True)
    messages = db.Column(db.String)
    responses = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    contact_id = db.Column(db.Integer, db.ForeignKey('contacts.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))