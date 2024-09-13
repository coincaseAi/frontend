function generatePerformanceData(initialValue, volatility) {
    const data = [];
    let currentValue = initialValue;
    const startDate = new Date('2023-01-01');

    for (let i = 0; i < 50; i++) {
        const date = new Date(startDate);
        date.setMonth(startDate.getMonth() + i);

        // Generate a random percentage change based on volatility
        const change = (Math.random() - 0.5) * volatility;
        currentValue *= (1 + change);

        data.push({
            date: date.toISOString().split('T')[0],
            value: parseFloat(currentValue.toFixed(2))
        });
    }

    return data;
}

export const mockCases = [
    {
        id: "case1",
        name: "AI Based Tokens",
        description: "Tokens which can benefit from increasing AI Adoption",
        assets: [
            { currency: "BTC", weightage: 40 },
            { currency: "ETH", weightage: 30 },
            { currency: "ADA", weightage: 30 },
        ],
        returns: 12.5,
        subscribers: 1500,
        creator: { name: "CryptoExpert", avatar: "/avatars/cryptoexpert.jpg" },
        volatility: "Medium volatility",
        performance: generatePerformanceData(100, 0.05),
        minimumInvestment: 100,
        subscriptionFee: 2.5,
        isSubscribed: true,
        value: 10000,
        invested: 9000,
    },
    {
        id: "case2",
        name: "Metaverse Tokens",
        description: "Projects which are based on Metaverse",
        assets: [
            { currency: "ETH", weightage: 40 },
            { currency: "SOL", weightage: 30 },
            { currency: "TRX", weightage: 30 },
        ],
        returns: 28.7,
        subscribers: 850,
        creator: { name: "DeFiWhale", avatar: "/avatars/defiwhale.jpg" },
        volatility: "High volatility",
        performance: generatePerformanceData(100, 0.1),
        minimumInvestment: 100,
        subscriptionFee: 2.5,
        isSubscribed: false,
    },
    {
        id: "case3",
        name: "DEFI Kings",
        description: "Blend of Defi Tokens of projects with high volume Trading",
        assets: [
            { currency: "USDC", weightage: 40 },
            { currency: "USDT", weightage: 30 },
            { currency: "BNB", weightage: 30 },
        ],
        returns: 5.8,
        subscribers: 2200,
        creator: { name: "YieldHunter", avatar: "/avatars/yieldhunter.jpg" },
        volatility: "Low volatility",
        performance: generatePerformanceData(100, 0.01),
        minimumInvestment: 100,
        subscriptionFee: 2.5,
        isSubscribed: false,
    },
    {
        id: "case4",
        name: "Steady Whales",
        description: "L1 Tokens with long term visions",
        assets: [
            { currency: "BTC", weightage: 40 },
            { currency: "ETH", weightage: 30 },
            { currency: "XRP", weightage: 30 },
        ],
        returns: -8.3,
        subscribers: 680,
        creator: { name: "NFTGamer", avatar: "/avatars/nftgamer.jpg" },
        volatility: "Very high volatility",
        performance: generatePerformanceData(100, 0.15),
        minimumInvestment: 100,
        subscriptionFee: 2.5,
        isSubscribed: false,
    },
    {
        id: "case5",
        name: "Top 10 ",
        description: "Mix of the Top 10 Tokens with highest Market Cap.",
        assets: [
            { currency: "SOL", weightage: 25 },
            { currency: "ADA", weightage: 25 },
            { currency: "DOGE", weightage: 25 },
            { currency: "TRX", weightage: 25 },
        ],
        returns: 18.2,
        subscribers: 1200,
        creator: { name: "BlockchainVisionary", avatar: "/avatars/blockchainvisionary.jpg" },
        volatility: "Medium-high volatility",
        performance: generatePerformanceData(100, 0.08),
        minimumInvestment: 100,
        subscriptionFee: 2.5,
        isSubscribed: true,
        value: 4100,
        invested: 4500,
    },
];

export const availableTokens = [
    {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png"
    },
    {
        id: 2,
        name: "Ethereum",
        symbol: "ETH",
        image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png"
    },
    {
        id: 3,
        name: "Tether",
        symbol: "USDT",
        image: "https://assets.coingecko.com/coins/images/325/small/Tether.png"
    },
    {
        id: 4,
        name: "BNB",
        symbol: "BNB",
        image: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png"
    },
    {
        id: 5,
        name: "USD Coin",
        symbol: "USDC",
        image: "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png"
    },
    {
        id: 6,
        name: "XRP",
        symbol: "XRP",
        image: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png"
    },
    {
        id: 7,
        name: "Cardano",
        symbol: "ADA",
        image: "https://assets.coingecko.com/coins/images/975/small/cardano.png"
    },
    {
        id: 8,
        name: "Dogecoin",
        symbol: "DOGE",
        image: "https://assets.coingecko.com/coins/images/5/small/dogecoin.png"
    },
    {
        id: 9,
        name: "Solana",
        symbol: "SOL",
        image: "https://assets.coingecko.com/coins/images/4128/small/solana.png"
    },
    {
        id: 10,
        name: "TRON",
        symbol: "TRX",
        image: "https://assets.coingecko.com/coins/images/1094/small/tron-logo.png"
    }
];

export const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];