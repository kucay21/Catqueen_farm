import React, { useState } from "react";
import { getContract, prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "./App";

const chain = defineChain(8453);

const stakingAddress = "0xef7d6880e7837D06bAa6090F8378592F3B4e174a";
const tokenAddress = "0x586f3cb4a16c8dbf6a62b599a73eca9cd0b945fe";

const staking = getContract({ client, chain, address: stakingAddress });
const token = getContract({ client, chain, address: tokenAddress });

export default function Stake() {
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  async function doStake() {
    try {
      setMsg("Processing...");

      const parsed = BigInt(amount) * 10n ** 18n;

      // APPROVE
      const approveTx = await prepareContractCall({
        contract: token,
        method: "approve",
        params: [stakingAddress, parsed],
      });

      await sendAndConfirmTransaction({ transaction: approveTx, client });

      // STAKE
      const stakeTx = await prepareContractCall({
        contract: staking,
        method: "stake",
        params: [parsed],
        value: 0n,
      });

      await sendAndConfirmTransaction({ transaction: stakeTx, client });

      setMsg("✅ Stake berhasil!");
    } catch (e) {
      console.error(e);
      setMsg("❌ Error staking");
    }
  }

  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>Stake Token</h3>
      <input
        type="number"
        placeholder="Jumlah"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: 8, width: 150 }}
      />
      <button onClick={doStake} style={{ marginLeft: 10, padding: "8px 12px" }}>
        Stake
      </button>
      <p>{msg}</p>
    </div>
  );
}