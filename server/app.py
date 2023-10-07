from flask import make_response, jsonify, request, session, render_template
from flask_restful import Resource
from werkzeug.exceptions import BadRequest

from config import app, db, api
from models import  Users, Contacts, Chats

app.config['SESSION_TYPE'] = 'filesystem'

from dotenv import load_dotenv
load_dotenv()

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")
   
class Signup(Resource):
    def post(self):
        try:
            data = request.get_json()
            new_user = Users(
                name = data.get('name'),
                email = data.get('email'),
                number = data.get('number'),
                profile_pic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU'
            )
            new_user.password_hash = data.get('password')

            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id

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
        password = request.get_json()['password']
        if (user) and (user.authenticate(password) == True):
            
            session['user'] = user.id

            response = make_response(
                jsonify(user.to_dict()),
                200
            )
            return response
        else:
            return {"message":"You do not have an account"}, 401
        
    
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
    
    def post(self):
        data = request.get_json()
        if data:
            new_contact = Contacts(
                name = data.get('name'),
                email = data.get('email'),
                number = data.get('number'),
                profile_pic = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&usqp=CAU'   
            )
            db.session.add(new_contact)
            db.session.commit()
    
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
        
    def delete(self, id):
        contact = Contacts.query.filter_by(id=id).first()
        db.session.delete(contact)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "Review deleted."    
        }

        response = make_response(
            jsonify(response_body),
            200
        )

        return response
    
class GetUserByID(Resource):
    def patch(self, id):
        user = Users.query.filter_by(id=id).first()
        data = request.get_json()
        if user:
            try:
                if 'name' in data:
                    user.name = data.get('name')
                if 'email' in data:
                    user.email = data.get('email')
                if 'number' in data:
                    user.number = data.get('number')
                if 'profile_pic' in data:
                    user.profile_pic = data.get('profile_pic')

                
                db.session.commit()
                return jsonify(user.to_dict())
               
            except Exception as e:
                db.session.rollback()  
                response = make_response(
                    jsonify({"error": str(e)}),
                    500
                )
        else:
            response = make_response(
                jsonify({"error": "User not found"}),
                404
            )

        return response


class Chat(Resource):
    def post(self):
        data = request.get_json()
        user = session.get('user_id')
        if user:
            try:
                message = Chats(
                    messages = data.get('message'),
                    responses = 'figure out later',
                    user_id = user,
                    contact_id = data.get('contact_id')   
                )
                db.session.add(message)
                db.session.commit()
                session['contact'] = data.get('contact_id')  

            except Exception as e:
                db.session.rollback()  
                response = make_response(
                    jsonify({"error": str(e)}),
                    500
                )
        else:
            response = make_response(
                jsonify({"error": "User not found"}),
                404
            )

            return response
        

class GetChatByID(Resource):
    def delete(self, id):
        contact = Chats.query.filter_by(id=id).first()
        db.session.delete(contact)
        db.session.commit()

        response_body = {
            "delete_successful": True,
            "message": "Review deleted."    
        }

        response = make_response(
            jsonify(response_body),
            200
        )

        return response

        
class ContactSession(Resource):
    def get(self):
        contact = Contacts.query.filter(Contacts.id == session.get('contact')).first()
        print(contact)
        if contact:
            contact_dict ={
                "name": contact.name,
                "profile_pic": contact.profile_pic
            }
            response = make_response(
                jsonify(contact_dict), 
                200
            )
            return response
        else:
            return {}, 401
    

api.add_resource(Signup, '/')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(CheckSession, '/check-session')
api.add_resource(Contact, '/contacts')
api.add_resource(GetContactByID, '/contacts/<int:id>')
api.add_resource(GetUserByID, '/users/<int:id>')
api.add_resource(Chat, '/chats')
api.add_resource(GetChatByID, '/chats/<int:id>')
api.add_resource(ContactSession, '/contact-session')


if __name__ == '__main__':
    db.session.creat_all()
    app.run(debug = True)