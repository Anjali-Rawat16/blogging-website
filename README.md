# Blogging Website

A full-stack blogging website built with HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB.

## 📌 About the Project

This project is a full-stack blogging website where users can view, create, edit, and delete blog posts.

The project has a separate frontend and backend. The backend provides REST API endpoints and uses MongoDB to store blog post data.

## 🚀 Features

- Responsive blogging website
- View blog posts
- Read individual blog posts
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- REST API for blog posts
- MongoDB database integration
- Mongoose for database interaction
- Separate frontend and backend structure

## 🛠️ Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express.js
- REST API
- Mongoose

### Database

- MongoDB Community Server
- MongoDB Compass

## 📁 Project Structure

```text
blogging-website/
│
├── client/
│   ├── images/
│   ├── index.html
│   ├── Script.js
│   └── style.css
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Post.js
│   ├── routes/
│   │   └── posts.js
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
└── README.md

🔮 Future Improvements
User authentication
Comments and likes
Search functionality
User profiles
Image uploads
Deployment