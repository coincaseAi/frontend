import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia, Chain } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

export const metadata = {
    name: 'coincase',
    description: 'coincase dapp',
    url: 'https://coincase.ai', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Define the rushiLocal chain
const rushiLocal = {
    id: 169420,
    name: 'rushiLocal',
    network: 'rushiLocal',
    nativeCurrency: {
        decimals: 18,
        name: 'RushiLocal',
        symbol: 'ETH',
    },
    rpcUrls: {
        public: { http: ['https://779f-2-51-37-109.ngrok-free.app'] },
        default: { http: ['https://779f-2-51-37-109.ngrok-free.app'] },
    },
}

const optimus = {
    id: 1211,
    name: 'optimus',
    network: 'optimus',
    nativeCurrency: {
        decimals: 18,
        name: 'Optimus',
        symbol: 'ETH',
    },
    rpcUrls: {
        public: { http: ['http://192.168.1.56:8545'] },
        default: { http: ['http://192.168.1.56:8545'] },
    },
}
// Create wagmiConfig
const chains = [mainnet, sepolia, rushiLocal, optimus]

export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
})