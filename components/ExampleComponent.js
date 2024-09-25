import React from 'react';
import useTokenRate from '@/hooks/useTokenRate';
import { availableTokens } from '@/constants/tokens';

const ExampleComponent = () => {
    return availableTokens?.map((token) => <Rate key={token.address} token={token} />);
};

export default ExampleComponent; const Rate = ({ token }) => {
    const { rate, isLoading, error } = useTokenRate(token.address, 'USD', token.decimals);
    return isLoading ? <p>Loading...</p> : error ? <p>Error: {error.message}</p> : <p>1 {token.symbol} = ${Number(rate).toFixed(6)}</p>;
}

