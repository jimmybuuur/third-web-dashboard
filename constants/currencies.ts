import { ChainId, NATIVE_TOKENS } from "@thirdweb-dev/sdk/evm";

export interface CurrencyMetadata {
  address: string;
  name: string;
  symbol: string;
}

const Ethereum: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.Mainnet].wrapped,
  },
  {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: "Tether USD",
    symbol: "USDT",
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
  },
  {
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    name: "Polygon",
    symbol: "WMATIC",
  },
];

const Goerli: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.Goerli].wrapped,
  },
  {
    address: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    name: "USD Coin",
    symbol: "USDC",
  },
];

const Polygon: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.Polygon].wrapped,
  },
  {
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    name: "Wrapped Ether",
    symbol: "WETH",
  },
  {
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    name: "Tether USD",
    symbol: "USDT",
  },
  {
    address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
    name: "Wrapped BTC",
    symbol: "WBTC",
  },
];

const Mumbai: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.Mumbai].wrapped,
  },
  {
    name: "Wrapped Ether",
    address: "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa",
    symbol: "WETH",
  },
  {
    address: "0x0FA8781a83E46826621b3BC094Ea2A0212e71B23",
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    name: "Tether USD",
    address: "0x3813e82e6f7098b9583FC0F33a962D02018B6803",
    symbol: "USDT",
  },
];

const Fantom: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.Fantom].wrapped,
  },
  {
    name: "Wrapped Ether",
    address: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
    symbol: "WETH",
  },
  {
    name: "USD Coin",
    address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
    symbol: "USDC",
  },
  {
    name: "Wrapped Bitcoin",
    address: "0x321162Cd933E2Be498Cd2267a90534A804051b11",
    symbol: "WBTC",
  },
];

const FantomTestnet: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.FantomTestnet].wrapped,
  },
];

const Avalanche: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.Avalanche].wrapped,
  },
  {
    address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
    name: "Wrapped Ether",
    symbol: "WETH",
  },
  {
    address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
    name: "Tether USD",
    symbol: "USDT",
  },
  {
    address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    address: "0x50b7545627a5162F82A992c33b87aDc75187B218",
    name: "Wrapped BTC",
    symbol: "WBTC",
  },
];

const AvalancheFujiTestnet: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.AvalancheFujiTestnet].wrapped,
  },
  {
    address: "0x5425890298aed601595a70AB815c96711a31Bc65",
    name: "USD Coin",
    symbol: "USDC",
  },
];

const Optimism: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.Optimism].wrapped,
  },
];

const OptimismGoerli: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.OptimismGoerli].wrapped,
  },
];

const Arbitrum: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.Arbitrum].wrapped,
  },
  {
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    name: "USD Coin",
    symbol: "USDC",
  },
];

const ArbitrumGoerli: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.ArbitrumGoerli].wrapped,
  },
  {
    address: "0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63",
    name: "USD Coin",
    symbol: "USDC",
  },
];

const BinanceMainnet: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.BinanceSmartChainMainnet].wrapped,
  },
  {
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    name: "Binance USD",
    symbol: "BUSD",
  },
];

const BinanceTestnet: CurrencyMetadata[] = [
  {
    ...NATIVE_TOKENS[ChainId.BinanceSmartChainTestnet].wrapped,
  },
  {
    address: "0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee",
    name: "Binance USD",
    symbol: "BUSD",
  },
];

const Solana: CurrencyMetadata[] = [
  {
    address: "SOLANA_NATIVE_TOKEN",
    name: "Solana",
    symbol: "SOL",
  },
  {
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    name: "USD Coin",
    symbol: "USDC",
  },
  {
    address: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
    name: "Wrapped ETH",
    symbol: "WETH",
  },
  {
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    name: "Tether",
    symbol: "USDT",
  },
];

const SolanaDevnet: CurrencyMetadata[] = [
  {
    address: "SOLANA_NATIVE_TOKEN",
    name: "Solana",
    symbol: "SOL",
  },
  {
    address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
    name: "USD Coin",
    symbol: "USDC",
  },
];
export const CURRENCIES: Record<number, CurrencyMetadata[] | undefined> = {
  [ChainId.Mainnet]: Ethereum,
  [ChainId.Goerli]: Goerli,
  [ChainId.Polygon]: Polygon,
  [ChainId.Mumbai]: Mumbai,
  [ChainId.Fantom]: Fantom,
  [ChainId.FantomTestnet]: FantomTestnet,
  [ChainId.Avalanche]: Avalanche,
  [ChainId.AvalancheFujiTestnet]: AvalancheFujiTestnet,
  [ChainId.Optimism]: Optimism,
  [ChainId.OptimismGoerli]: OptimismGoerli,
  [ChainId.Arbitrum]: Arbitrum,
  [ChainId.ArbitrumGoerli]: ArbitrumGoerli,
  [ChainId.BinanceSmartChainMainnet]: BinanceMainnet,
  [ChainId.BinanceSmartChainTestnet]: BinanceTestnet,
} as const;

export const SOLANA_CURRENCIES: Record<string, CurrencyMetadata[]> = {
  "mainnet-beta": Solana,
  devnet: SolanaDevnet,
} as const;
