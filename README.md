User Authentication System

This is a user authentication system built using Node.js, Express, and MongoDB. It includes features such as user registration, login, and password reset using JWT authentication.

Features

User registration with input validation

User login with JWT authentication

Protected routes using JWT

Password reset via email

Secure password hashing

Proper error handling and validation

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB (MongoDB Atlas)

Authentication: JSON Web Token (JWT)

Email Service: Nodemailer

Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/devansh-rusiya01/user-authentication-system.git
cd user-authentication-system

2️⃣ Install Dependencies

npm install

3️⃣ Create a .env File

Create a .env file in the root directory and add the following environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

4️⃣ Start the Server

node server.js

OR (if using nodemon)

npm run dev

The server will start at http://localhost:5000/

API Endpoints

🔹 User Registration

Endpoint: POST /api/auth/register

Request Body:

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}

Response:

{
  "message": "User registered successfully"
}

🔹 User Login

Endpoint: POST /api/auth/login

Request Body:

{
  "email": "johndoe@example.com",
  "password": "password123"
}

Response:

{
  "token": "your_jwt_token"
}

🔹 Protected Route (Requires Token)

Endpoint: GET /api/auth/protected

Add Authorization: Bearer your_jwt_token in headers.

Response:

{
  "message": "Protected route accessed!"
}

🔹 Forgot Password (Request Reset Email)

Endpoint: POST /api/auth/forgot-password

Request Body:

{
  "email": "johndoe@example.com"
}

Response:

{
  "message": "Password reset email sent!"
}

🔹 Reset Password

Endpoint: POST /api/auth/reset-password/:token

Request Body:

{
  "newPassword": "newSecurePassword"
}

Response:

{
  "message": "Password reset successful!"
}

Deployment

This project can be deployed on Render.

Steps to Deploy on Render:

Push your code to GitHub.

Connect your GitHub repository to Render.

Set up environment variables on Render.

Use the following Build & Start Commands:

npm install
node server.js

Deploy and test your API.

Author: Devansh Rusiya

GitHub: devansh-rusiya01

