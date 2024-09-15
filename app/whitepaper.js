import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Whitepaper() {
  const sections = [
    {
      title: ' Introduction',
      content: (
        <>
          <p>
            The cryptocurrency investment space has grown tremendously,
            attracting both seasoned and new investors. Despite its growth, the
            crypto market remains difficult for many to navigate due to the
            large number of tokens, high volatility, and lack of expert
            guidance. Many investors struggle with understanding where to invest
            and how to manage their portfolios efficiently.
          </p>
          <p className='mt-4'>
            <span className='font-bold text-primary'>Coincase</span> is a
            decentralized platform that addresses these challenges by allowing
            crypto experts (creators) to create and manage portfolios, called
            smallcases, for other users (subscribers) to invest in. This
            empowers investors with curated, professional-like portfolios, all
            while leveraging the transparency and security of blockchain
            technology.
          </p>
        </>
      ),
    },
    {
      title: '  Problem Statement',
      content: (
        <>
          <p>
            The cryptocurrency market, while lucrative, poses significant
            challenges:
          </p>
          <ul className='mt-4 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Overwhelming Complexity:
              </span>{' '}
              With thousands of crypto assets available, investors often feel
              overwhelmed by the sheer volume of choices.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                High Risk & Volatility:
              </span>{' '}
              Due to unpredictable price swings, it's challenging for individual
              investors to maintain well-balanced portfolios.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Lack of Expert Guidance:
              </span>{' '}
              Many investors, especially new ones, lack the necessary guidance
              to make informed investment decisions.
            </li>
          </ul>
          <p className='mt-4 font-bold text-red-500'>
            Result: Without proper support, 90% of new investors exit the crypto
            market within the first six months due to frustration and losses.
          </p>
        </>
      ),
    },
    {
      title: '  Solution: Coincase',
      content: (
        <>
          <p>
            Coincase offers a decentralized platform where crypto experts,
            called creators, can build and manage smallcases (crypto
            portfolios). Subscribers can then choose to invest in these
            smallcases based on the creator's strategy, gaining access to
            professional-level portfolio management.
          </p>
          <p className='mt-4 font-semibold'>Key Features of Coincase:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Creator-Driven Portfolios (Smallcases):
              </span>{' '}
              Creators can build portfolios by selecting crypto assets and
              determining the weightings.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Real-Time Rebalancing:
              </span>{' '}
              Creators can rebalance portfolios in response to market changes,
              and subscribers can automatically update their portfolios via
              smart contracts.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Smart Contract Transparency:
              </span>{' '}
              Every smallcase is managed by a secure and transparent smart
              contract deployed on-chain, ensuring portfolio management is
              tamper-proof and reliable.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Performance Tracking:
              </span>{' '}
              Subscribers can track their investments and portfolio performance
              in real-time, receiving data-driven insights to make informed
              decisions.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Market Opportunity',
      content: (
        <>
          <p>
            The global cryptocurrency market is valued at over $1.2 trillion,
            with millions of retail and institutional investors participating.
            However, many potential investors are sidelined due to the
            complexities of managing a crypto portfolio.
          </p>
          <p className='mt-4 font-semibold'>Target Audience:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>Creators:</span>{' '}
              Experienced crypto traders, influencers, and portfolio managers
              who want to offer curated portfolios to their followers or
              community.
            </li>
            <li>
              <span className='font-semibold text-primary'>Subscribers:</span>{' '}
              Retail investors who seek expert guidance for investing in crypto
              and want to diversify their portfolios without needing to make
              individual investment decisions.
            </li>
          </ul>
          <p className='mt-4'>
            With a target market of retail investors seeking managed portfolios,
            Coincase taps into an opportunity of approximately $315 billion.
          </p>
        </>
      ),
    },
    {
      title: 'How Coincase Works',
      content: (
        <>
          <p className='font-semibold'>For Creators:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Smallcase Creation:
              </span>{' '}
              Creators design and build smallcases, selecting the mix of crypto
              assets and their respective allocations.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Making Smallcases Public:
              </span>{' '}
              Creators pay a 50 USDT fee to make their smallcase public,
              enabling subscribers to invest in them.
            </li>
            <li>
              <span className='font-semibold text-primary'>Rebalancing:</span>{' '}
              Creators can rebalance their smallcases at any time to reflect
              changing market conditions. Subscribers are notified and can
              automatically update their portfolios.
            </li>
          </ul>
          <p className='mt-4 font-semibold'>For Subscribers:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Subscription Fees:
              </span>{' '}
              Subscribers pay a creator-determined fee to access a smallcase and
              invest in the underlying assets.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Portfolio Management:
              </span>{' '}
              Upon subscription, the specified crypto assets in the smallcase
              are automatically purchased in the subscriber's wallet, following
              the designated weightings.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Automatic Portfolio Updates:
              </span>{' '}
              Whenever a smallcase is rebalanced, subscribers can sync their
              portfolios with one-click updates using the smart contract.
            </li>
          </ul>
          <p className='mt-4 font-semibold'>Platform Fee Structure:</p>
          <p>
            0.5% Platform Fee: Coincase charges a 0.5% fee on each investment
            and withdrawal, which is added to the CASE token liquidity pool on
            Uniswap, helping maintain price stability.
          </p>
        </>
      ),
    },
    {
      title: 'The CASE Token',
      content: (
        <>
          <p>
            CASE is the native utility token of the Coincase platform, designed
            to provide economic incentives and govern the system's growth. The
            token plays a critical role in powering the Coincase ecosystem.
          </p>
          <p className='mt-4 font-semibold'>CASE Token Utility:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Payment for Subscription Fees:
              </span>{' '}
              Users can use CASE tokens to pay subscription fees to creators.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Staking & Rewards:
              </span>{' '}
              Users and creators can stake their CASE tokens to earn rewards,
              further incentivizing long-term engagement.
            </li>
            <li>
              <span className='font-semibold text-primary'>Governance:</span>{' '}
              Holders of CASE tokens will have voting rights to participate in
              platform governance, influencing future upgrades and strategic
              decisions.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Liquidity Pool Fees:
              </span>{' '}
              The 0.5% platform fees collected from investments and withdrawals
              are directed to the Uniswap liquidity pool, helping maintain CASE
              token liquidity and stability.
            </li>
          </ul>
          <p className='mt-4 font-semibold'>Tokenomics:</p>
          <p>Total Supply: 100,000,000 CASE Tokens</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Pre-Seed Investors:
              </span>{' '}
              7% (7,000,000 CASE) - Priced at $0.05 per token to raise $350K.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Seed Round Investors:
              </span>{' '}
              10% (10,000,000 CASE) - Reserved for future rounds.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Team & Founders:
              </span>{' '}
              20% (20,000,000 CASE) - Vesting over 24 months with a 6-month
              cliff.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Liquidity Pool:
              </span>{' '}
              25% (25,000,000 CASE) - Reserved for liquidity and market-making
              on Uniswap.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Community Rewards:
              </span>{' '}
              20% (20,000,000 CASE) - For staking rewards, user incentives, and
              community growth.
            </li>
            <li>
              <span className='font-semibold text-primary'>Advisors:</span> 5%
              (5,000,000 CASE) - Vesting over 18 months.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Marketing & Growth:
              </span>{' '}
              8% (8,000,000 CASE) - For strategic partnerships, campaigns, and
              ecosystem development.
            </li>
            <li>
              <span className='font-semibold text-primary'>Reserve Fund:</span>{' '}
              5% (5,000,000 CASE) - For future strategic initiatives.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Technical Architecture',
      content: (
        <>
          <p>
            Coincase is built using Ethereum blockchain technology, utilizing
            ERC20 for the CASE token and smart contracts to manage smallcases
            and transactions. Key aspects of the platform's architecture
            include:
          </p>
          <ul className='mt-4 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Smallcase Smart Contracts:
              </span>{' '}
              Every smallcase is controlled by a smart contract that governs
              asset allocations, rebalancing, and fee distributions.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Liquidity Integration with Uniswap:
              </span>{' '}
              CASE tokens are integrated with Uniswap's liquidity pools,
              allowing seamless trading and liquidity provision.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Security and Transparency:
              </span>{' '}
              All transactions are on-chain and immutable, ensuring full
              transparency and security for users.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Roadmap',
      content: (
        <>
          <p className='font-semibold'>Q4 2024:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Development of platform MVP and completion of security audits.
              </span>
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Pre-seed funding and launch of CASE token liquidity pool.
              </span>
            </li>
          </ul>
          <p className='mt-4 font-semibold'>Q1 2025:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Public launch of Coincase platform, onboarding creators and
                subscribers.
              </span>
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Implementation of staking rewards and platform governance.
              </span>
            </li>
          </ul>
          <p className='mt-4 font-semibold'>Q2 2025:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Expansion of marketing and partnerships.
              </span>
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Mobile app launch for easier user access.
              </span>
            </li>
          </ul>
          <p className='mt-4 font-semibold'>Q3 2025:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Seed funding round to support platform scaling.
              </span>
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Launch of advanced analytics and AI-powered features.
              </span>
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Governance and Staking',
      content: (
        <>
          <p className='font-semibold'>Governance:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Decentralized Governance:
              </span>{' '}
              CASE token holders will have voting power on major platform
              upgrades, treasury allocations, and future developments.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Community-Driven Growth:
              </span>{' '}
              Through governance voting, the Coincase community will be
              empowered to shape the platform's direction.
            </li>
          </ul>
          <p className='mt-4 font-semibold'>Staking:</p>
          <ul className='mt-2 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>Earn Rewards:</span>{' '}
              Users and creators can stake their CASE tokens to earn rewards,
              reducing circulating supply and encouraging long-term holding.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Boost Engagement:
              </span>{' '}
              Staking CASE tokens allows users to participate more deeply in the
              platform while earning additional tokens.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Security and Audits',
      content: (
        <>
          <p>Coincase is committed to the highest standards of security:</p>
          <ul className='mt-4 space-y-2 list-disc list-inside'>
            <li>
              <span className='font-semibold text-primary'>
                Third-Party Smart Contract Audits:
              </span>{' '}
              All smart contracts governing smallcases and the CASE token will
              be audited by leading security firms to identify and mitigate
              risks.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Secure Transaction Processing:
              </span>{' '}
              Transactions are processed through decentralized, transparent, and
              secure smart contracts.
            </li>
            <li>
              <span className='font-semibold text-primary'>
                Bug Bounty Program:
              </span>{' '}
              Coincase will implement a bug bounty program to incentivize the
              discovery and reporting of potential vulnerabilities.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Conclusion',
      content: (
        <p>
          Coincase is poised to revolutionize the way investors manage crypto
          portfolios. By combining decentralized technology, expert-driven
          smallcases, and the power of the CASE token, Coincase provides a
          unique solution for both creators and subscribers. As the platform
          grows, Coincase will become an indispensable tool for those seeking to
          simplify and optimize their crypto investments.
        </p>
      ),
    },
  ];

  return (
    <div className='container max-w-4xl px-4 py-8 mx-auto'>
      <h1 className='mb-8 text-5xl font-bold text-center text-primary'>
        Coincase Whitepaper
      </h1>

      <Card className='mb-12 shadow-lg'>
        <CardHeader className='bg-primary/10'>
          <CardTitle className='text-2xl font-bold text-primary'>
            Table of Contents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className='space-y-2 list-decimal list-inside'>
            {sections.map((section, index) => (
              <li
                key={index}
                className='transition-colors cursor-pointer hover:text-primary'
              >
                <a href={`#section-${index + 1}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {sections.map((section, index) => (
        <Card
          key={index}
          className='mb-12 shadow-lg'
          id={`section-${index + 1}`}
        >
          <CardHeader className='bg-primary/10'>
            <CardTitle className='text-2xl font-bold text-primary'>
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent className='prose prose-lg max-w-none'>
            {section.content}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
