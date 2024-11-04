export function getAuthError(errorCode: string): ErrorMessage {
  switch (errorCode) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
      return { errorCode: errorCode, message: 'Incorrect email or password.' };
    case 'auth/email-already-in-use':
      return { errorCode: errorCode, message: 'Email already in use.' };
    case 'auth/operation-not-allowed':
      return { errorCode: errorCode, message: 'Operation not allowed.' };
    case 'auth/user-not-found':
      return { errorCode: errorCode, message: 'User not found.' };
    case 'auth/invalid-email':
      return { errorCode: errorCode, message: 'Invalid email address.' };
    case 'auth/weak-password':
      return { errorCode: errorCode, message: 'Password is too weak.' };
    default:
      return { errorCode: errorCode, message: 'An unknown error occurred.' };
  }
}

export function getFirestoreError(errorCode: string): ErrorMessage {
  switch (errorCode) {
    case 'permission-denied':
      return { errorCode: errorCode, message: 'You do not have permission to perform this operation.' };
    case 'not-found':
      return { errorCode: errorCode, message: 'Requested document not found.' };
    case 'unavailable':
      return { errorCode: errorCode, message: 'Firestore service is currently unavailable.' };
    case 'invalid-argument':
      return { errorCode: errorCode, message: 'Invalid arguments provided to Firestore operation.' };
    default:
      return { errorCode: errorCode, message: 'An unknown error occurred.' };
  }
}

export function getCookiesError(errorCode: string): ErrorMessage {
  switch (errorCode) {
    case 'cookie/invalid-key':
      return { errorCode: errorCode, message: 'Invalid cookie key provided.' };
    case 'cookie/set-failed':
      return { errorCode: errorCode, message: 'Failed to set cookie.' };
    case 'cookie/get-failed':
      return { errorCode: errorCode, message: 'Failed to retrieve cookie.' };
    case 'cookie/remove-failed':
      return { errorCode: errorCode, message: 'Failed to remove cookie.' };
    case 'cookie/expired':
      return { errorCode: errorCode, message: 'The cookie has expired.' };
    default:
      return { errorCode: errorCode, message: 'An unknown cookie error occurred.' };
  }
}

export function getHttpError(statusCode: number): ErrorMessage {
  switch (statusCode) {
    case 400:
      return { errorCode: 'http/bad-request', message: 'Bad request. Please check your input and try again.' };
    case 401:
      return { errorCode: 'http/unauthorized', message: 'Unauthorized. Please log in to continue.' };
    case 403:
      return { errorCode: 'http/forbidden', message: 'Forbidden. You do not have permission to access this resource.' };
    case 404:
      return { errorCode: 'http/not-found', message: 'Resource not found. The requested item does not exist.' };
    case 408:
      return { errorCode: 'http/request-timeout', message: 'Request timed out. Please try again.' };
    case 429:
      return { errorCode: 'http/too-many-requests', message: 'Too many requests. Please wait and try again later.' };
    case 500:
      return { errorCode: 'http/internal-server-error', message: 'Internal server error. Please try again later.' };
    case 502:
      return { errorCode: 'http/bad-gateway', message: 'Bad gateway. There may be an issue with the server.' };
    case 503:
      return { errorCode: 'http/service-unavailable', message: 'Service unavailable. Please try again later.' };
    case 504:
      return { errorCode: 'http/gateway-timeout', message: 'Gateway timed out. Please try again later.' };
    default:
      return { errorCode: 'http/unknown-error', message: 'An unknown error occurred. Please try again later.' };
  }
}