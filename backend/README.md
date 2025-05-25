# Stadscore Backend

This is the backend API for the Stadscore blog feature, built with Node.js, Express, TypeScript, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm (v6 or higher)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/stadscore.git
   cd stadscore/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/stadscore-blog
   JWT_SECRET=your_jwt_secret_here
   FRONTEND_URL=http://localhost:3000
   ```

4. **Run the application**
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm run build
     npm start
     ```

5. **Seed the database**
   ```bash
   # Import sample data
   npm run seed
   
   # Clear all data
   npm run seed:destroy
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Blog Posts
- `GET /api/posts` - Get all published posts
- `GET /api/posts/:slug` - Get a single post by slug
- `POST /api/posts` - Create a new post (Admin only)
- `PUT /api/posts/:id` - Update a post (Admin only)
- `DELETE /api/posts/:id` - Delete a post (Admin only)
- `POST /api/posts/:id/comments` - Add a comment to a post
- `PUT /api/posts/:id/like` - Like a post
- `PUT /api/posts/:id/unlike` - Unlike a post

## Environment Variables

- `NODE_ENV` - Application environment (development, production)
- `PORT` - Port to run the server on
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `FRONTEND_URL` - URL of the frontend application

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server entry point
├── .env                # Environment variables
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Development

- Use `npm run dev` to start the development server with hot-reload
- The server will be available at `http://localhost:5000`
- API documentation is available at `http://localhost:5000/api-docs` (if using Swagger)

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## License

This project is licensed under the MIT License.
