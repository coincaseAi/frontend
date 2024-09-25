import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { mainnet, sepolia, polygon } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID

if (!projectId) throw new Error('Project ID is not defined')

export const metadata = {
    name: 'coincase',
    description: 'coincase dapp',
    url: 'https://coincase.ai', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Define the rushiLocal chain
const mintflick = {
    id: 978171,
    name: 'mintflick',
    network: 'mintflick',
    nativeCurrency: {
        decimals: 18,
        name: 'mintflick',
        symbol: 'ETH',
    },
    rpcUrls: {
        public: { http: ['https://chain.mintflick.app'] },
        default: { http: ['https://chain.mintflick.app'] },
    },
}


// Create wagmiConfig
const chains = [mainnet, sepolia, mintflick, polygon]

export const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
        storage: cookieStorage
    }),
})