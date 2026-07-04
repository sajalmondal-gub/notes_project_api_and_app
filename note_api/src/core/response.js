class Response {
  static extend(res) {
    res.sendJSON = (statusCode, data) => {
      if (res.writeableEnded) {
        return;
      }
      res.writeHead(statusCode, { "content-type": "application/json" });
      res.end(JSON.stringify(data));
    };
    res.status = (statusCode) => {
      res.statusCode = statusCode;
      return res;
    };
    return res;
  }
}
