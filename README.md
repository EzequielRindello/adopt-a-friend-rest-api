# Dog Adoption - REST API

This is a RESTful API project for managing dog adoptions. It allows users to register, log in, and submit adoption requests. Administrators can manage users, dogs, adoption requests, and shelters.

## Main Features

1. **Users:**
   - Register and log in.
   - Submit adoption requests.
   - Check the status of their requests.

2. **Administrators:**
   - CRUD operations for available dogs.
   - Manage users (view and delete).
   - Manage adoption requests (approve or reject).
   - CRUD operations for associated shelters.

3. **Shelters:**
   - Information about shelters housing the dogs.
   - Relationship with available dogs.

## Technologies Used

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (NoSQL)  
- **Authentication:** JSON Web Tokens (JWT)  
- **Deployment:** Render  

## Project Structure (MVC)

```plaintext
.
├── controllers/         # Controller logic
├── database/            # Database connection
├── middleware/          # Middleware (auth, validation, etc.)
├── node_modules/        # Installed dependencies
├── routes/              # API routes
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── app.js               # Main configuration file
├── package-lock.json    # Dependency lock file
├── package.json         # Project metadata
└── README.md            # Documentation file 
```

## API Endpoints

### Users
- **POST `/auth/register`**: Register a new user.  
- **POST `/auth/login`**: Log in and obtain a JWT token.  
- **GET `/users`**: Get all users (Admin only).  
- **GET `/users/:id`**: Get user details by ID (Admin only).  
- **DELETE `/users/:id`**: Delete a user by ID (Admin only).  

---

### Dogs
- **GET `/dogs`**: Get all available dogs.  
- **POST `/dogs`**: Add a new dog (Admin only).  
- **PUT `/dogs/:id`**: Update dog information (Admin only).  
- **DELETE `/dogs/:id`**: Remove a dog (Admin only).  

---

### Adoption Requests
- **GET `/adoptions/user`**: Get all adoption requests for the logged-in user.  
- **GET `/adoptions`**: Get all adoption requests (Admin only).  
- **POST `/adoptions`**: Create a new adoption request.  
- **PUT `/adoptions/:id`**: Update the status of an adoption request (Admin only).  
- **DELETE `/adoptions/:id`**: Remove an adoption request (Admin only).  

---

### Shelters
- **GET `/shelters`**: Get all shelters.  
- **POST `/shelters`**: Add a new shelter (Admin only).  
- **PUT `/shelters/:id`**: Update shelter information (Admin only).  
- **DELETE `/shelters/:id`**: Remove a shelter (Admin only).  
