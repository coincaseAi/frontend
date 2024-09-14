import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = 'd1fd9d4a9453725007445949558193db'

export const config = createConfig({
    chains: [mainnet],
    connectors: [
        // injected(),
        walletConnect({ projectId }),
        // metaMask(),
        // safe(),
    ],
    ssr: false,
    transports: {
        [mainnet.id]: http(),
    },
})


