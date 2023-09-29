# Scheduling App

built by nicomilette
active on https://nicomilette.com
README by NBorow
This documentation provides an overview of the endpoints and functionality of the Scheduler backend written in JavaScript using Express.js and MySQL. The Scheduler backend is designed to manage user accounts, user sessions, and tasks.

## Table of Contents
1. [Setup](#setup)
2. [Endpoints](#endpoints)
   - [/register](#register)
   - [/login](#login)
   - [/logout](#logout)
   - [/fetchusername](#fetchusername)
   - [/fetchtasks](#fetchtasks)
   - [/posttask](#posttask)
   - [/deletetask](#deletetask)

## Setup <a name="setup"></a>

Before using the Scheduler backend, ensure that you have Node.js installed and have set up a MySQL database to store user and session information. You'll also need to install the required npm packages by running the following command in the project directory:

npm install express mysql cors bcryptjs uuid xss

Make sure to update the MySQL connection details in the code to match your database configuration.

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "YOUR_DATABASE_PASSWORD",
    database: "userpass"
});  

Once the setup is complete, start the server with the following command:
node server.js

## Endpoints

### `/register`

- **Method**: POST
- **Description**: Allows a user to register with a username and password.
- **Request Body**:
  - `username` (string): The desired username for registration.
  - `password` (string): The user's password.
- **Responses**:
  - `200 OK`: Registration successful.
  - `409 Conflict`: Username already exists.
  - `500 Internal Server Error`: An error occurred during registration.

### `/login`

- **Method**: POST
- **Description**: Allows a user to log in with their username and password. This endpoint also manages user sessions.
- **Request Body**:
  - `username` (string): The username for login.
  - `password` (string): The user's password.
  - `session_id` (string, optional): The existing session ID to end the previous session.
- **Responses**:
  - `200 OK`: Login successful. Returns a new session ID.
  - `401 Unauthorized`: Invalid password.
  - `404 Not Found`: Username not found.
  - `500 Internal Server Error`: An error occurred during login.

### `/logout`

- **Method**: POST
- **Description**: Logs a user out by deleting their session.
- **Request Body**:
  - `session_id` (string): The session ID to be deleted.
- **Responses**:
  - `200 OK`: Logout successful.
  - `500 Internal Server Error`: An error occurred during logout.

### `/fetchusername`

- **Method**: POST
- **Description**: Retrieves the username associated with a session.
- **Request Body**:
  - `session_id` (string): The session ID.
- **Responses**:
  - `200 OK`: Returns the username associated with the session.
  - `404 Not Found`: Session not found.
  - `500 Internal Server Error`: An error occurred during the retrieval.

### `/fetchtasks`

- **Method**: POST
- **Description**: Retrieves tasks associated with a user's session.
- **Request Body**:
  - `session_id` (string): The session ID.
- **Responses**:
  - `200 OK`: Returns the tasks associated with the user's session.
  - `404 Not Found`: Session not found.
  - `500 Internal Server Error`: An error occurred during the retrieval.

### `/posttask`

- **Method**: POST
- **Description**: Posts a new task for the user.
- **Request Body**:
  - `session_id` (string): The session ID.
  - `title` (string): The title of the task.
  - `details` (string): Additional details about the task.
  - `date` (string): The date when the task is due.
  - `time` (string): The time when the task is due.
  - `unique_id` (string): A unique identifier for the task.
- **Responses**:
  - `200 OK`: Task posted successfully.
  - `404 Not Found`: Session not found.
  - `500 Internal Server Error`: An error occurred during task posting.

### `/deletetask`

- **Method**: POST
- **Description**: Deletes a task associated with the user.
- **Request Body**:
  - `session_id` (string): The session ID.
  - `unique_id` (string): The unique identifier of the task to be deleted.
- **Responses**:
  - `200 OK`: Task deleted successfully.
  - `404 Not Found`: Session not found or task not found.
  - `500 Internal Server Error`: An error occurred during task deletion.
