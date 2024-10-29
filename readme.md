# Project Title :- RBAC API (Role Base Access Controll)

## Features
- User Registeration -> allow to add user and create account.
- Role Management -> Role Creation:(Admin, Manager, Employee), support heirachy role higher order inherits from lower order.
- Permission Managment -> Defined permission for access or request resources.
- Security Feature -> used bcrypt for password encryption and jwt for token based 

## Technologies Used
- Node.js -> For the server-side logic.
- Express -> For routing and middleware.
- MongoDB -> For the database.
- JWT -> For authentication.
- Mongoose -> For MongoDB object modeling.
- Bcrypt -> for password encryption.

## Installation

1. Clone the repository:
    git clone https://github.com/Deepak-iiitg/rbac-api.git
    
2. Navigate to the project directory:
    cd rbac-api

3. Install the dependencies:
    npm install

4. Set up your environment variables (create a `.env` file) and define following field with same as write here:

    SECRET_KEY=secret_key(write secret_key here)
    DB_URL=database_url(eg. mongodb://127.0.0.1:27017/rbac-api)
    PORT=port_number(eg. 8080)
    PASSWORD_SALT_ROUND=define saltRound(eg. 10)

## Usage
To start the server, run command : 
   node index.js

   or start with nodemon run command: 
   npm run dev

## Flow of Project
User signup
   Note: whaterver port written in endpoient will change based on they defined. 

   write user details with following field \n

   endpoint: localhost:8080/auth/signup/ (hit from postman) \n

   write inside body raw with below details with same field \n
   {
    "username":"write user name here",
    "password":".......",
    "role":"...",
    department:"..."(write only incase of manager or employee define their department for admin it will be null by default) 
   } \n
   \n
   output format
   eg.
   {
    "username": "admin123",
    "password": "$2b$10$8cgGxrIeNaaKYp9xm9nwDuAU5BzNou4/JaLJpoj1VUZfAB9t5pw5S",
    "role": "Admin"
  }
  \n

User Login \n
   Give username and password for login, if creadentials true. then return a jwt token \n
   token contains user details too. \n
   \n

   endpoint: localhost:8080/auth/login (hit from poastman) \n
   
   write inside body raw with below details with same field \n
   {
    "username":"...." (eg. Admin)
    "password":"...." (eg. Admin@1234)
   }   
   \n
   \n
   output format (get token in response body) \n
   eg. {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
       }
  \n
Get request  \n
   endpoint: localhost:8080/tasks/ (get request) \n
   \n
   
   hit from postman (write token with 'token' as key and values as token which got from response at login time) \n
   \n
   if admin request for get api, show all tasks \n
   output format
   [
    {
        "_id": "6720c0a693c68f184d7f4d57",
        "title": "setupt database",
        "description": "setupt mysql db",
        "userId": "6720bec193c68f184d7f4d50",
        "department":"Tech"
        "__v": 0
    },
    {
        "_id": "6720c17aede9e25ef4bb39b1",
        "title": "Inform the candidate",
        "description": "call the all candidates",
        "department": "HR",
        "userId": "6720bec193c68f184d7f4d50",
        "__v": 0
    }
  ]
  \n
  if manager request the get api, only return array of their department tasks. \n
  if employee request the get api ,only return array of their assigned tasks. \n
  \n
Delete User \n
   enpoint : localhost:8080/users/  (http patch) \n
   only admin can delete the user. \n
