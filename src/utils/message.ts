export const Message = Object.freeze({
  HTTP: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    TOKEN_CREATION_FAILED: 'Failed to generate token',
    BAD_REQUEST: 'Bad request',
  },
  USER: {
    CREATED: 'Registered successfully.',
    NOT_FOUND: 'User not found',
    FORGOT_PASSWORD_FAIL:
      'Please enter your valid email address to generate a password recovery email',
    FORGOT_PASS_EMAIL:
      'A password reset link was sent. Click the link in the email to create new password',
    UPDATED: 'User updated successfully.',
    FETCH_SUCCESS: 'User fetched successfully.',
    DELETE_SUCCESS: 'User deleted successfully.',
    PASSWORD_UPDATED: 'User password updated successfully.',
    RESET_PASS: 'Password reset successfully.',
    OTP_EXPIRED: 'OTP is expired',
    INVALID_OTP: 'Invalid OTP',
    OTP_RESEND: 'Otp sent successfully.',
    INCORRECT_PASSWORD: 'Incorrect password, please try again',
    CORRECT_PASSWORD: 'Password verified successfully',
    EMAIL_NOT_FOUND: 'Email not found',
    LOGIN_FAILED: 'Login failed, invalid username or password',
    LOGIN_SUCCESS: 'Login successfull',
    LOGOUT_SUCCESS: 'Logout successfull',
    HASH_NOT_FOUND: 'Hash not found',
    JWT_LINK_EXPIRED: 'JWT link has expired',
    WEAK_PASSWORD:
      'Password Must Contain One Uppercase, One Lowercase, One Number, One Special Case and Minimum 8 Characters',
    INVALID_CRED: 'Invalid username or password',
    USER_EXIST:
      'User already registered, please login with username and password',
  }
})