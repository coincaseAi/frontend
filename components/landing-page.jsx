'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, BarChart2, Lock, Users, Menu, X } from 'lucide-react';
import NextLink from 'next/link';
import Lottie from 'react-lottie';
import buyLottieAnimation from '../public/lottie/buy-crypto.json';
import growLottieAnimation from '../public/lottie/crypto-investment.json';
import investLottieAnimation from '../public/lottie/supply-assets.json';
import { useRouter } from 'next/navigation';
import ToggleTheme from './ToggleTheme';
import 'animate.css';

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

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

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='px-4 lg:px-6 h-8 flex items-center'>
        <Link className='flex items-center justify-center' href='#'>
          <div className='text-2xl font-bold text-primary'>Coincase</div>
        </Link>
        <button
          className='ml-auto lg:hidden'
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {isMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>
        <nav
          className={`${
            isMenuOpen ? 'flex' : 'hidden'
          } lg:flex absolute top-14 left-0 right-0 bg-background lg:relative lg:top-0 flex-col lg:flex-row ml-auto gap-4 sm:gap-6 p-4 lg:p-0`}
        >
          <Link
            className='text-sm font-medium hover:underline underline-offset-4 hover:bg-primary/10 p-2 rounded-md transition-colors duration-200'
            href='#'
          >
            Features
          </Link>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4 hover:bg-primary/10 p-2 rounded-md transition-colors duration-200'
            href='#'
          >
            How It Works
          </Link>
          <Link
            className='text-sm font-medium hover:underline underline-offset-4 hover:bg-primary/10 p-2 rounded-md transition-colors duration-200'
            href='#'
          >
            Testimonials
          </Link>
        </nav>
      </header>
      <main className='flex-grow'>
        <section className='w-full py-12 md:py-24 lg:py-32 xl:py-48 min-h-screen flex items-center'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate__animated animate__fadeInUp   '>
                  Invest using AI with&nbsp;
                  <span className='text-primary'>Coincase</span>
                </h1>
                <p
                  className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 animate__animated animate__fadeInUp '
                  style={{ animationDelay: '0.5s' }}
                >
                  Idea based crypto portfolios made by Experts & AI.
                </p>
              </div>
              <div
                className='space-x-4 animate__animated animate__fadeInUp'
                style={{ animationDelay: '1s' }}
              >
                <Button onClick={handleGetStarted}>Get Started</Button>
                <Button variant='outline'>Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32  '>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              Key Features
            </h2>
            <div className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
              <Card>
                <CardHeader>
                  <Users className='h-10 w-10 mb-4' />
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
                  <Lock className='h-10 w-10 mb-4' />
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
                  <BarChart2 className='h-10 w-10 mb-4' />
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
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
              How It Works
            </h2>
            <ol className='grid gap-6 lg:grid-cols-3 lg:gap-12'>
              <li className='flex flex-col items-center text-center'>
                <div className='relative w-24 h-24 mb-4'>
                  <Lottie options={defaultOptions} height={96} width={96} />
                </div>
                <h3 className='mt-4 text-xl font-semibold '>
                  Choose a Coincase
                </h3>
                <p className='mt-2 text-gray-500  dark:text-gray-400'>
                  Browse and select from expert-curated crypto portfolios.
                </p>
              </li>
              <li className='flex flex-col items-center text-center'>
                <div className='relative w-24 h-24 mb-4'>
                  <Lottie
                    options={investLottieOptions}
                    height={96}
                    width={96}
                  />
                </div>
                <h3 className='mt-4 text-xl font-semibold '>Subscribe</h3>
                <p className='mt-2 text-gray-500  dark:text-gray-400'>
                  Invest in your chosen coincase with ease and confidence.
                </p>
              </li>
              <li className='flex flex-col items-center text-center'>
                <div className='relative w-24 h-24 mb-4'>
                  <Lottie options={growLottieOptions} height={96} width={96} />
                </div>
                <h3 className='mt-4 text-xl font-semibold '>Track & Grow</h3>
                <p className='mt-2 text-gray-500  dark:text-gray-400'>
                  Monitor performance and watch your investment grow.
                </p>
              </li>
            </ol>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32  '>
          <div className='container px-4 md:px-6'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12'>
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
                  Learn More <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © 2023 Coincase. All rights reserved.
        </p>
        <nav className='sm:ml-auto flex gap-4 sm:gap-6 items-center justify-center'>
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

function CoinIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='9' />
      <path d='M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1' />
      <path d='M12 6v2m0 8v2' />
    </svg>
  );
}

function Link({ href, children, className }) {
  return (
    <NextLink href={href} className={className}>
      {children}
    </NextLink>
  );
}
