const core = require("@actions/core");
const github = require("@actions/github");
const Vercel = require("./vercel.js");

const uploader = require("./uploader");

async function run() {
  try {
    const path = core.getInput("path");
    const service = core.getInput("service");
    const host = core.getInput("host");
    const port = core.getInput("port");
    const protocol = core.getInput("protocol");
    const headers = core.getInput("headers");
    const key = core.getInput("key");
    const pinataKey = core.getInput("pinataKey");
    const pinataSecret = core.getInput("pinataSecret");
    const pinataPinName = core.getInput("pinataPinName");
    const timeout = core.getInput("timeout");
    const verbose = core.getInput("verbose") === "true";
    const vercelDomain = core.getInput("vercelDomain");
    const vercelToken = core.getInput("vercelToken");

    const options = {
      path,
      service,
      host,
      port,
      protocol,
      headers: JSON.parse(headers || "{}"),
      key,
      pinataKey,
      pinataSecret,
      pinataPinName,
      timeout,
      verbose,
      vercelDomain,
      vercelToken
    };
    const result = await uploader.upload(options).catch((err) => {
      throw err;
    });

    let vercelUid;
    if (vercelDomain && vercelToken) {
      vercelUid = await Vercel.changeDNS(result.ipfs, vercelDomain, vercelToken);
    }

    core.setOutput("hash", result.ipfs);
    core.setOutput("cid", result.cid);
    core.setOutput("ipfs", result.ipfs);
    core.setOutput("ipns", result.ipns);
    core.setOutput("vercel uid", vercelUid);

    if (verbose) {
      // Get the JSON webhook payload for the event that triggered the workflow
      const payload = JSON.stringify(github.context.payload, undefined, 2);
      console.log(`The event payload: ${payload}`);
    }

    console.log("Upload to IPFS finished successfully", result);
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

module.exports = run;
