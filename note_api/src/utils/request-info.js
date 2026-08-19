import https from "https"; // Naming ta 'https' kora holo jate standard thake

export const getLocationFromIP = (ip) => {
  return new Promise((resolve) => {
    if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.")) {
      return resolve("Localhost");
    }

    https.get(`https://ip-api.com/json/${ip}`, (res) => {
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
  });
};

export const getRequestDetails = async (req) => {
  const rawIp =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.socket.remoteAddress;

  const ipAddress = rawIp === "::1" ? "127.0.0.1" : rawIp;

  // 1. IP Theke Location
  const location = await getLocationFromIP(ipAddress);

  // 2. Browser ba System er Default User Agent
  const userAgent = req.headers["user-agent"] || "Unknown User Agent";

  // 3. React Native Mobile App theke asha Custom Device Info
  // (Frontend theke API call korar somoy headers e 'x-device-info' pathate hobe)
  const deviceInfo =
    req.headers["x-device-info"] || "Web Browser / Unknown Device";

  // Tomar session model er sathe match kore sob return kora hocche
  return {
    ipAddress,
    location,
    userAgent,
    deviceInfo,
  };
};
