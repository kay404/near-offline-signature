const { utils, transactions } = require("near-api-js");
const sha256 = require("js-sha256");
const path = require("path");
const homedir = require("os").homedir();
// const CREDENTIALS_DIR = ".near-credentials";
const networkId = "testnet";
const sender = "shanks.testnet";
const contractId = "ft.shanks.testnet";
const keyFilePath = path.resolve(
  homedir,
  `./.near-credentials/${networkId}/${sender}.json`
);
const keyFile = require(keyFilePath);

const nonce = 78589014000036;
const blockHash = utils.serialize.base_decode(
  "GB7pyWEqQY9jhFKLQBKju9cdSw43P5F6DZU1J6tYe3QC"
);

const actions = [
  transactions.functionCall(
    "mint",
    { account_id: "shanks.testnet", amount: "10000000000000000000" },
    "30000000000000",
    "0"
  ),
];
// create transaction
const keyPair = utils.key_pair.KeyPairEd25519.fromString(keyFile.private_key);
const transaction = transactions.createTransaction(
  sender,
  keyPair.getPublicKey(),
  contractId,
  nonce,
  actions,
  blockHash
);

const serializedTx = utils.serialize.serialize(
  transactions.SCHEMA,
  transaction
);

const serializedTxHash = new Uint8Array(sha256.sha256.array(serializedTx));
const signature = keyPair.sign(serializedTxHash);
const signedTransaction = new transactions.SignedTransaction({
  transaction,
  signature: new transactions.Signature({
    keyType: transaction.publicKey.keyType,
    data: signature.signature,
  }),
});
const signedSerializedTx = signedTransaction.encode();
console.log(Buffer.from(signedSerializedTx).toString("base64"));
