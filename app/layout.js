
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Poppins } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';

const WagmiWalletProvider = dynamic(
  () => import('@/context/WagmiWalletProvider'),
  { ssr: false }
);

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }) {


  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="font-poppins">
        <WagmiWalletProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-center" />
          </ThemeProvider>
        </WagmiWalletProvider>
      </body>
    </html>
  );
}
