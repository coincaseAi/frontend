
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Poppins, Pridi } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import NextTopLoader from "nextjs-toploader";

const WagmiWalletProvider = dynamic(
  () => import('@/context/WagmiWalletProvider'),
  { ssr: false }
);

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],

});



export default function RootLayout({ children }) {


  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.className}`}>
      <body >
        <WagmiWalletProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-center" />
          </ThemeProvider>
        </WagmiWalletProvider>
        <NextTopLoader
          zIndex={1600}
          easing='ease'
          speed={500}
          color='#22c55e'
          showSpinner={false}
          crawlSpeed={500}
          shadow={false}
        />
      </body>
    </html>
  );
}
