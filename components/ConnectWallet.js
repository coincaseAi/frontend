import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { Wallet } from 'lucide-react'
import { paymentTokens } from '@/constants/tokens'
import { formatEther } from 'viem'



function ConnectWallet() {
    const { open, close } = useWeb3Modal()
    const { isConnected, address } = useAccount()
    const balance = useBalance({
        address: paymentTokens[0].address,
    })
    const { disconnect } = useDisconnect()
    return (
        <div className='flex items-center gap-1'>

            {isConnected ? <div className="flex items-center justify-center gap-1 p-1 pr-4 ml-auto border rounded-full border-muted">
                <div
                    className='flex items-center justify-center rounded-full text-muted w-9 h-9' >
                    <Wallet size={20} />
                </div>
                <button onClick={() => {

                    disconnect()

                }} className='text-sm font-medium'>
                    <span>{address.slice(0, 5)}...{address.slice(-3)}</span>
                    {/* <span className='text-muted'>{formatEther(balance.data?.value)}</span> */}

                </button>
            </div> : <div className="flex items-center justify-center gap-1 p-1 pr-4 ml-auto border rounded-full text-primary border-primary">
                <div
                    className='flex items-center justify-center rounded-full w-9 h-9' >
                    <Wallet size={20} />
                </div>
                <button onClick={() => {

                    open()

                }} className='text-sm font-medium'>
                    <span>Connect Wallet</span>


                </button>
            </div>}
        </div>
    )
}

export default ConnectWallet