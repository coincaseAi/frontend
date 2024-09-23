'use client'
// 1. Import modules.
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { WagmiProvider, deserialize, serialize } from 'wagmi'

import { config, projectId, metadata } from '@/config/wagmiConfig'

import { createWeb3Modal } from '@web3modal/wagmi/react'

import { QueryClient } from '@tanstack/react-query'


// Setup queryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            gcTime: 1_000 * 60 * 60 * 24, // 24 hours
        },
    },
})
const persister = createSyncStoragePersister({
    serialize,
    storage: window.localStorage,
    deserialize,
})

if (!projectId) throw new Error('Project ID is not defined')

// Create modal
createWeb3Modal({
    metadata,
    wagmiConfig: config,
    projectId,
    enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export default function AppKitProvider({
    children,
    initialState
}) {
    return (
        <WagmiProvider config={config} initialState={initialState} reconnectOnMount={true}>
            <PersistQueryClientProvider
                client={queryClient}
                persistOptions={{ persister }}
            >{children}
            </PersistQueryClientProvider>
        </WagmiProvider>
    )
}