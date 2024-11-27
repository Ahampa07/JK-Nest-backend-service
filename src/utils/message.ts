export const Message = Object.freeze({
  HTTP: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    TOKEN_CREATION_FAILED: 'Failed to generate token',
    BAD_REQUEST: 'Bad request',
  },
  USER: {
    CREATED: 'Registered successfully.',
    NOT_FOUND: 'User not found',
    UPDATED: 'User updated successfully.',
    FETCH_SUCCESS: 'User fetched successfully.',
    DELETE_SUCCESS: 'User deleted successfully.',
    EMAIL_NOT_FOUND: 'Email not found',
    LOGIN_FAILED: 'Login failed, invalid username or password',
    LOGIN_SUCCESS: 'Login successfull',
    LOGOUT_SUCCESS: 'Logout successfull',
    WEAK_PASSWORD:
      'Password Must Contain One Uppercase, One Lowercase, One Number, One Special Case and Minimum 8 Characters',
    INVALID_CRED: 'Invalid username or password',
    USER_EXIST:
      'User already registered, please login with username and password',
  }
})