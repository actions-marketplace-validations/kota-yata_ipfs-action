const uploader = require("./uploader");

const options = {
  path: "./build",
  service: "pinata",
  port: 5001,
  protocol: "https",
  timeout: 1000,
  verbose: true,
  pinataKey: "", // your Pinata key (DO NOT PUSH YOUR CODE WITH YOUR TOKEN!!)
  pinataSecret: "", // your Pinata secret (DO NOT PUSH YOUR CODE WITH YOUR TOKEN!!)
  vercelDomain: "kota-yata.com",
  vercelToken: "" // your vercel token (DO NOT PUSH YOUR CODE WITH YOUR TOKEN!!)
};

uploader.upload({ ...options });
