from flask import make_response, jsonify, request, session, render_template
from flask_restful import Resource
from werkzeug.exceptions import BadRequest


from config import app, db, api
from models import  Users, Contacts, Chats

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///chatwave.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False


@app.route('/signup')
def index():
    return render_template("index.html")
    
class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_user = Users(
                name = data.get('name'),
                email = data.get('email'),
                number = data.get('number')
            )
            new_user.password_hash = data.get('password')

            db.session.add(new_user)
            db.session.commit()

            session['user'] = new_user.id

            user_dict = {
                "id": new_user.id,
                "name": new_user.name,
                "number": new_user.number,
            }

            result = make_response(
                jsonify(user_dict),
                200
            )
            return result
        
        except ValueError:
            raise BadRequest(["validation errors"])
        
class Login(Resource):
    def post(self):
        user = Users.query.filter(Users.email == request.get_json()['email']).first()
        if user:
            session['user'] = user.id
            response = make_response(
                jsonify(user.to_dict()),
                200
            )
            return response
        else:
            return jsonify({"message":"You do not have an account"})
    
class Logout(Resource):
    def delete(self):
        session["user"] = None
        return {}, 204
    
class CheckSession(Resource):
    def get(self):
        user = Users.query.filter(Users.id == session.get('user')).first()
        if user:
            return jsonify(user.to_dict())
        else:
            return {}, 401
    
class Contact(Resource):
    def get(self):
        contacts_list = []
        for contact in Contacts.query.all():
            contact_dict = {
                "id": contact.id,
                "name": contact.name,
                "number": contact.number,
                "email": contact.email,
                "profile_pic": contact.profile_pic
            }
            contacts_list.append(contact_dict)

        result = make_response(
            jsonify(contacts_list),
            200
        )
        return result
    
class GetContactByID(Resource):
    def get(self, id):
        contact = Contacts.query.filter_by(id=id).first()
        if contact is None:
            return jsonify({'error': 'No such Contact'}), 404
        else:
            contact_dict = {
                "id": contact.id,
                "name": contact.name,
                "number": contact.number,
                "email": contact.email,
                "profile_pic": contact.profile_pic
            }
            result = make_response(
                jsonify(contact_dict),
                200
            )
            return result
        
class Chat(Resource):
    def post(self):
        data = request.get_json()
        if data:
            message = Chats(
                messages = data.get('message'),
                responses = 'figure out later',
                contact_id = 'jfn',
                user_id = session.get('user')
            )
            db.session.add(message)
            db.session.commit()
    
api.add_resource(Index, '/')
api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Contact, '/contacts')
api.add_resource(GetContactByID, '/contacts/<int:id>')
api.add_resource(Chat, '/chats')




if __name__ == '__main__':
    app.run(debug = True)