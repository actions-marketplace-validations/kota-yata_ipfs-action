const axios = require("axios");

module.exports = {
  changeDNS: async (cid, domain, token) => {
    const response = axios.post(`https://api.vercel.com/v4/domains/${domain}/records`, {
      type: "TXT",
      name: "",
      value: `dnslink=/ipfs/${cid}`
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    return response;
  }
}
