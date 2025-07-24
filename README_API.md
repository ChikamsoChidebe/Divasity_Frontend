# Divasity Frontend - API Integration

## Overview

This document provides information about the API integration for the Divasity Frontend application. The application now uses the production API hosted at:

- **API Base URL**: https://divasitybackendtest.onrender.com
- **API Documentation**: https://divasitybackendtest.onrender.com/api-docs

## Changes Made

The following changes have been made to integrate with the production API:

1. **Environment Configuration**:
   - Created `.env`, `.env.development`, and `.env.production` files with the API URL.

2. **Configuration File**:
   - Created a central configuration file (`src/config.ts`) to manage API URLs and other settings.

3. **API Service Updates**:
   - Updated the API service to use the production API URL.
   - Ensured proper error handling and authentication.

4. **Component Updates**:
   - Updated Login, Signup, and OTP components to use the auth service.
   - Implemented proper error handling and loading states.

## How to Use

### Authentication

The application uses JWT-based authentication. When a user logs in, the token is stored in session storage and automatically included in API requests.

```typescript
// Login example
const response = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// The token is automatically stored and used for subsequent requests
```

### User Registration

```typescript
// Register example
const response = await authService.register({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  telephone: '1234567890',
  address: '123 Main St',
  password: 'password123',
  role: 'user'
});
```

### OTP Verification

```typescript
// Verify OTP example
const response = await authService.verifyOTP({
  email: 'user@example.com',
  otp: '123456'
});

// Resend OTP example
const response = await authService.resendOTP('user@example.com');
```

## API Services

The application uses the following services for API communication:

1. **apiService** (`src/services/api.ts`):
   - Handles HTTP requests, authentication, and error handling.

2. **authService** (`src/services/authService.ts`):
   - Handles user authentication, registration, and profile management.

3. **projectService** (`src/services/projectService.ts`):
   - Handles project-related operations.

## Testing

To test the API integration:

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to the login or signup page.

3. Use the following test credentials:
   - Email: `test@example.com`
   - Password: `password123`

4. Check the browser console for API responses and errors.

## Troubleshooting

If you encounter issues with the API integration:

1. Check the browser console for error messages.
2. Verify that the API URL is correctly set in the environment files.
3. Ensure that the API is accessible and responding to requests.
4. Check that the request payload matches the expected format.
5. Verify that authentication tokens are being correctly sent with requests.

## Additional Resources

- [API Documentation](https://divasitybackendtest.onrender.com/api-docs)
- [Axios Documentation](https://axios-http.com/docs/intro)