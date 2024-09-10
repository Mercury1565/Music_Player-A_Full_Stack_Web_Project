# Music Player Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
  

## Introduction

This is a full-stack music player application that allows users to manage and play music. The backend is built with Go while the frontend is developed using React for a smooth user interface. Users can upload, delete, filter, and play music from the server.

## Features
- Upload and store music files.
- Fetch, filter, and display music data.
- Play music using the audio player on the client side.
- Responsive design suitable for mobile device.
- Clean architecture for the design of the backend.

## Technologies

**Backend:**
- Go
- Gin
- Vercel (Deployment)

**Frontend:**
- React.js
- Axios (for making API requests)
- React-Saga (for managing the API requests)
- React-RTK (for seamless state management)
- Emotion (for styling)

**Database:**
- MongoDB

## Installation

To run this project locally, follow these steps.

### Prerequisites
- Go
- NPM or Yarn
- Cloudinary database instance
- Vercel CLI (for deployment)

## Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Mercury1565/Music_Player-A_Full_Stack_Web_Project.git
    cd Music_Player-A_Full_Stack_Web_Project/back-end
    ```

2. Install Go dependencies:
    ```bash
    go mod download
    ```

3. Setup your environment variables, replace the examples written in lower case with your own values:
    ```bash
    export JWT_SECRET=your-jwt-secret
    export DB_USERNAME=db-user-name
    export DB_PASSWORD=db-password
    export DB_NAME=db-name
    export ACCESS_TOKEN_EXPIRY_HOUR=exp-hour
    export REFRESH_TOKEN_EXPIRY_HOUR=exp-hour
    export CONTEXT_TIMEOUT=context-timeout
    export CLOUDINARY_API_SECRET=cloudinary-api-secret
    export CLOUDINARY_API_KEY=cloudinary-api-key
    export CLOUDINARY_CLOUD_NAME=cloudinary-cloud-name
    ```
4. Important: If you're running the project locally, ensure that the package name in your main.go file (located in api/main.go) matches ```package main```.

5. Run the Go server:
    ```bash
    go run ./api/main.go
    ```
    
## Frontend Setup

1. Navigate to the `front-end` directory:
    ```bash
    cd ../front-end
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the React app:
    ```bash
    npm run dev
    ```

## Usage

Once both backend and frontend servers are running:
1. Navigate to the React frontend on `http://localhost:5173`.
2. Upload music files, view existing music, and enjoy playback directly from the web interface.

## Folder Structure

```
├── back-end/               # Backend code
│   ├── api/                # API handlers and routes
│   ├── config/             # Configuration files (e.g., environment variables, external services)
│   ├── delivery/           # HTTP handlers, controllers, or presenters (handling incoming requests)
│   ├── domain/             # Core business logic, domain models, and entities
│   ├── infrastructure/     # External services, database connections, and third-party integrations
│   ├── repository/         # Data access layer (interfacing with the database or other storage systems)
│   ├── usecases/           # Application use cases (business rules, application services)
│   ├── go.mod              # Go module dependencies
│   └── go.sum              # Go module checksums for dependency integrity
|
|
├── front-end/              # Frontend code
│   ├── src/                # React components, pages, and main source code
│   └── public/             # Public assets (static files like images, fonts, etc.)
└── vercel.json             # Vercel deployment configuration

```

