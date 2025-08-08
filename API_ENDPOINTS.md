# Divasity API Endpoints Documentation

Base URL: `https://divasitybackendtest.onrender.com/api`

## Authentication Endpoints

### POST /users/register
Register a new user
```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "telephone": "string",
  "address": "string",
  "password": "string",
  "role": "string"
}
```

### POST /users/login
User login
```json
{
  "email": "string",
  "password": "string"
}
```

### POST /users/verifyotp
Verify OTP for account activation
```json
{
  "email": "string",
  "otp": "string"
}
```

### POST /users/resendOtp
Resend OTP
```json
{
  "email": "string"
}
```

### POST /users/forgot-password
Request password reset
```json
{
  "email": "string"
}
```

### POST /users/verify-otp
Reset password with OTP
```json
{
  "email": "string",
  "otp": "string",
  "newPassword": "string"
}
```

### GET /users/getuser/:userId
Get user profile

### PATCH /users/update/:userId
Update user profile

### POST /users/upload-avatar
Upload profile avatar

### POST /users/change-password
Change user password

### DELETE /users/delete-account
Delete user account

## Project Endpoints

### GET /projects
Get all projects with filtering

### GET /projects/advanced
Advanced project filtering and search

### GET /projects/:id
Get project by ID

### GET /projects/user/:userId
Get user's projects

### POST /projects
Create new project

### PATCH /projects/:id
Update project

### DELETE /projects/:id
Delete project

### GET /projects/:id/stats
Get project statistics

### GET /projects/:id/reviews
Get project reviews

### POST /projects/:id/reviews
Add project review

### POST /projects/:id/like
Like/unlike project

### POST /projects/:id/follow
Follow/unfollow project

### GET /projects/categories
Get project categories

### GET /projects/trending
Get trending projects

### GET /projects/featured
Get featured projects

### POST /projects/upload-images
Upload project images

### POST /projects/:id/updates
Add project update

### GET /projects/:id/updates
Get project updates

## Investment Endpoints

### POST /investments
Create new investment

### GET /investments/user/:userId
Get user investments

### GET /investments/:id
Get investment by ID

### GET /investments/stats/:userId
Get investment statistics

### PATCH /investments/:id/cancel
Cancel investment

### GET /investments/project/:projectId
Get project investments

## Wallet Endpoints

### GET /wallet/user/:userId
Get user wallet

### POST /wallet/create
Create wallet for user

### GET /wallet/:walletId/transactions
Get wallet transactions

### POST /wallet/:walletId/deposit
Deposit funds

### POST /wallet/:walletId/withdraw
Withdraw funds

### GET /wallet/transaction/:transactionId
Get transaction by ID

### GET /wallet/:walletId/balance
Get wallet balance

## Community Endpoints

### GET /community/posts
Get all posts

### GET /community/posts/user/:userId
Get user posts

### POST /community/posts
Create new post

### PATCH /community/posts/:id
Update post

### DELETE /community/posts/:id
Delete post

### POST /community/posts/:id/like
Like/unlike post

### POST /community/posts/:id/share
Share post

### GET /community/posts/:id/comments
Get post comments

### POST /community/posts/:id/comments
Create comment

### DELETE /community/comments/:id
Delete comment

### GET /community/posts/search
Search posts

### POST /community/upload-images
Upload post images

## Notification Endpoints

### GET /notifications/user/:userId
Get user notifications

### PATCH /notifications/:id/read
Mark notification as read

### PATCH /notifications/user/:userId/read-all
Mark all notifications as read

### DELETE /notifications/:id
Delete notification

### GET /notifications/settings/:userId
Get notification settings

### PATCH /notifications/settings/:userId
Update notification settings

### GET /notifications/user/:userId/unread-count
Get unread notification count

## Analytics Endpoints

### GET /analytics/dashboard
Get dashboard statistics

### GET /analytics/user/:userId
Get user analytics

### GET /analytics/project/:projectId
Get project analytics

### GET /analytics/market-trends
Get market trends

### GET /analytics/investment-performance/:userId
Get investment performance

### GET /analytics/portfolio-distribution/:userId
Get portfolio distribution

### POST /analytics/track
Track user activity

## File Upload Endpoints

### POST /upload/single
Upload single file

### POST /upload/multiple
Upload multiple files

### DELETE /upload/:fileId
Delete uploaded file

## Response Format

All API responses follow this format:
```json
{
  "success": boolean,
  "message": "string",
  "data": any,
  "error": boolean (optional)
}
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## Error Codes

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error