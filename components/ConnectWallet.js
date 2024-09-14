import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { WalletMinimal } from 'lucide-react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer'
import { X } from 'lucide-react'




const icons = {
    'MetaMask': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/480px-MetaMask_Fox.svg.png',
    'WalletConnect': 'https://images.prismic.io/wallet-connect/65785a56531ac2845a260732_WalletConnect-App-Logo-1024X1024.png?auto=format,compress',
}

function WalletOptions() {
    const { connectors, connect, error, status } = useConnect()
    const { isConnected, address } = useAccount()
    const { disconnect } = useDisconnect()
    const [isAlertOpen, setIsAlertOpen] = useState(false)

    useEffect(() => {
        if (error) { toast.error(error.message) }
        if (isConnected) { toast.success('Connected to wallet') }
    }, [error, isConnected])

    const handleDisconnect = () => {
        setIsAlertOpen(true)
    }

    const confirmDisconnect = () => {
        disconnect()
        setIsAlertOpen(false)
    }

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
                                Are you sure you want to disconnect your wallet? This action cannot be undone.
                            </DrawerDescription>
                            <DrawerFooter>
                                <Button className='bg-destructive hover:bg-destructive/90 text-destructive-foreground' onClick={confirmDisconnect}>Disconnect</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </>
            ) :
                <div style={{
                    pointerEvents: status === 'pending' ? 'none' : 'auto',
                    opacity: status === 'pending' ? 0.5 : 1,
                }} className='flex items-center gap-2 text-sm font-medium'>
                    {status === 'pending' ? 'Connecting...' : 'Connect wallet'}
                    {connectors.map((connector) => (
                        <button
                            key={connector.id}
                            alt={connector.name}
                            className='w-8 h-8 rounded cursor-pointer '
                            onClick={() => connect({ connector })}
                            disabled={status === 'pending'}
                        >
                            <img
                                src={icons[connector.name]}
                                alt={connector.name}
                                className='object-cover w-full h-full rounded bg-muted'
                            />
                        </button>
                    ))}
                </div>}
        </div>
    )
}

export default WalletOptions
