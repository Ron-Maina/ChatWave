# ChatWave

## Description
A Chat App created with React and FLask to bring people together through livley conversations

By Ron Maina

## How To Use
### Setup Requirements
* A computer, tablet or phone
* Access to the internet

### View Live Site
Ensure that your device of choice has a browser installed. Click the link provided below to view the site.

https://chatwave-app-ledv.onrender.com

### Using the App
You as the user should be able to:
* Create an account by signing up
* Login after signing up or if already have an account
* New users should see a blank chat section which gets populated after initiating a conversation with contacts
* Navigate to diferent pages through the collapsible sidebar
* View your profile with your information and make any updates if required by selecting the profile icon
* See a list of contacts by selecting the contact book icon
* Open a conversation screen by selecting a contact. On typing a message, the contact is added to the chats section on the HomePage
* Add a contact by clicking on the plus icon
* Delete a contact from the contact page
* Logout by clicking the **X** icon
* View About section by clicking **i** icon

## Run Locally
### Setup Requirements
To run this app locally, you need a PC with the following:
* Visual Studio Code
* Internet Access

### Installation Process 
* Clone the repository by running the following in your terminal 
```
git clone git@github.com:Ron-Maina/ChatWave.git
```
* Switch directories by running 
```
cd ChatWave
```
* Open in visual studio code using:
```
code .
```
* Ste up the repository locally by running: 
```
npm install --prefix client
pipenv install && pipenv shell
```
* Run the following commands to install upgrade and seed our database:
```
cd server
flask db upgrade
python seed.py
```
* You can now run the app locally with:
```
 honcho start -f Procfile.dev
```

## License
MIT License

Copyright (c) 2023 Ron Maina

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
