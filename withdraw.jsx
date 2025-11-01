import React, { useState } from "react";
import { getContract, prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "./App";

const chain = defineChain(8453);
const stakingAddress = "0xef7d6880e7837D06bAa6090F8378592F3B4e174a";

const staking = getContract({ client, chain, address: stakingAddress });

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  async function doWithdraw() {
    try {
      setMsg("Processing...");

      const parsed = BigInt(amount) * 10n ** 18n;

      const tx = await prepareContractCall({
        contract: staking,
        method: "withdraw",
        params: [parsed],
        value: 0n,
      });

      await sendAndConfirmTransaction({ transaction: tx, client });

      setMsg("✅ Withdraw berhasil!");
    } catch (e) {
      console.error(e);
      setMsg("❌ Withdraw gagal");
    }
  }

  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>Withdraw Token</h3>
      <input
        type="number"
        placeholder="Jumlah"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: 8, width: 150 }}
      />
      <button onClick={doWithdraw} style={{ marginLeft: 10, padding: "8px 12px" }}>
        Withdraw
      </button>
      <p>{msg}</p>
    </div>
  );
}