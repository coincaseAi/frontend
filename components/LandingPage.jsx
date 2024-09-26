'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/cardLanding';
import { ArrowRight, BarChart2, Lock, Users, Menu, X } from 'lucide-react';
import NextLink from 'next/link';
import buyLottieAnimation from '../public/lottie/buy-crypto.json';
import growLottieAnimation from '../public/lottie/crypto-investment.json';
import investLottieAnimation from '../public/lottie/supply-assets.json';
import { useRouter } from 'next/navigation';
import ToggleTheme from './ToggleTheme';
import 'animate.css';
import { Input } from '@/components/ui/input';
import TypewriterPlaceholder from './TypewriterPlaceholder';
import { ThemeProvider } from 'next-themes';
export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [placeholderText, setPlaceholderText] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); //
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: buyLottieAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const growLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: growLottieAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const investLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: investLottieAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleGetStarted = () => {
    router.push('/home/discover');
  };

  const handlePlaceholderTextChange = (text) => {
    setPlaceholderText(text);
  };

  return (
    <ThemeProvider forcedTheme='dark'>
      <div className='flex flex-col min-h-screen'>
        <Card className='flex items-center w-full h-20 px-4 mx-auto mt-8 border lg:px-6 border-primary/30 backdrop-blur-lg rounded-3xl'>
          <Link className='flex items-center justify-center' href='#'>
            <div className='text-2xl font-bold text-primary'>Coincase</div>
          </Link>
          <button
            className='ml-auto lg:hidden'
            onClick={toggleMenu}
            aria-label='Toggle menu'
          >
            {isMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
          <nav
            className={`${
              isMenuOpen ? 'flex' : 'hidden'
            } lg:flex absolute top-20 left-0 right-0    lg:relative lg:top-0 flex-col lg:flex-row ml-auto gap-4 sm:gap-6 p-4 lg:p-0 z-50`}
          >
            <div className='flex flex-col items-center justify-center flex-grow mx-auto lg:flex-row lg:items-start'>
              <Link
                className='w-full p-2 px-4 font-medium text-center duration-200 rounded-md cursor-pointer text-white/50 hover:text-white lg:w-auto'
                href='#'
              >
                Features
              </Link>
              <Link
                className='w-full p-2 px-4 font-medium text-center duration-200 rounded-md cursor-pointer text-white/50 hover:text-white lg:w-auto'
                href='#'
              >
                How It Works
              </Link>
              <Link
                className='w-full p-2 px-4 font-medium text-center duration-200 rounded-md cursor-pointer text-white/50 hover:text-white lg:w-auto'
                href='/whitepaper'
              >
                Whitepaper
              </Link>
            </div>
            <Link
              className='inline-flex items-center justify-center w-full p-2 px-4 font-medium text-white duration-200 rounded-md cursor-pointer bg-primary hover:bg-primary/90 lg:w-auto'
              href='/home/discover'
            >
              Launch App
            </Link>
          </nav>
        </Card>
        <main className='flex-grow '>
          <section className='flex items-center w-full min-h-screen py-12 bg-center bg-cover md:py-24 lg:py-32 xl:py-48'>
            <div className='container px-4 md:px-6 '>
              <div className='flex flex-col items-center space-y-4 text-center'>
                <div className='max-w-lg space-y-4'>
                  <h1 className='text-5xl tracking-tighter text-transparent bg-gradient-to-r from-white to-primary bg-clip-text sm:text-4xl md:text-7xl lg:text-8xl animate__animated animate__fadeInUp'>
                    Invest using AI with&nbsp;
                    <span className='font-bold text-primary '>Coincase</span>
                  </h1>
                  <p
                    className='mx-auto max-w-[700px] text-gray-200 md:text-xl animate__animated animate__fadeInUp'
                    style={{ animationDelay: '0.5s' }}
                  >
                    <i className='font-bold'>Idea</i> based crypto portfolios
                    curated by the community and AI.
                  </p>
                </div>
                <div
                  className='w-full max-w-md mx-auto mt-8 animate__animated animate__fadeInUp'
                  style={{ animationDelay: '1s' }}
                >
                  <div className='relative flex items-center justify-center'>
                    <Input
                      type='text'
                      placeholder={placeholderText}
                      className='text-lg text-black bg-white rounded-lg'
                      id='idea-input'
                    />
                    <Button
                      className='absolute right-0.5 '
                      onClick={() => router.push('/home/discover')}
                    >
                      ✨ Generate
                    </Button>
                  </div>
                </div>
                <TypewriterPlaceholder
                  onTextChange={handlePlaceholderTextChange}
                />
              </div>
            </div>
          </section>

          <section className='w-full py-18 md:py-24 lg:py-2 rounded-xl'>
            <div className='container flex flex-col gap-6 px-4 md:px-6'>
              <h2 className='mb-12 text-3xl font-bold tracking-tighter text-center sm:text-5xl'>
                How It Works
              </h2>
              <ol className='grid gap-6 lg:grid-cols-5 lg:gap-6'>
                <Card className='flex flex-col h-full col-span-3 text-left bg-center bg-cover '>
                  <div className='px-6 pt-4 md:px-12 md:pt-8'>
                    <CardHeader>
                      <CardTitle className='text-2xl font-semibold text-white'>
                        Coincases
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-gray-300'>
                        Coincases are small baskets of crypto assets created by
                        Experts, You or AI based on an idea or a theme.
                      </p>
                    </CardContent>
                  </div>
                  <div className='w-full h-full pl-8 ml-auto md:pl-16'>
                    <img
                      src='./images/CaseDetails.png'
                      alt='Choose a Coincase'
                      className='w-full h-full rounded-tl-2xl rounded-br-2xl'
                    />
                  </div>
                </Card>
                <Card className='flex flex-col h-full col-span-3 text-left md:col-span-2'>
                  <div className='px-6 pt-4 md:px-6 md:pt-8'>
                    <CardHeader>
                      <CardTitle className='text-2xl font-semibold text-white'>
                        Diversify your portfolio
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-left text-gray-300 '>
                        Achieve a diversified portfolio & tackle the
                        unpredictability of the crypto market.
                      </p>
                    </CardContent>
                  </div>
                  <div className='w-full h-full p-4 mt-auto'>
                    <img
                      src='./images/diverse.webp'
                      alt='Choose a Coincase'
                      className='object-contain w-auto h-auto max-w-full max-h-full '
                    />
                  </div>
                </Card>
              </ol>

              <ol className='grid gap-6 lg:grid-cols-5 lg:gap-6'>
                <Card className='flex flex-col h-full col-span-3 text-left bg-center bg-cover md:col-span-2'>
                  <div className='px-6 pt-4 md:px-12 md:pt-8'>
                    <CardHeader>
                      <CardTitle className='text-2xl font-semibold text-white'>
                        Make AI work for you
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-gray-300'>
                        Rebalance your coincase with smart AI recommendations.
                      </p>
                    </CardContent>
                  </div>
                  <div className='w-full h-full pl-8 ml-auto md:pl-16'>
                    <img
                      src='https://uizard.io/static/142f32d612008a9f23afcfce4e0267d2/a2fef/6130ef60bb0b6a414eabe402e1bd1d6968112fd9-622x454.webp'
                      alt='Choose a Coincase'
                      className='w-full h-full pl-12 ml-auto rounded-br-2xl '
                    />
                  </div>
                </Card>

                <Card className='flex flex-col h-full col-span-3 text-left'>
                  <div className='px-6 pt-4 md:px-12 md:pt-8'>
                    <CardHeader>
                      <CardTitle className='text-2xl font-semibold text-white'>
                        Take Data-Driven Decisions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-left text-gray-300 '>
                        Use the data to Rebalance your coincase.
                      </p>
                    </CardContent>
                  </div>
                  <div className='p-4'>
                    <img
                      src='./images/portfolio.png'
                      alt='Choose a Coincase'
                      className='object-contain w-auto h-auto max-w-full max-h-full rounded-xl'
                    />
                  </div>
                </Card>
              </ol>

              <ol className='grid gap-6 lg:grid-cols-5 lg:gap-6'>
                <Card className='flex flex-col h-full col-span-3 text-left bg-center bg-cover'>
                  <div className='px-6 pt-4 md:px-12 md:pt-8'>
                    <CardHeader>
                      <CardTitle className='text-2xl font-semibold text-white'>
                        Think you're an expert?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-gray-300'>
                        Make your Coincase public and earn subscription fees.
                      </p>
                    </CardContent>
                  </div>
                  <div className='w-full h-full pl-8 ml-auto md:pl-16'>
                    <img
                      src='https://uizard.io/static/142f32d612008a9f23afcfce4e0267d2/a2fef/6130ef60bb0b6a414eabe402e1bd1d6968112fd9-622x454.webp'
                      alt='Choose a Coincase'
                      className='w-full h-full rounded-br-2xl'
                    />
                  </div>
                </Card>

                <Card className='flex flex-col h-full col-span-3 text-left md:col-span-2'>
                  <div className='px-6 pt-4 md:px-12 md:pt-8'>
                    <CardHeader>
                      <CardTitle className='text-2xl font-semibold text-white'>
                        Just started in crypto?{' '}
                        <span className='text-transparent bg-gradient-to-l from-primary to-white bg-clip-text'>
                          #WAGMI
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-left text-gray-300 '>
                        Subscribe to a public coincase and let the Experts & AI
                        do the work.
                      </p>
                    </CardContent>
                  </div>
                  <div className='w-full h-full pl-8 ml-auto md:pl-16'>
                    <img
                      src='https://uizard.io/static/be38f39ffb48b08064775fa616312142/12ec6/b118cff69342110d2caf4b7ed11d62215510394e-862x648.webp'
                      alt='Choose a Coincase'
                      className='w-full h-full pl-12 ml-auto rounded-br-2xl '
                    />
                  </div>
                </Card>
              </ol>
            </div>
          </section>

          <section className='w-full py-12 md:py-24 lg:py-32 '>
            <div className='container flex flex-col gap-6 px-4 md:px-6'>
              <h2 className='mb-12 text-3xl font-bold tracking-tighter text-center sm:text-5xl'>
                Key Features
              </h2>
              <div className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
                <Card>
                  <CardHeader>
                    <Users className='w-10 h-10 mb-4' />
                    <CardTitle>Secure Liquidity Pool Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-gray-300'>
                      Coincase integrates with Uniswap to ensure seamless token
                      liquidity. Every transaction fee contributes to the
                      liquidity pool of the native CASE token, enhancing token
                      stability and ensuring smooth trading on decentralized
                      exchanges.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Lock className='w-10 h-10 mb-4' />
                    <CardTitle>
                      Decentralized Smart Contract Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-gray-300'>
                      Coincase operates on decentralized, self-executing smart
                      contracts deployed on the Ethereum blockchain, ensuring
                      secure, transparent, and tamper-proof portfolio management
                      for both creators and subscribers.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <BarChart2 className='w-10 h-10 mb-4' />
                    <CardTitle>
                      AI-Powered Crypto Portfolio Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-gray-300'>
                      Leverage advanced AI algorithms to deliver personalized
                      crypto portfolio recommendations based on market trends,
                      risk profiles, and investment goals. Coincase AI helps
                      users make smarter, data-driven investment decisions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className='w-full py-12 md:py-24 lg:py-32 '>
            <div className='container px-4 md:px-6'>
              <h2 className='mb-12 text-3xl font-bold tracking-tighter text-center sm:text-5xl'>
                CASE Tokenomics
              </h2>
              <div className='grid gap-6 lg:grid-cols-2'>
                <Card className='col-span-2 lg:col-span-1'>
                  <CardHeader>
                    <CardTitle>Token Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 text-lg font-semibold'>
                      Total Supply: 100,000,000 CASE tokens
                    </p>
                    <div className='mb-4'>
                      <div className='w-full h-6 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700'>
                        <div
                          className='h-6 bg-blue-600'
                          style={{ width: '7%' }}
                        ></div>
                        <div
                          className='h-6 bg-green-600'
                          style={{
                            width: '10%',
                            marginTop: '-24px',
                            marginLeft: '7%',
                          }}
                        ></div>
                        <div
                          className='h-6 bg-yellow-600'
                          style={{
                            width: '20%',
                            marginTop: '-24px',
                            marginLeft: '17%',
                          }}
                        ></div>
                        <div
                          className='h-6 bg-red-600'
                          style={{
                            width: '25%',
                            marginTop: '-24px',
                            marginLeft: '37%',
                          }}
                        ></div>
                        <div
                          className='h-6 bg-purple-600'
                          style={{
                            width: '20%',
                            marginTop: '-24px',
                            marginLeft: '62%',
                          }}
                        ></div>
                        <div
                          className='h-6 bg-indigo-600'
                          style={{
                            width: '8%',
                            marginTop: '-24px',
                            marginLeft: '82%',
                          }}
                        ></div>
                        <div
                          className='h-6 bg-pink-600'
                          style={{
                            width: '5%',
                            marginTop: '-24px',
                            marginLeft: '90%',
                          }}
                        ></div>
                        <div
                          className='h-6 bg-teal-600'
                          style={{
                            width: '5%',
                            marginTop: '-24px',
                            marginLeft: '95%',
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 mr-2 bg-blue-600 rounded-full'></div>
                        <span>Pre-Seed Investors: 7%</span>
                      </div>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 mr-2 bg-green-600 rounded-full'></div>
                        <span>Seed Round: 10%</span>
                      </div>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 mr-2 bg-yellow-600 rounded-full'></div>
                        <span>Team & Founders: 20%</span>
                      </div>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 mr-2 bg-red-600 rounded-full'></div>
                        <span>Liquidity Pool: 25%</span>
                      </div>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 mr-2 bg-purple-600 rounded-full'></div>
                        <span>Community Rewards: 20%</span>
                      </div>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 mr-2 bg-indigo-600 rounded-full'></div>
                        <span>Marketing & Growth: 8%</span>
                      </div>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 mr-2 bg-pink-600 rounded-full'></div>
                        <span>Advisors: 5%</span>
                      </div>
                      <div className='flex items-center'>
                        <div className='w-3 h-3 mr-2 bg-teal-600 rounded-full'></div>
                        <span>Reserve Fund: 5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className='col-span-2 lg:col-span-1'>
                  <CardHeader>
                    <CardTitle>Tokenomics Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-gray-300'>
                      The CASE token is designed with a balanced distribution to
                      ensure long-term sustainability and growth. With a
                      significant portion allocated to the liquidity pool and
                      community rewards, we aim to foster a strong and engaged
                      ecosystem. The allocation for team and founders is vested
                      to align long-term interests, while the reserve fund
                      provides flexibility for future developments.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className='grid gap-6 mt-12 lg:grid-cols-2 '>
                <Card>
                  <CardHeader>
                    <CardTitle>Uniswap Liquidity Pool Integration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 text-gray-300'>
                      Coincase seamlessly integrates with Uniswap to provide a
                      robust liquidity pool for the CASE token, ensuring smooth
                      and efficient trading for users.
                    </p>
                    <ul className='text-gray-300 list-disc list-inside'>
                      <li>
                        Contribute to the liquidity pool and earn fees from
                        every transaction on the platform
                      </li>
                      <li>
                        Benefit from increased token stability and reduced
                        slippage
                      </li>
                      <li>
                        Participate in the growth of the Coincase ecosystem
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Fees Enhance Liquidity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='mb-4 text-gray-300'>
                      Every transaction on Coincase contributes to the strength
                      and stability of the CASE token ecosystem:
                    </p>
                    <ul className='text-gray-300 list-disc list-inside'>
                      <li>
                        Fees from Investments, withdrawals, and creator fees add
                        liquidity to the CASE token pool
                      </li>
                      <li>
                        Continuous liquidity growth increases token stability
                        over time
                      </li>
                      <li>
                        Users benefit from a more robust and resilient token
                        economy
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className='mt-12'>
                <h2 className='mb-6 text-3xl font-bold tracking-tighter text-center sm:text-4xl'>
                  CASE Token Holders
                </h2>
                <div className='grid gap-6 lg:grid-cols-2'>
                  <Card>
                    <CardHeader>
                      <CardTitle>Earn Through Staking</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-gray-300'>
                        Stake your CASE tokens and earn additional rewards. This
                        encourages long-term holding and active participation in
                        the Coincase ecosystem.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Creator Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className='text-gray-300'>
                        Creators of high-performing smallcases can earn
                        additional CASE tokens, incentivizing excellent
                        portfolio management and benefiting the entire
                        ecosystem.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section className='w-full py-12 md:py-24 lg:py-32'>
            <div className='container px-4 md:px-6'>
              <div className='flex flex-col items-center space-y-4 text-center'>
                <div className='space-y-2'>
                  <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                    Ready to Start Investing Smarter?
                  </h2>
                  <p className='mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400'>
                    Join Coincase today and access expert-curated crypto
                    portfolios. Your journey to smarter investing starts here.
                  </p>
                </div>
                <div className='space-x-4'>
                  <Button onClick={handleGetStarted}>Get Started Now</Button>
                  <Button
                    variant='outline'
                    onClick={() => router.push('/whitepaper')}
                  >
                    Read Whitepaper <ArrowRight className='w-4 h-4 ml-2' />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className='flex flex-col items-center w-full gap-2 px-4 py-6 border-t sm:flex-row shrink-0 md:px-6'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            © 2024 Coincase.ai All rights reserved.
          </p>
          <nav className='flex items-center justify-center gap-4 sm:ml-auto sm:gap-6'>
            <Link
              className='text-xs hover:underline underline-offset-4'
              href='#'
            >
              Terms of Service
            </Link>
            <Link
              className='text-xs hover:underline underline-offset-4'
              href='#'
            >
              Privacy
            </Link>
            {/* <ToggleTheme /> */}
          </nav>
        </footer>
      </div>
    </ThemeProvider>
  );
}

function Link({ href, children, className }) {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}
