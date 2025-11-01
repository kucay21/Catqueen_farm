import React, { useState } from "react";
import { getContract, writeContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "./App";

const chain = defineChain(8453);
const stakingAddress = "0xef7d6880e7837D06bAa6090F8378592F3B4e174a";
const tokenAddress = "0x586f3cb4a16c8dbf6a62b599a73eca9cd0b945fe";

const stakingAbi = [
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export default function Stake() {
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  async function doStake() {
    try {
      if (!amount || Number(amount) <= 0) {
        setMsg("❌ Masukkan jumlah token valid");
        return;
      }

      setMsg("Processing...");
      const parsed = BigInt(amount) * 10n ** 18n;

      const token = getContract({ client, chain, address: tokenAddress });
      const staking = getContract({
        client,
        chain,
        address: stakingAddress,
        abi: stakingAbi,
      });

      // 1️⃣ Approve
      await writeContract({
        contract: token,
        method: "approve",
        params: [stakingAddress, parsed],
        chain,
        client,
      });

      // 2️⃣ Stake
      await writeContract({
        contract: staking,
        method: "stake",
        params: [parsed],
        value: 0n, // 0
        chain,
        client,
      });

      setMsg("✅ Stake berhasil!");
    } catch (e) {
      console.error("Stake error:", e);
      setMsg("❌ Error staking: " + e.message);
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
