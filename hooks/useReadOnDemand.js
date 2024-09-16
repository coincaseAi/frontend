import { readContract } from '@wagmi/core'
import { config } from '@/config/wagmiConfig'
import abi from '@/config/abi.json'

export const readOnDemand = (address, functionName, args) => {
    return readContract(config, {
        abi: abi,
        address: address,
        functionName: functionName,
        args: args
    })
}
