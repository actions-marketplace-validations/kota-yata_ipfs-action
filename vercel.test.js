const uploader = require("./uploader");

const options = {
  path: "./build",
  service: "pinata",
  port: 5001,
  protocol: "https",
  timeout: 1000,
  verbose: true,
  pinataKey: "1d7d6d3b7bf45ad9b736", // your Pinata key (DO NOT PUSH YOUR CODE WITH YOUR TOKEN!!)
  pinataSecret: "957c3c265600116576c5c6831c12ef47b677bcd3f7fec8c818d31804cab15209", // your Pinata secret (DO NOT PUSH YOUR CODE WITH YOUR TOKEN!!)
  vercelDomain: "kota-yata.com",
  vercelToken: "6WHvUh9ohTBBHxnzBIdUKTRi" // your vercel token (DO NOT PUSH YOUR CODE WITH YOUR TOKEN!!)
};

uploader.upload({ ...options });
