const nearAPI = require("near-api-js");
const networkId = "testnet";

// sets up a NEAR API/RPC provider to interact with the blockchain
const provider = new nearAPI.providers.JsonRpcProvider({
  url: `https://rpc.${networkId}.near.org`,
});

const signedTx =
  "DgAAAHNoYW5rcy50ZXN0bmV0APpOHmxD1aOeKBMfmimcW1Bvj+rpitANaFDvllRHBO2wpEFD7nlHAAARAAAAZnQuc2hhbmtzLnRlc3RuZXThdtTaiObV6W4KLt2sW8Gb8FIZI+vMIxOlfSxa+tJK4QEAAAACBAAAAG1pbnQ/AAAAeyJhY2NvdW50X2lkIjoic2hhbmtzLnRlc3RuZXQiLCJhbW91bnQiOiIxMDAwMDAwMDAwMDAwMDAwMDAwMCJ9AOBX60gbAAAAAAAAAAAAAAAAAAAAAAAAAOFDOwrhQd/irp5MXpwgiQPypd3aWDrYPE4yJ05LwDzyltQ4Prtyfm0yFhPZrngPt3/g6GmM8bI/VFsIgPUtPw4=";

(async () => {
  console.log("Processing transaction...");
  // send the transaction!
  try {
    // sends transaction to NEAR blockchain via JSON RPC call and records the result
    const result = await provider.sendJsonRpc("broadcast_tx_commit", [
      signedTx,
    ]);
    // console results :)
    console.log("Transaction Results: ", result.transaction);
    console.log(
      "--------------------------------------------------------------------------------------------"
    );
    console.log("OPEN LINK BELOW to see transaction in NEAR Explorer!");
    console.log(
      `$https://explorer.${networkId}.near.org/transactions/${result.transaction.hash}`
    );
    console.log(
      "--------------------------------------------------------------------------------------------"
    );
  } catch (error) {
    console.log(error);
  }
})();