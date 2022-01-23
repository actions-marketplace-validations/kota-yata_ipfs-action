const axios = require("axios");

const getRecordList = async(domain, headers) => {
  const response = await axios.get(`https://api.vercel.com/v4/domains/${domain}/records`, { headers });
  return response.data.records;
};

const removeDNSLinkRecord = async (domain, headers, recordList) => {
  const filtered = recordList.filter((record) => record.type === "TXT" && record.value.includes("dnslink=/ipfs/"));
  filtered.map((record) => axios.delete(`https://api.vercel.com/v2/domains/${domain}/records/${record.id}`, { headers }).catch(err => { throw new Error(err) }));
};

const setRecord = async (cid, domain, headers) => {
  const response = axios.post(`https://api.vercel.com/v4/domains/${domain}/records`, {
    type: "TXT",
    name: "",
    value: `dnslink=/ipfs/${cid}`
  }, { headers });
  return response;
}

module.exports = {
  changeDNS: async (cid, domain, token) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
    const recordList = await getRecordList(domain, headers);
    await removeDNSLinkRecord(domain, headers, recordList);
    const response = await setRecord(cid, domain, headers);
    return response.data.uid;
  }
}
