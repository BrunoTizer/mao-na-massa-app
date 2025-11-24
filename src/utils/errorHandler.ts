export const getErrorMessage = (error: any, defaultMessage: string): string => {
  if (typeof error?.response?.data === 'string') {
    return error.response.data;
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  return defaultMessage;
};
