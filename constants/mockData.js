import { availableTokens } from './tokens';

export const caseFactoryAddress = '0xA28E65B0444392c7F591A321F9802d900A3229Bc';
export const maticCaseFactoryAddress =
  '0x5C33A2dcEBFcaFaE033912710953d63dc16F9fb4';

export const generatePerformanceData = (initialValue, volatility) => {
  const data = [];
  let currentValue = initialValue;
  const startDate = new Date('2023-01-01');

  for (let i = 0; i < 50; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);

    // Generate a random percentage change based on volatility
    const change = (Math.random() - 0.5) * volatility;
    currentValue *= 1 + change;

    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(currentValue.toFixed(2)),
    });
  }

  return data;
};

const getTokenData = (symbol) => {
  const token = availableTokens.find((t) => t.symbol === symbol);
  return token ? { currency: token.symbol, image: token.logoURI } : null;
};

export const mockCases = [
  {
    id: 'case1',
    name: 'AI Based Tokens',
    description: 'Tokens which can benefit from increasing AI Adoption',
    assets: [
      { ...getTokenData('WETH'), weightage: 50 },
      { ...getTokenData('LINK'), weightage: 30 },
      { ...getTokenData('GRT'), weightage: 20 },
    ].filter(Boolean),
    returns: 12.5,
    subscribers: 1500,
    creator: { name: 'CryptoExpert', avatar: '/avatars/cryptoexpert.jpg' },
    volatility: 'Medium volatility',
    performance: generatePerformanceData(100, 0.05),
    minimumInvestment: 100,
    subscriptionFee: 2.5,
    isSubscribed: true,
    value: 10000,
    invested: 9000,
  },
  {
    id: 'case2',
    name: 'Metaverse Tokens',
    description: 'Projects which are based on Metaverse, Gaming and NFTs.',
    assets: [
      { ...getTokenData('WETH'), weightage: 50 },
      { ...getTokenData('MANA'), weightage: 30 },
      { ...getTokenData('SAND'), weightage: 20 },
    ].filter(Boolean),
    returns: 28.7,
    subscribers: 850,
    creator: { name: 'DeFiWhale', avatar: '/avatars/defiwhale.jpg' },
    volatility: 'High volatility',
    performance: generatePerformanceData(100, 0.1),
    minimumInvestment: 100,
    subscriptionFee: 2.5,
    isSubscribed: false,
  },
  {
    id: 'case3',
    name: 'DEFI Kings',
    description: 'Blend of Defi Tokens of projects with high volume Trading',
    assets: [
      { ...getTokenData('USDC'), weightage: 50 },
      { ...getTokenData('AAVE'), weightage: 30 },
      { ...getTokenData('UNI'), weightage: 20 },
    ].filter(Boolean),
    returns: 5.8,
    subscribers: 2200,
    creator: { name: 'YieldHunter', avatar: '/avatars/yieldhunter.jpg' },
    volatility: 'Low volatility',
    performance: generatePerformanceData(100, 0.01),
    minimumInvestment: 100,
    subscriptionFee: 2.5,
    isSubscribed: false,
  },
  {
    id: 'case4',
    name: 'Steady Whales',
    description: 'L1 Tokens with long term visions',
    assets: [
      { ...getTokenData('WBTC'), weightage: 50 },
      { ...getTokenData('WETH'), weightage: 30 },
      { ...getTokenData('LINK'), weightage: 20 },
    ].filter(Boolean),
    returns: -8.3,
    subscribers: 680,
    creator: { name: 'NFTGamer', avatar: '/avatars/nftgamer.jpg' },
    volatility: 'Very high volatility',
    performance: generatePerformanceData(100, 0.15),
    minimumInvestment: 100,
    subscriptionFee: 2.5,
    isSubscribed: false,
  },
  {
    id: 'case5',
    name: 'Top 10 ',
    description: 'Mix of the Top 10 Tokens with highest Market Cap.',
    assets: [
      { ...getTokenData('WETH'), weightage: 25 },
      { ...getTokenData('USDC'), weightage: 25 },
      { ...getTokenData('USDT'), weightage: 25 },
      { ...getTokenData('WBTC'), weightage: 25 },
    ].filter(Boolean),
    returns: 18.2,
    subscribers: 1200,
    creator: {
      name: 'BlockchainVisionary',
      avatar: '/avatars/blockchainvisionary.jpg',
    },
    volatility: 'Medium-high volatility',
    performance: generatePerformanceData(100, 0.08),
    minimumInvestment: 100,
    subscriptionFee: 2.5,
    isSubscribed: true,
    value: 5100,
    invested: 4500,
  },
  {
    id: 'case6',
    name: 'My Case',
    description: 'My Case Description',
    assets: [
      { ...getTokenData('WETH'), weightage: 25 },
      { ...getTokenData('USDC'), weightage: 25 },
      { ...getTokenData('USDT'), weightage: 25 },
      { ...getTokenData('WBTC'), weightage: 25 },
    ].filter(Boolean),
    returns: 18.2,
    subscribers: 1200,
    creator: {
      name: 'BlockchainVisionary',
      avatar: '/avatars/blockchainvisionary.jpg',
    },
    volatility: 'Medium-high volatility',
    performance: generatePerformanceData(100, 0.08),
    minimumInvestment: 100,
    subscriptionFee: 2.5,
    isSubscribed: true,
    value: 4600,
    invested: 4500,
    createdByUser: true,
  },
];

export const colors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
];
