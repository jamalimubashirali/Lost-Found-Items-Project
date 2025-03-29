const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  const statusCode = err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong please try again later",
    stack: process.env.NODE_ENV === "dovelopment" ? err.stack : undefined,
  });
};

export { errorHandler };
