import { parse } from "url";

class Request {
  static extend(req) {
    const parsedUrl = parse(req.url, true);
    req.path = parsedUrl.pathname;
    req.query = parsedUrl.query;
    req.params = {};
    req.get = (headerName) =>
      req.headres[headerName.toLowerCase()] ?? undefined;
    req.protocol = req.socket.encrypted ? "https" : "http";
    req.hostname = req.headers.host?.split(":")[0];
    req.ip = req.socket.remoteAddress;
    // console.log(req);
    return req;
  }
}
export default Request;
