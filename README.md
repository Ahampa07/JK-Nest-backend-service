# JK NestJS Backend Service

## Description
This repository contains a backend service built using the NestJS framework. The service includes the following core functionalities:

- Authentication Module: User registration, login, logout, and role-based authorization using JWT.
- User Role Management Module: Admin functionality for managing user roles and permissions.
- Document Management Module: CRUD operations for documents, including the ability to upload and manage files.
- Ingestion Module: Handles triggerig the ingestion process and manage ongoing ingestion processes.

## Features

1. Authentication
- User Registration: Create a new account with necessary details.
- Login/Logout: Secure login and session management.
- JWT Authentication: Secure token-based authentication with token expiry and role validation.
2. User Role Management
- Manage roles such as Admin, Editor, and Viewer.
- Role-based access control for protected endpoints.
3. Document Management
- Create, read, update, and delete documents (.png, .jpg, .jpeg, .gif .pdf).
- Role-based access control for Document management.
4. Ingestion Module
- Supports ingestion process with other backend service 
- Handle ongoing ingestion process with other backend service.

## API Endpoints
### Authentication
- POST /api/auth/email/register: Register a new user.
- POST /api/auth/email/login: Login and obtain a JWT token.
- POST /api/auth/user/logout: Logout and invalidate the session.

### User roles Management
- GET /api/roles/users: Get all users (Admin only).
- POST /api/roles/create/role: Create a role(Admin only)
- PATCH /api/roles/users/:id/role: Update user role (Admin only).
- DELETE /api/roles/users/:id: Delete the user (Admin only).

### Document Management
- POST /api/documents/upload: Create a document(Admin only).
- GET /api/documents: Fetch all documents.
- GET /api/documents/:id: Fetch a document by id.
- PATCH /api/documents/:id: Update a document.
- DELETE /api/documents/:id: Delete a document.


## Project Structure
  ```bash
  src  
├── auth                    # Authentication module  
├── config                  # configuration files 
├── database                # Database configuration   
├── document-management     # Document management module  
├── igenstion               # ingestion module
├── roles                   # user roles handle module   
├── users                   # User management module 
├── utils                   # Shared utilities and guards  
└── main.ts                 # Entry point of the application  

  ```
## Technologies Used
- Framework: NestJS
- Database: PostgreSQL
- Authentication: JWT
- Validation: Class-validator

## Installation
#### Clone the repository:
```bash
 git clone https://github.com/Ahampa07/JK-Nest-backend-service.git  
 cd JK-Nest-backend-service  
```

#### Install dependencies:
  ```bash
  yarn install  
  ```

#### Set up environment variables:
Create a .env file in the root directory and provide the following variables:
```bash
NODE_ENV=development
APP_PORT=3001
APP_NAME="JK Tech Nestjs Backend Service "
API_PREFIX=api
APP_FALLBACK_LANGUAGE=en
APP_HEADER_LANGUAGE=x-custom-lang
FRONTEND_DOMAIN=http://localhost:3000
BACKEND_DOMAIN=http://localhost:3001
PYTHON_BACKEND_URL=http://localhost:5000

DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
DATABASE_NAME=JKDatabse
DATABASE_SYNCHRONIZE=true
DATABASE_MAX_CONNECTIONS=100
DATABASE_SSL_ENABLED=false
DATABASE_REJECT_UNAUTHORIZED=false

AUTH_JWT_SECRET=secret
AUTH_JWT_TOKEN_EXPIRES_IN=1800  
```

#### Run the migration generate command:
  ```bash
  yarn migration:generate 
  ```

#### Run the migration run command:
  ```bash
  yarn migration:run 
  ```

#### Run the seed command:
  ```bash
  yarn seed:run 
  ```

#### Start the server:
  ```bash
  yarn start:dev  
  ```

## Links

- Swagger: http://localhost:3001/api/docs

## Tests

```bash
# unit tests
yarn run test
