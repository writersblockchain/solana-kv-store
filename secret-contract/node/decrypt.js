import { SecretNetworkClient } from "secretjs";

const routing_contract = "secret1p0zdxcnllslmajawwag7wxrf83th83k7asyfqr";
const routing_code_hash =
  "3d250d179d27d98c918ec4ee82d8f7e298b70748362d54093d1658fb9754635a";

let query = async () => {
  const key = "password";

  const secretjs = new SecretNetworkClient({
    url: "https://pulsar.lcd.secretnodes.com",
    chainId: "pulsar-3",
  });

  const query_tx = await secretjs.query.compute.queryContract({
    contract_address: routing_contract,
    code_hash: routing_code_hash,
    query: { retrieve_value: { key: key } },
  });
  console.log(query_tx);
};

query();
