import "../styles/globals.css";

import "@rainbow-me/rainbowkit/styles.css";

import {
  Chain,
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";

import {
  chain,
  configureChains,
  createClient,
  useSigner,
  WagmiConfig,
} from "wagmi";

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const bnbChain = {
  id: 56,
  name: 'Binance Smart Chain',
  network: 'bsc',
  iconUrl: './bnbicon.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org',
  },
  blockExplorers: {
    default: { name: 'BSCScan', url: 'https://bscscan.com' },
    etherscan: { name: 'BSCScan', url: 'https://bscscan.com' },
  },
  testnet: false,
};

const tbnbChain = {
  id: 97,
  name: 'Test Binance Smart Chain',
  network: 'bsc testnet',
  iconUrl: './bnbicon.png',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'tBNB',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: 'https://nd-312-721-276.p2pify.com/59072f6c8e2a6e0ec7e03b1680721560',
  },
  blockExplorers: {
    default: { name: 'BSCScan testnet', url: 'https://testnet.bscscan.com' },
    etherscan: { name: 'BSCScan testnet', url: 'https://testnet.bscscan.com' },
  },
  testnet: true,
}

const { provider, chains } = configureChains(
  [bnbChain, tbnbChain],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);


const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={midnightTheme()}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
