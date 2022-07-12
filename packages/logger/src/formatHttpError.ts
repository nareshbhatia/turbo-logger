/**
 * Formats the error received in an HTTP response. Checks to see if
 * error.response exits. If yes, tries to pull detailed error messages
 * from there (probably axios specific, but should be safe).
 *
 * @param error
 */
export const formatHttpError = (error: any): string => {
  if (error.response) {
    // The request was made and the server responded with a
    // status code that falls out of the 2xx range
    const data = error.response.data;
    if (data === undefined) {
      return error.message;
    } else if (data.errors && data.errors.length > 0) {
      return data.errors.map((error: any) => error.message).join(', ');
    } else if (data.message) {
      return data.message;
    } else {
      return error.message;
    }
  } else if (error.request) {
    // The request was made but no response was received, `error.request`
    // is an instance of XMLHttpRequest in the browser and an instance
    // of http.ClientRequest in Node.js
    return error.message;
  } else {
    // Something happened in setting up the request and triggered an Error
    return error.message;
  }
};
