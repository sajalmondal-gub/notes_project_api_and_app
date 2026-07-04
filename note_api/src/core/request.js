import url from "http";

class Request {
  static extend(req) {
    const parsedUrl = url.parse(req.url, true);
    req.path = parsedUrl.pathname;
    
    req.query = parsedUrl.query;
    req.params = {};
    req.get = (headerName) => req.headres[headerName.toLowerCase()];
    console.log(req);
    return req;
  }
}
module.exports = Request;
