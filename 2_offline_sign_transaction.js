/*
 * @Description: 
 * @Author: kay
 * @Date: 2022-03-22 14:46:35
 * @LastEditTime: 2022-04-02 17:34:26
 * @LastEditors: kay
 */
const { utils, transactions } = require("near-api-js");
const sha256 = require("js-sha256");
const path = require("path");
const homedir = require("os").homedir();
// const CREDENTIALS_DIR = ".near-credentials";
const networkId = "testnet";
const sender = "shanks.testnet";
const contractId = "ft.shanks.testnet";

// get pirvate key from key file
const keyFilePath = path.resolve(
  homedir,
  `./.near-credentials/${networkId}/${sender}.json`
);
const keyFile = require(keyFilePath);
const keyPair = utils.key_pair.KeyPairEd25519.fromString(keyFile.private_key);

// get PrivateKey from mnemonic
// const { parseSeedPhrase } = require("near-seed-phrase");
// let mnemonic = "put lemon lunch resource space gloom lonely melody crew lazy among grace";
// let { secretKey, publicKey } = parseSeedPhrase(mnemonic);
// const keyPair = utils.key_pair.KeyPairEd25519.fromString(secretKey);

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
