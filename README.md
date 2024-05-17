# User List Management and Email Sending API

This project aims to provide a robust RESTful API for managing user lists with customizable properties and sending emails to users. The API is built using Node.js with Express.js for handling HTTP requests, MongoDB for data storage, and Docker for deployment. It also includes features like sending personalized emails with placeholders and an unsubscribe link.

## Features

- **List Creation**: Admins can create lists with custom properties.
- **User Addition**: Admins can add users to lists via CSV upload, with support for custom properties.
- **Unique Emails**: Ensures that no two users with the same email exist in a list.
- **Email Sending**: Admins can send emails to the complete list, with support for placeholders and an unsubscribe link.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Docker (for deployment)
- Message Queue

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/AkshaysProjects/user-list-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd user-list-api
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Copy the `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

5. Update the `.env` file with the required parameters:

    ```plaintext
    # Port
    PORT=3000

    # Base URL
    BASE_URL=http://localhost:3000

    # Mail
    MAIL_HOST=smtp.example.com
    MAIL_PORT=465
    MAIL_USER=smtpuser
    MAIL_PASS=smtppass
    MAIL_SENDER=sender@example.com
    ```

6. Start the server:

    ```bash
    npm start
    ```

7. Access the API at `http://localhost:3000`.

## API Documentation

Refer to the [Postman Collection](https://www.postman.com/avionics-geoscientist-13582297/workspace/akshay-s-workspace/collection/27253779-1265fa24-33a4-405e-80de-f8457de0f569?action=share&amp;creator=27253779) for detailed API documentation, including examples and usage instructions.

## Docker Deployment

This project includes a `docker-compose.yml` file for easy deployment using Docker. Simply run:

```bash
docker-compose up
```

## Conclusion

This API provides a flexible solution for managing user lists and sending emails, with a focus on scalability, error handling, and customization. Feel free to explore the codebase and contribute to its improvement!
