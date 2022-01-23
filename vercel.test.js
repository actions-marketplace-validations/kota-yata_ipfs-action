const uploader = require("./uploader");

const options = {
  path: "./build",
  service: "ipfs",
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  timeout: 1000,
  verbose: true,
  vercelDomain: "kota-yata.com",
  vercelToken: "" // your vercel token (DO NOT PUSH YOUR CODE WITH YOUR TOKEN!!)
};

uploader.upload({ ...options });
