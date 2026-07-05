export default async function loggerMiddleware(req, res, next) {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const timeInMs = Number(end - start) / 1_000_000;
     console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${timeInMs.toFixed(2)}ms`
    );
  });
  await next();
};
