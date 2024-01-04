# todoAPI

<!-- ABOUT THE PROJECT -->

## About The Project

**todo API** is a backend project where I developed an API for use in an To-Do app.

### Features

- User authentication (login, create account)
- Ability to create "todo" items, which can be viewed (read) by all users.
- Ability to update or delete a todo item specific to the user (user authorization)
- Ability to search to-do items by different filters. (e.g. by category, current status)

### Built With

- Primary language: JavaScript
- Back-end: Node.js, Next.js
- User authentication and authorization: JWT Tokens
- Database: PostgresSQL

<!-- GETTING STARTED -->

## Getting Started

### Files Organization

- Database: database.sql and db.js show how to set up the PostgreSQL database
- Controllers directory: contains the functions that facilitate the API calls
- Queries directory: contains the SQL statements used in the API calls
- Routes directory: contains the routes used in the API calls
- Middleware directory: middleware to verify token and authorize person

### Launching the App

- To launch the app on your local environment, you will need access to Node.js, Express, CORS and PostgreSQL
- Make sure the port containing the PostgreSQL database is running
- To run a Node.js server, you can follow these steps:
  - Open a terminal or command prompt and navigate to the directory where the server.js file is located
  - Type in node --watch server.js

### Testing the API

- The API endpoints can be tested using Postman
- The base endpoints are specified in server.js file
  - For users, it would be localhost:3000/api/v1/users/
  - For todos, it would be localhost:3000/api/v1/todos/
- In the routes directory, the base endpoints are represented by "/".
  - Anything that goes past the initial "/" will need to be added onto the base endpoints
  - Anything that comes after a ":" is something that is a keyword or number used to get specific todos or users
- Once you a user logs in, they will receive a token
- This token will then need to be passed along as a "token" in the req header section along with the information in the req body section in any of the API calls that require authorization
