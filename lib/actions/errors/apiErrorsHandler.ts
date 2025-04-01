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

export function getSerpApiError(errorCode: string): ErrorMessage {
  switch (errorCode) {
    case 'invalid_key':
      return { errorCode: errorCode, message: 'Invalid API key provided. Please check your SerpAPI key.' };
    case 'invalid_parameter':
      return { errorCode: errorCode, message: 'Invalid parameter provided in the request.' };
    case 'invalid_request':
      return { errorCode: errorCode, message: 'Invalid request format or missing required parameters.' };
    case 'unsupported_media':
      return { errorCode: errorCode, message: 'Unsupported media type in the request.' };
    case 'account_inactive':
      return { errorCode: errorCode, message: 'Your SerpAPI account is inactive. Please check your account status.' };
    case 'rate_limit_exceeded':
      return { errorCode: errorCode, message: 'API rate limit exceeded. Please wait before making more requests.' };
    case 'insufficient_credits':
      return { errorCode: errorCode, message: 'Insufficient API credits. Please top up your account.' };
    case 'disallowed_agent':
      return { errorCode: errorCode, message: 'Request blocked due to disallowed user agent.' };
    case 'no_results':
      return { errorCode: errorCode, message: 'No results found for your query.' };
    case 'timeout':
      return { errorCode: errorCode, message: 'Request timed out. Please try again.' };
    case 'internal_error':
      return { errorCode: errorCode, message: 'Internal server error at SerpAPI. Please try again later.' };
    case 'service_unavailable':
      return { errorCode: errorCode, message: 'SerpAPI service is temporarily unavailable. Please try again later.' };
    case 'search_error':
      return { errorCode: errorCode, message: 'Error occurred while performing the search.' };
    case 'engine_not_found':
      return { errorCode: errorCode, message: 'Requested search engine not found or not supported.' };
    case 'engine_timeout':
      return { errorCode: errorCode, message: 'Search engine timed out while processing your request.' };
    case 'engine_overloaded':
      return { errorCode: errorCode, message: 'Search engine is currently overloaded. Please try again later.' };
    case 'database_error':
      return { errorCode: errorCode, message: 'Database error occurred while processing your request.' };
    case 'proxy_error':
      return { errorCode: errorCode, message: 'Proxy error occurred while processing your request.' };
    case 'unknown_error':
      return { errorCode: errorCode, message: 'Unknown error occurred while processing your request.' };
    default:
      return { errorCode: errorCode, message: 'An unknown SerpAPI error occurred. Please try again later.' };
  }
}

export function getWeatherApiError(errorCode: number): ErrorMessage {
  switch (errorCode) {
    case 1003:
      return { errorCode: errorCode.toString(), message: 'Location not found. Please enter a valid location.' };
    case 1005:
      return { errorCode: errorCode.toString(), message: 'API request URL is invalid.' };
    case 1006:
      return { errorCode: errorCode.toString(), message: 'No location found matching the parameter.' };
    case 2006:
      return { errorCode: errorCode.toString(), message: 'Invalid API key provided.' };
    case 2007:
      return { errorCode: errorCode.toString(), message: 'API key has exceeded its monthly quota.' };
    case 2008:
      return { errorCode: errorCode.toString(), message: 'API key has been disabled.' };
    case 2009:
      return { errorCode: errorCode.toString(), message: 'API key does not have access to this resource.' };
    case 9000:
      return { errorCode: errorCode.toString(), message: 'JSON body parsing failed.' };
    case 9001:
      return { errorCode: errorCode.toString(), message: 'API subscription does not support this endpoint.' };
    case 9999:
      return { errorCode: errorCode.toString(), message: 'Internal application error.' };
    // HTTP status code based errors
    case 400:
      return { errorCode: errorCode.toString(), message: 'Bad request - Invalid parameters provided.' };
    case 401:
      return { errorCode: errorCode.toString(), message: 'Unauthorized - Invalid or missing API key.' };
    case 403:
      return { errorCode: errorCode.toString(), message: 'Forbidden - Access denied for this resource.' };
    case 404:
      return { errorCode: errorCode.toString(), message: 'Weather API resource not found.' };
    case 405:
      return { errorCode: errorCode.toString(), message: 'Method not allowed - Invalid HTTP method used.' };
    case 415:
      return { errorCode: errorCode.toString(), message: 'Unsupported media type.' };
    case 429:
      return { errorCode: errorCode.toString(), message: 'Too many requests - Rate limit exceeded.' };
    case 500:
      return { errorCode: errorCode.toString(), message: 'Internal server error at WeatherAPI.' };
    case 502:
      return { errorCode: errorCode.toString(), message: 'Bad gateway error.' };
    case 503:
      return { errorCode: errorCode.toString(), message: 'WeatherAPI service unavailable.' };
    case 504:
      return { errorCode: errorCode.toString(), message: 'Gateway timeout error.' };
    default:
      if (errorCode >= 1000 && errorCode < 2000) {
        return { errorCode: errorCode.toString(), message: 'Location or parameter related error occurred.' };
      } else if (errorCode >= 2000 && errorCode < 3000) {
        return { errorCode: errorCode.toString(), message: 'API key or authentication error occurred.' };
      } else if (errorCode >= 9000) {
        return { errorCode: errorCode.toString(), message: 'Internal API error occurred.' };
      }
      return { errorCode: errorCode.toString(), message: 'An unknown WeatherAPI error occurred.' };
  }
}

// ... (previous functions remain the same)

export function getFoursquareApiError(errorCode: string | number): ErrorMessage {
  // Handle both string and numeric error codes
  const code = typeof errorCode === 'number' ? errorCode.toString() : errorCode;

  switch (code) {
    // Authentication errors
    case 'invalid_auth':
    case '401':
      return { errorCode: code, message: 'Invalid authentication credentials.' };
    case 'oauth_token_invalid':
      return { errorCode: code, message: 'The provided OAuth token is invalid or expired.' };
    case 'oauth_consumer_rejected':
      return { errorCode: code, message: 'The consumer key was rejected.' };

    // Rate limiting
    case 'rate_limit_exceeded':
    case '429':
      return { errorCode: code, message: 'API rate limit exceeded. Please wait before making more requests.' };

    // Parameter errors
    case 'param_error':
      return { errorCode: code, message: 'One or more required parameters were missing or invalid.' };
    case 'invalid_request':
    case '400':
      return { errorCode: code, message: 'The request was invalid or malformed.' };

    // Permission errors
    case 'not_authorized':
    case '403':
      return { errorCode: code, message: 'You are not authorized to perform this action.' };
    case 'endpoint_permission_denied':
      return { errorCode: code, message: 'Your developer account does not have permission to access this endpoint.' };

    // Not found errors
    case 'not_found':
    case '404':
      return { errorCode: code, message: 'The requested resource could not be found.' };

    // Versioning errors
    case 'deprecated':
      return { errorCode: code, message: 'This API version is deprecated. Please upgrade to the latest version.' };
    case 'version_mismatch':
      return { errorCode: code, message: 'API version mismatch. Check your API version headers.' };

    // Server errors
    case 'server_error':
    case '500':
      return { errorCode: code, message: 'Internal server error. Please try again later.' };
    case 'service_unavailable':
    case '503':
      return { errorCode: code, message: 'Service temporarily unavailable. Please try again later.' };

    // Foursquare-specific business errors
    case 'venue_already_exists':
      return { errorCode: code, message: 'This venue already exists in our database.' };
    case 'venue_too_fast':
      return { errorCode: code, message: 'You are creating venues too quickly. Please slow down.' };
    case 'invalid_venue_id':
      return { errorCode: code, message: 'The provided venue ID is invalid.' };
    case 'invalid_checkin':
      return { errorCode: code, message: 'This check-in cannot be performed.' };
    case 'invalid_tip':
      return { errorCode: code, message: 'The requested tip action is invalid.' };
    case 'invalid_photo':
      return { errorCode: code, message: 'The photo operation could not be completed.' };
    case 'invalid_user':
      return { errorCode: code, message: 'The user specified could not be found.' };
    case 'invalid_list':
      return { errorCode: code, message: 'The list specified could not be found.' };

    // Quota and limits
    case 'quota_exceeded':
      return { errorCode: code, message: 'Your daily quota has been exceeded.' };
    case 'user_throttled':
      return { errorCode: code, message: 'Your account has been throttled due to excessive API calls.' };

    // Special cases
    case 'https_required':
      return { errorCode: code, message: 'HTTPS is required for this endpoint.' };
    case 'ssl_required':
      return { errorCode: code, message: 'SSL is required for this endpoint.' };

    default:
      // Handle numeric ranges
      if (typeof errorCode === 'number') {
        if (errorCode >= 400 && errorCode < 500) {
          return { errorCode: code, message: 'Client error occurred with your request.' };
        }
        if (errorCode >= 500 && errorCode < 600) {
          return { errorCode: code, message: 'Server error occurred. Please try again later.' };
        }
      }
      return { errorCode: code, message: 'An unknown Foursquare API error occurred.' };
  }
}

export function getAeroDataboxError(errorCode: number, errorMessage?: string): ErrorMessage {
  const defaultMessages: { [key: number]: string } = {
    204: 'No content available for the request.',
    400: 'Bad request. The server could not understand the request due to invalid syntax.',
    401: 'Unauthorized. Authentication is required and has failed or not been provided.',
    451: 'Unavailable for legal reasons. The requested resource is not available due to legal restrictions.',
    500: 'Internal server error. The server encountered an unexpected condition.',
    503: 'Service unavailable. The server is currently unable to handle the request.'
  };

  // Use the provided error message if available, otherwise fall back to default messages
  const message = errorMessage || defaultMessages[errorCode] || 'An unknown AeroDatabox API error occurred.';

  return {
    errorCode: errorCode.toString(),
    message: message
  };
}

// ... (previous functions remain the same)

export function getGoogleMapsGeocodeError(status: string, errorMessage?: string): ErrorMessage {
  const statusMessages: Record<string, string> = {
    'OK': 'The request was successful.',
    'ZERO_RESULTS': 'No results found for the provided address.',
    'OVER_DAILY_LIMIT': 'The API key has exceeded its daily quota.',
    'OVER_QUERY_LIMIT': 'The API key has exceeded its request rate limit.',
    'REQUEST_DENIED': 'The request was denied (invalid API key or unauthorized).',
    'INVALID_REQUEST': 'The request was invalid (missing address or malformed parameters).',
    'UNKNOWN_ERROR': 'An unknown server error occurred. Please try again.',
    'NOT_FOUND': 'The requested resource was not found.'
  };

  // Special case for OK status which isn't actually an error
  if (status === 'OK') {
    return {
      errorCode: status,
      message: statusMessages[status]
    };
  }

  return {
    errorCode: status,
    message: errorMessage || statusMessages[status] || 'An unknown Google Maps Geocoding error occurred.'
  };
}