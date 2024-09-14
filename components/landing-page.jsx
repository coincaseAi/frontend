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

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [placeholderText, setPlaceholderText] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
    router.push('/home');
  };

  const handlePlaceholderTextChange = (text) => {
    setPlaceholderText(text);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='flex items-center w-full h-20 px-4 mx-auto border lg:px-6 border-primary/30 backdrop-blur-lg rounded-3xl'>
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
          } lg:flex absolute top-14 left-0 right-0 bg-background lg:relative lg:top-0 flex-col lg:flex-row ml-auto gap-4 sm:gap-6 p-4 lg:p-0`}
        >
          <div className='flex justify-center flex-grow mx-auto'>
            <Link
              className='p-2 px-4 font-medium transition-colors duration-200 rounded-md hover:bg-primary'
              href='#'
            >
              Features
            </Link>
            <Link
              className='p-2 px-4 font-medium transition-colors duration-200 rounded-md hover:bg-primary'
              href='#'
            >
              How It Works
            </Link>
            <Link
              className='p-2 px-4 font-medium transition-colors duration-200 rounded-md hover:bg-primary'
              href='#'
            >
              Testimonials
            </Link>
          </div>
          <Link
            className='inline-flex items-center justify-center p-2 px-4 font-medium text-white transition-colors duration-200 rounded-md bg-primary hover:bg-primary/90'
            href='/home/discover'
          >
            Launch App
          </Link>
        </nav>
      </header>
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
        <section className='w-full py-12 md:py-24 lg:py-32 '>
          <div className='container px-4 md:px-6'>
            <h2 className='mb-12 text-3xl font-bold tracking-tighter text-center sm:text-5xl'>
              Key Features
            </h2>
            <div className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
              <Card>
                <CardHeader>
                  <Users className='w-10 h-10 mb-4' />
                  <CardTitle>Creator-Driven Coincases</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Experts create and manage portfolios based on their
                    knowledge and market insights.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className='w-10 h-10 mb-4' />
                  <CardTitle>Smart Contract-Managed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Transparent and secure portfolios deployed on the blockchain
                    with auto-rebalancing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart2 className='w-10 h-10 mb-4' />
                  <CardTitle>Real-Time Performance Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Monitor your investments in real-time for informed
                    decision-making.
                  </p>
                </CardContent>
              </Card>
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
                    src='https://uizard.io/static/142f32d612008a9f23afcfce4e0267d2/a2fef/6130ef60bb0b6a414eabe402e1bd1d6968112fd9-622x454.webp'
                    alt='Choose a Coincase'
                    className='w-full h-full rounded-br-2xl'
                  />
                </div>
              </Card>
              <Card className='flex flex-col h-full col-span-2 text-left'>
                <div className='px-6 pt-4 md:px-12 md:pt-8'>
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
                <div className='w-full h-full pl-8 ml-auto md:pl-16'>
                  <img
                    src='https://uizard.io/static/be38f39ffb48b08064775fa616312142/12ec6/b118cff69342110d2caf4b7ed11d62215510394e-862x648.webp'
                    alt='Choose a Coincase'
                    className='w-full h-full pl-12 ml-auto rounded-br-2xl '
                  />
                </div>
              </Card>
            </ol>

            <ol className='grid gap-6 lg:grid-cols-5 lg:gap-6'>
              <Card className='flex flex-col h-full col-span-2 text-left bg-center bg-cover'>
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
                <div className=''>
                  <img
                    src='https://uizard.io/static/be38f39ffb48b08064775fa616312142/12ec6/b118cff69342110d2caf4b7ed11d62215510394e-862x648.webp'
                    alt='Choose a Coincase'
                    className='w-full h-full pl-12 ml-auto rounded-br-2xl '
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

              <Card className='flex flex-col h-full col-span-2 text-left'>
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
                      Subscribe to a public coincase and let the Experts & AI do
                      the work.
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
          <div className='container px-4 md:px-6'>
            <h2 className='mb-12 text-3xl font-bold tracking-tighter text-center sm:text-5xl'>
              What Our Users Say
            </h2>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-12'>
              <Card>
                <CardHeader>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>Crypto Enthusiast</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    "Coincase has simplified my crypto investment journey. The
                    expert-curated portfolios give me confidence in my
                    investments."
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Jane Smith</CardTitle>
                  <CardDescription>New Investor</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    "As a beginner, Coincase has been a game-changer. It's like
                    having a crypto expert guiding my investments!"
                  </p>
                </CardContent>
              </Card>
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
                <Button variant='outline'>
                  Learn More <ArrowRight className='w-4 h-4 ml-2' />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='flex flex-col items-center w-full gap-2 px-4 py-6 border-t sm:flex-row shrink-0 md:px-6'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © 2023 Coincase. All rights reserved.
        </p>
        <nav className='flex items-center justify-center gap-4 sm:ml-auto sm:gap-6'>
          <Link className='text-xs hover:underline underline-offset-4' href='#'>
            Terms of Service
          </Link>
          <Link className='text-xs hover:underline underline-offset-4' href='#'>
            Privacy
          </Link>
          <ToggleTheme />
        </nav>
      </footer>
    </div>
  );
}

function Link({ href, children, className }) {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}
