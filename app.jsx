import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import Stake from "./Stake";
import Withdraw from "./Withdraw";
import Claim from "./Claim";

export const client = createThirdwebClient({
  clientId: "YOUR_CLIENT_ID", // ✅77bdb1a4b615d59917efaef65a2b745e
});

export default function App() {
  return (
    <div style={{ padding: "20px", color: "white", fontFamily: "sans-serif" }}>
      <h2>Staking App</h2>

      <ConnectButton client={client} />

      <div style={{ marginTop: "30px" }}>
        <Stake />
        <Withdraw />
        <Claim />
      </div>
    </div>
  );
}