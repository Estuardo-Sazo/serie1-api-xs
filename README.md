# Serie 1 API

API for Serie 1 technical test.

## Prerequisites

- Node.js
- Docker & Docker Compose
- MySQL (via Docker)

## Database Setup

To start the MySQL database, run:

```bash
docker-compose up -d
```

This will start a MySQL container with the following credentials:
- **Database**: `serie1_db`
- **User**: `root`
- **Password**: `123456`
- **Port**: `3306`

## Configuration

Copy the example environment file and adjust if necessary:

```bash
cp .env.example .env
```

### Environment Variables

```ini
DB_MYSQL_HOST=localhost
DB_MYSQL_PORT=3306
DB_MYSQL_USER=root
DB_MYSQL_PASS=123456
DB_MYSQL_NAME=serie1_db
JWT_SECRET=supersecretkey123
```

## Installation

```bash
npm install
```

## Running the App

```bash
# development
npm run start:dev

# production
npm run start:prod
```

## API Endpoints

### Authentication

#### Register

**Endpoint:** `POST /auth/register`

**Request Body:**

```json
{
    "username": "jasz1",
    "name": "Jaime Sazo",
    "password": "123456",
    "passwordConfirmation": "123456"
}
```

**Response (Success):**

Returns the created user object.

**Response (Error - User already exists):**

```json
{
    "message": "User jasz already exists",
    "error": "Conflict",
    "statusCode": 409
}
```

**Response (Error - Passwords do not match):**

```json
{
    "message": "Passwords do not match",
    "error": "Bad Request",
    "statusCode": 400
}
```

#### Login

**Endpoint:** `POST /auth/login`

**Request Body:**

```json
{
    "username": "jasz",
    "password": "123456"
}
```

**Response (Success):**

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600,
    "user": {
        "uuid": "8e5f7c35-e4a9-4f72-98f8-c7cb21744d86",
        "name": "Jaime Sazo",
        "username": "jasz",
        "role": "user"
    }
}
```

**Response (Error - Invalid credentials):**

```json
{
    "message": "Unauthorized",
    "statusCode": 401
}
```
