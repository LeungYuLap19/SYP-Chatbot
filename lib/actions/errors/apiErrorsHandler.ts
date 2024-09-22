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
