# Divasity Frontend API Integration

This document provides information about the API integration for the Divasity Frontend application.

## API Documentation

The API documentation is available at:
- [API Documentation](https://divasitybackendtest.onrender.com/api-docs)

## API Base URL

The API base URL is:
- [https://divasitybackendtest.onrender.com](https://divasitybackendtest.onrender.com)

## Environment Configuration

The application uses environment variables to configure the API URL. The following environment files have been set up:

- `.env`: Default environment configuration
- `.env.development`: Development environment configuration
- `.env.production`: Production environment configuration

All of these files contain the following configuration:

```
VITE_API_URL=https://divasitybackendtest.onrender.com/api
```

## API Service

The application uses a centralized API service located at `src/services/api.ts`. This service provides methods for making HTTP requests to the API and handles common tasks such as:

- Adding authentication tokens to requests
- Handling API errors
- Managing file uploads
- Handling response data

## Authentication

Authentication is handled by the `authService` located at `src/services/authService.ts`. This service provides methods for:

- User registration
- User login
- OTP verification
- Password reset
- User profile management

## API Endpoints

The following API endpoints are used in the application:

### Authentication
- `POST /api/users/register`: Register a new user
- `POST /api/users/login`: Login a user
- `POST /api/users/verifyotp`: Verify OTP for account activation
- `POST /api/users/resendOtp`: Resend OTP for account activation
- `POST /api/users/forgot-password`: Request password reset
- `POST /api/users/verify-otp`: Verify OTP for password reset

### User Management
- `GET /api/users/getuser/:userId`: Get user profile
- `PATCH /api/users/update/:userId`: Update user profile
- `POST /api/users/upload-avatar`: Upload profile image
- `POST /api/users/change-password`: Change password
- `DELETE /api/users/delete-account`: Delete account

## Testing the API

You can test the API using tools like Postman or cURL. For example:

```bash
curl -X POST https://divasitybackendtest.onrender.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Troubleshooting

If you encounter issues with the API integration:

1. Check the browser console for error messages
2. Verify that the API URL is correctly set in the environment files
3. Ensure that the API is accessible and responding to requests
4. Check that the request payload matches the expected format
5. Verify that authentication tokens are being correctly sent with requests

## Additional Resources

- [Axios Documentation](https://axios-http.com/docs/intro)
- [React Query Documentation](https://tanstack.com/query/latest/docs/react/overview)