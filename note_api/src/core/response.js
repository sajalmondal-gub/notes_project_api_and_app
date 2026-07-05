class Response {
  static extend(res) {
    res.sendJSON = (statusCode, data) => {
      if (res.writableEnded)  return;
      res.statusCode = statusCode;
      res.setHeader("Content-Type", "application/json");
       res.end(JSON.stringify(data));
    };
    res.status = (statusCode) => {
      res.statusCode = statusCode;
      return res;
    };
    return res;
  }
}
export default Response;