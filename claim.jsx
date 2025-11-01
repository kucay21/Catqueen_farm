import React, { useState } from "react";
import { getContract, prepareContractCall, sendAndConfirmTransaction } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { client } from "./App";

const chain = defineChain(8453);
const stakingAddress = "0xef7d6880e7837D06bAa6090F8378592F3B4e174a";

const staking = getContract({ client, chain, address: stakingAddress });

export default function Claim() {
  const [msg, setMsg] = useState("");

  async function doClaim() {
    try {
      setMsg("Processing...");

      const tx = await prepareContractCall({
        contract: staking,
        method: "claimRewards",
        params: [],
      });

      await sendAndConfirmTransaction({ transaction: tx, client });

      setMsg("✅ Reward diklaim!");
    } catch (e) {
      console.error(e);
      setMsg("❌ Gagal claim reward");
    }
  }

  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>Claim Rewards</h3>
      <button onClick={doClaim} style={{ padding: "8px 12px" }}>
        Claim
      </button>
      <p>{msg}</p>
    </div>
  );
}