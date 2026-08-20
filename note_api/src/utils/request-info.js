import https from "https";

export const getLocationFromIP = (ip) => {
  return new Promise((resolve) => {
    // 1. Localhost ba WiFi router er IP hole real location pawa jabe na
    if (ip === "::1" || ip === "127.0.0.1" || ip.startsWith("192.168.")) {
      return resolve("Localhost");
    }

    // 2. Free and HTTPS Supported API (ipwho.is)
    https.get(`https://ipwho.is/${ip}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          // ipwho.is er response-e success namer ekta boolean thake
          if (parsed.success) { 
            resolve(`${parsed.city}, ${parsed.country}`);
          } else {
            resolve("Unknown Location");
          }
        } catch (error) {
          resolve("Unknown Location");
        }
      });
    }).on("error", () => {
      resolve("Unknown Location");
    });
  });
};

export const getRequestDetails = async (req) => {
  // Mobile app er proxy ba direct request theke IP ber kora
  const rawIp = req.headers["x-forwarded-for"]?.split(",")[0].trim() || req.socket.remoteAddress;

  const ipAddress = rawIp === "::1" ? "127.0.0.1" : rawIp;

  // Real IP theke Location ber kora
  const location = await getLocationFromIP(ipAddress);

  const userAgent = req.headers["user-agent"] || "Unknown User Agent";
  const deviceInfo = req.headers["x-device-info"] || "Unknown Device";

  return {
    ipAddress,
    location,
    userAgent,
    deviceInfo,
  };
};