'use client';
import React, { useState, useEffect } from 'react';
import {
  useSendTransaction,
  useWaitForTransactionReceipt,
  useBalance,
  useAccount,
} from 'wagmi';
import { parseEther } from 'viem';

export function SendTransaction() {
  const [to, setTo] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');

  const { address } = useAccount();
  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address,
  });

  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isPending) setStatus('Pending...');
    if (isConfirming) setStatus('Confirming...');
    if (isConfirmed) setStatus('Transaction confirmed.');
    if (error) setStatus(`Error: ${error.shortMessage || error.message}`);
  }, [isPending, isConfirming, isConfirmed, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting transaction:', { to, value });

    if (!to || !value) {
      return;
    }

    sendTransaction({
      to: to,
      value: parseEther(value),
    });
  };

  const handleGetBalance = async () => {
    try {
      await refetchBalance();
      if (balanceData) {
        console.log('User balance:', balanceData.formatted, balanceData.symbol);
      } else {
        console.log('Balance data not available');
      }
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder='0xA0Cf…251e'
          required
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='0.05'
          required
        />
        <button disabled={isPending} type='submit'>
          {isPending ? 'Confirming...' : 'Send'}
        </button>
        {status && <div>{status}</div>}
        {hash && <div>Transaction Hash: {hash}</div>}
      </form>
      <button onClick={handleGetBalance}>Get Balance</button>
    </div>
  );
}
