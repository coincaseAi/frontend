import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Wallet } from 'lucide-react'



function ConnectWallet() {
    const { open, close } = useWeb3Modal()
    const { isConnected, address } = useAccount()
    const { disconnect } = useDisconnect()
    return (
        <div className='flex items-center gap-1'>

            <div className="flex items-center justify-center gap-1 p-1 pr-4 ml-auto border rounded-full border-muted">
                <div
                    className='flex items-center justify-center rounded-full text-muted w-9 h-9' >
                    <Wallet size={20} />
                </div>
                <button onClick={() => {
                    if (isConnected) {
                        disconnect()
                    } else {
                        open()
                    }
                }} className='text-sm font-medium'> {isConnected ?
                    <span>{address.slice(0, 5)}...{address.slice(-3)}</span>
                    :
                    <span className='text-primary'> Connect Wallet</span>}
                </button>
            </div>
        </div>
    )
}

export default ConnectWallet