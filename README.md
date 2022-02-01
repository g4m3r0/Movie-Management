<<<<<<< Updated upstream
# AMD-Project
 
Run the client:
cd client
npm start

Run the server:
cd server
nodemon run
=======
# AMD-Project WS21/22
A simple movie management system was implemented in PostgreSQL by Rober Schulz and Lucas Schmutzler.

## Requirements
- PostgreSQL
- Node.js
- A modern webbrowser

# Server
The server interacts with the PostgreSQL database and provides a REST API to interact with the database.

## How to run the server?

1. Navigate to the servers' directory.
`cd server`

2. Create or change the .env file with your database configuration.
The REST API will be served on the `SERVER_PORT` on localhost.

```
# .env file
DATABASE_NAME="movie_management"
DATABASE_USER="postgres"
DATABASE_PASS="postgres"
DATABASE_HOST="107.173.49.100"
DATABASE_PORT="5432"

SERVER_PORT="5000"
```

3. Launch the server using `node index.js` or `nodemon run`
The server should reply with 'Server has started on port `SERVER_PORT`' if it successfully launched.

# Client
The client acts as a simple frontend to interact with the database.

# How to run the client?
1. Navigate to the clients' directory.
`cd client`

2. (Optional) Create or change the `.env` file with your server configuration.
The `SERVER_PORT` specified for the client must match with the `SERVER_PORT` specified for the server.

```
# .env file
SERVER_HOST="localhost"
SERVER_PORT="5000"
```

3. Launch the client using `npm start`
The frontend will be accessible from the browser at `http://localhost:3000/`.
>>>>>>> Stashed changes
