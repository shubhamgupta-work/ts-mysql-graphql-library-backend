const globalErrorHandler: (err: Error) => void = (err: Error) => {
  throw err;
};

export default globalErrorHandler;
