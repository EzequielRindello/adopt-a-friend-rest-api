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
