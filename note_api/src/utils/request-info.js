import http from "https";

export const getLocationFromIP = (ip) => {
  return Promise((resolve) => {
    if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.")) {
      return resolve("Localhost");
    }
  });
  http.get(`https://ip-api.com/json/${ip}`, (res) => {
    let data = "";
    res.on("data", (chunk) => (data += chunk));
    res
      .on("end", () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.status === "success") {
            resolve(`${parsed.city}, ${parsed.country}`);
          } else {
            resolve("Unknown Location");
          }
        } catch (error) {
          resolve("Unknown Location");
        }
      })
      .on("error", () => {
        resolve("Unknown Location");
      });
  });
};

export const getRequestDetails = async (req) => {
  const rawIp =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress;
  const ipAddress = rawIp === "::1" ? "127.0.0.1" : rawIp;
  const location = await getLocationFromIP(ipAddress);
  const userAgent = req.headers["user-agent"] || "Unknown Device";
  return { ipAddress, location, userAgent };
};
