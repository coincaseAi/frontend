import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import { WalletMinimal, ChevronDown } from 'lucide-react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer'
import { X } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const walletImages = {
    'MetaMask': 'https://app.uniswap.org/static/media/metamask-icon.c8b2298e68e585a7f4d9c7b7e6320715.svg',
    'WalletConnect': 'https://app.uniswap.org/static/media/walletconnect-icon.bd207ef6f3632304cd1b6e772271cb43.svg',
    'CoinbaseWallet': 'https://app.uniswap.org/static/media/coinbase-icon.6870e62fb40f1d213198361a1b3d5521.svg'
}

function WalletOptions() {
    const { connectors, connect, error, status } = useConnect()
    const { isConnected, address } = useAccount()
    const { disconnect } = useDisconnect()
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    useEffect(() => {
        if (error) { toast.error(error?.message) }
        if (isConnected) { toast.success('Connected to wallet') }
    }, [error, isConnected])

    const handleDisconnect = useCallback(() => {
        setIsAlertOpen(true)
    }, [])

    const confirmDisconnect = useCallback(() => {
        disconnect()
        setIsAlertOpen(false)
    }, [disconnect])

    return (
        <div className='flex items-center space-x-2'>

            {isConnected ? (
                <>
                    <Button variant='outline' onClick={handleDisconnect}>
                        <WalletMinimal className='w-4 h-4 mr-2' />
                        {address.slice(0, 6)}...{address.slice(-4)}
                    </Button>
                    <Drawer open={isAlertOpen} onOpenChange={setIsAlertOpen} >
                        <DrawerContent className='max-w-md mx-auto'>
                            <DrawerHeader className="flex items-center justify-between">
                                <DrawerTitle className='text-2xl font-semibold'>Disconnect Wallet</DrawerTitle>
                                <Button variant="ghost" size="icon" onClick={() => setIsAlertOpen(false)}>
                                    <X className="w-6 h-6 text-muted-foreground" />
                                </Button>
                            </DrawerHeader>
                            <DrawerDescription className="px-4">
                                Are you sure you want to disconnect your wallet?
                            </DrawerDescription>
                            <DrawerFooter>
                                <Button className='bg-destructive hover:bg-destructive/90 text-destructive-foreground' onClick={confirmDisconnect}>Disconnect</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Connect Wallet
                            <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        {connectors?.length > 0 && connectors?.map((connector) => (
                            <DropdownMenuItem
                                key={connector.id}
                                onClick={() => connect({ connector })}
                                disabled={status === 'pending'}
                                className="flex items-center w-full p-2 space-x-2"
                            >
                                {walletImages[connector.name] ? <img
                                    src={walletImages[connector.name]}
                                    alt={connector.name}
                                    className="w-6 h-6 rounded"
                                /> : <WalletMinimal className='w-6 h-6 ' />}
                                <span>{connector?.name}</span>
                                {connector?.type === 'injected' && <span className='ml-auto text-xs text-muted-foreground'>Injected</span>}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}

export default WalletOptions
