import { useReadContract } from 'wagmi'
import { formatUnits, parseUnits } from 'viem'

const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
const USDT_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7'


const useTokenRate = (token) => {

    const path = token.symbol === 'USDC'
        ? [token.address, WETH_ADDRESS, USDT_ADDRESS] // Direct path for USDC
        : [token.address, WETH_ADDRESS, USDT_ADDRESS]; // Direct path for other assets

    const { data: tokenRate, isError, error, isLoading } = useReadContract({
        address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Uniswap V2 Router address
        abi: [
            {
                "inputs": [
                    { "internalType": "uint256", "name": "amountIn", "type": "uint256" },
                    { "internalType": "address[]", "name": "path", "type": "address[]" }
                ],
                "name": "getAmountsOut",
                "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }],
                "stateMutability": "view",
                "type": "function"
            }
        ],
        functionName: 'getAmountsOut',
        args: [parseUnits('1', token.decimals), path], // Use path based on asset symbol
    });



    console.log(tokenRate)

    return tokenRate && tokenRate.length > 0 ? Number(formatUnits(tokenRate[tokenRate.length - 1], token.decimals)) : 0
};

export default useTokenRate;