import clsx from 'clsx';
import Image from 'next/image';

import Button from 'components/shared/button';
import Container from 'components/shared/container';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import LINKS from 'constants/links';
import clouflare from 'images/partners-logos/cloudflare.svg';
import hasura from 'images/partners-logos/hasura.svg';
import koyeb from 'images/partners-logos/koyeb.svg';
import replit from 'images/partners-logos/replit.svg';
import vercel from 'images/partners-logos/vercel.svg';
import wundergraph from 'images/partners-logos/wundergraph.svg';

const logos = [
  {
    logo: hasura,
    alt: 'Hasura',
    width: 145,
  },
  {
    logo: replit,
    alt: 'Replit',
    width: 156,
  },
  {
    logo: clouflare,
    alt: 'Cloudflare',
    width: 241,
  },
  {
    logo: vercel,
    alt: 'Vercel',
    width: 147,
  },
  {
    logo: koyeb,
    alt: 'Koyeb',
    width: 160,
  },
  {
    logo: wundergraph,
    alt: 'WunderGraph',
    width: 199,
  },
];

const buttons = [
  {
    text: 'Sign Up',
    to: LINKS.signup,
    theme: 'primary',
  },
  {
    text: 'Talk to sales',
    to: LINKS.contactSales,
    theme: 'gray-dark-outline',
    className: '!border-4 sm:!border-[3px]',
  },
];

const Hero = () => (
  <section className="safe-paddings bg-black pt-[184px] lg:pt-12 md:pt-6">
    <Container
      className="z-20 flex flex-col items-center justify-center lg:flex-col lg:justify-center"
      size="md"
      id="container"
    >
      <div className="relative z-20 text-center">
        <Heading
          id="hero-title"
          className="with-highlighted-text-secondary-2"
          tag="h1"
          size="2xl"
          theme="white"
        >
          Serverless Postgres
        </Heading>
        <p className="t-xl mx-auto mt-7 max-w-[860px] text-white 2xl:mt-6 xl:mt-5">
          The fully managed serverless Postgres with a generous free tier. We separate storage and
          compute to offer autoscaling, branching, and bottomless storage.
        </p>
        <div className="mx-auto mt-11 grid max-w-[452px] auto-rows-fr grid-cols-2 items-center gap-x-6 2xl:mt-8 xl:mt-7 md:mt-6 xs:grid-cols-1 xs:gap-y-4">
          {buttons.map(({ text, to, theme, className }) => (
            <Button
              key={text}
              className={clsx(className, 'h-20 2xl:h-[72px] xl:h-[60px] md:h-14')}
              to={to}
              theme={theme}
              size="md"
            >
              {text}
            </Button>
          ))}
        </div>
      </div>

      <ul className="mx-auto mt-20 flex w-full max-w-[1472px] justify-between gap-x-16 xl:gap-x-14 lg:mt-16 lg:flex-wrap lg:justify-center lg:gap-y-10 md:mt-14 md:gap-y-8 sm:mt-10 xs:gap-y-6">
        {logos.map(({ logo, alt, width }) => (
          <li key={alt}>
            <Image
              className="lg:h-10 lg:w-auto md:h-7"
              src={logo}
              alt={alt}
              width={width}
              height={42}
              priority
            />
          </li>
        ))}
      </ul>
      <Link
        to={LINKS.caseStudies}
        theme="underline-primary-1"
        className="mt-11 text-xl lg:mt-9 lg:text-lg"
      >
        Read case studies
      </Link>
    </Container>
  </section>
);

export default Hero;
