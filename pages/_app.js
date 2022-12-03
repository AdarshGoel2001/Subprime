import "../styles/globals.css";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

const chains = [
  chain.mainnet,
  chain.polygon,
  chain.goerli,
  chain.polygonMumbai,
];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "8bbf95b53425f9d0f7356b8d3ef09810" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <WagmiConfig client={wagmiClient}></WagmiConfig>

      <Web3Modal
        projectId="8bbf95b53425f9d0f7356b8d3ef09810"
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default MyApp;
