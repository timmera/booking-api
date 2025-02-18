# Booking API

This is a RESTful API for managing bookings in an online booking application. The API is built using Express.js and Prisma, and it provides endpoints for managing users, properties, bookings, reviews, and amenities.

## Features

- User authentication and authorization using JWT
- CRUD operations for users, properties, bookings, reviews, and amenities
- Error handling and validation
- Logging and monitoring with Sentry

## Technologies Used

- **Express.js**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Prisma**: A next-generation ORM that helps to build faster and make fewer errors with an auto-generated and type-safe query builder.
- **Supabase**: Provides a full Postgres database for every project with Realtime functionality, database backups, extensions, and more.
- **JWT (jsonwebtoken)**: A library to work with JSON Web Tokens for authentication and authorization.
- **Sentry**: A monitoring and error tracking software that helps developers monitor and fix crashes in real-time.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **Helmet**: A collection of middleware to help secure Express.js apps by setting various HTTP headers.
- **Winston**: A versatile logging library for Node.js.
- **Postman**: A collaboration platform for API development used for testing the API endpoints.

## Getting Started

### Prerequisites

- Node.js (>=18 <19)
- PostgreSQL or SQLite

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/timmera/booking-api.git
   cd booking-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a [.env](http://_vscodecontentref_/7) file in the root directory and add the following variables:

   ```env
   DATABASE_URL=your-database-url
   AUTH_SECRET_KEY=your-secret-key
   ```

4. Run database migrations and seed data:

   ```sh
   npx prisma migrate dev
   npm run seed
   ```

5. Start the server:
   ```sh
   npm run dev
   ```

### Running Tests

To run the tests, use the following commands:

```sh
npm run test-positive
npm run test-negative
```
