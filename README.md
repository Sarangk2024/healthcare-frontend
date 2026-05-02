# Healthcare Full-Stack App

This repository now contains both the React frontend and the Spring Boot backend.

## Run The Frontend

```bash
npm install
npm start
```

The React app runs at `http://localhost:3000`.

## Run The Backend

From the project root:

```bash
npm run backend
```

On Windows Git Bash, Command Prompt, or PowerShell:

```bash
npm run backend:win
```

The API runs at `http://localhost:8080/api`.

The default backend scripts use a local H2 development database so the app runs without SQL Server setup. To run with the SQL Server settings in `application.properties`, use:

```bash
npm run backend:sqlserver
```

## Configuration

The frontend uses `http://localhost:8080/api` by default. To point it at another backend, create `.env` in the project root:

```bash
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

The SQL Server database connection is configured in `healthcare-backend/src/main/resources/application.properties`. The development database is configured in `healthcare-backend/src/main/resources/application-dev.properties`.

## Main Features

- Patient registration and login
- Persistent frontend login state
- Professional responsive home page
- Doctor search and specialty filtering
- Appointment booking with backend integration
- Local doctor fallback if the backend is temporarily unavailable
- Recent appointment request list when the backend is running
