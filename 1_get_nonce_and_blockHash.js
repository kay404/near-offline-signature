const { providers } = require("near-api-js");
const sender = "SENDER_ID";
const networkId = "testnet";
const publicKey = "ed25519:Hr61mCNpgBxuCNJNAH82A6fKhsXsSsUB8zp1m2VYTars";
const provider = new providers.JsonRpcProvider({
  url: `https://rpc.${networkId}.near.org`,
});

(async () => {
  const accessKey = await provider.query(
    `access_key/${sender}/${publicKey}`,
    ""
  );
  const nonce = ++accessKey.nonce;
  const blockHash = accessKey.block_hash;
  console.log("nonce =", nonce, ", blockHash =", blockHash);
})();
