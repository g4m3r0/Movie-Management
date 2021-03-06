# Movie Management
[![BCH compliance](https://bettercodehub.com/edge/badge/g4m3r0/AMD-Project?branch=main&token=3e3451b8df2b62be79c9fc23563729f909cb3232)](https://bettercodehub.com/)

**[Advanced Management of Data](https://www.tu-chemnitz.de/informatik/DVS/index.php) Term Project WS21/22**

A simple movie management system implemented in PostgreSQL with a Node.js frontend by Robert Schulz and Lucas Schmutzler.

![Interface](screenshot.png)

## Requirements
- PostgreSQL
- Node.js
- A modern webbrowser

# Server
The server interacts with the PostgreSQL database and provides a REST API for the frontend.

## How to run the server?

1. Navigate to the servers' directory.
`cd server`

2. Install the Node.js dependencies.
`npm install`

3. Create or change the .env file with your database configuration. The file has to be placed inside the server's root dir.
The REST API will listen on the `SERVER_PORT` on localhost.

```
# .env file
DATABASE_NAME="movie_management"
DATABASE_USER="postgres"
DATABASE_PASS="postgres"
DATABASE_HOST="127.0.0.1"
DATABASE_PORT="5432"

SERVER_PORT="5000"
```

4. Launch the server using `node index.js` or `nodemon run`
The server will reply with 'Server has started on port `SERVER_PORT`' it successfully launched.
`node index.js`

# Client
The client acts as a simple frontend to interact with the database.

# How to run the client?
1. Navigate to the clients' directory.
`cd client`

2. Install the Node.js dependencies.
`npm install`

3. (Optional) Create or change the `.env` file with your server configuration. The file has to be placed inside the client's root dir.
The `SERVER_PORT` specified for the client must match with the `SERVER_PORT` specified for the server.

```
# .env file
SERVER_HOST="localhost"
SERVER_PORT="5000"
```

4. Launch the client using `npm start`
The frontend will be accessible from the browser at `http://localhost:3000/`.
`npm start`
