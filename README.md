# Event Manager

## Introduction
This web app lets user create, update, delete and book different events. 

## Project Type
Backend

## Deplolyed App
Backend: https://event-manager-ulni.onrender.com/
Database: Mongo Atlas

## Video Walkthrough of the project
https://vimeo.com/915733345/6382a73484?share=copy

## Features

- User Registration and signin
- User Authentication and Authorization
- Event creation and updation 
- Booking Event

## Installation & Getting started

```bash
npm install
npm run server 
```

## Credentials of a dummy account
{
    "email":"harshit.sahu@gmail.com",
    "password":12345
}

## API Endpoints
POST /api/register - registers a new user
POST /api/login - logs in a registered user and provide a token for acessing further protected apis.

### Protected Endpoints 
GET /api/view/ - gets all the available event.
GET /api/view/ascend - gets all the available event in ascending order.
GET /api/view/descend - gets all the available event in descending order.
GET /api/view?location=delhi - filters all the available event in that location.
POST /api/create - creates a new event.
PATCH /api/:id - lets user to book a particular event by its ID.
PATCH /api/update/:id - lets the author user to update its existinbg event. (only the author user can update)
DELETE /api/delete/:id - lets the author user to delete its existinbg event. (only the author user can delete)

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Nodemon
- Json web token
- Bcrypt 
- Mongoose
- Mongo Atlas