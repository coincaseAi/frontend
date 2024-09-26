const tokenAddressToSymbol = {
  '0x1234567890123456789012345678901234567890': 'USDC',
  '0x0987654321098765432109876543210987654321': 'DAI',
  '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd': 'USDT',
  '0x0000000000000000000000000000000000000000': 'ETH',
  // Add more token addresses and their corresponding symbols as needed
};

export function getTokenSymbol(address) {
  return tokenAddressToSymbol[address] || 'Unknown';
}
