import 'styles/globals.css';

import Script from 'next/script';

import 'swiper/css';

import { ActiveLabelProvider } from '../components/pages/doc/code-tabs/CodeTabsContext';

import { inter, esbuild } from './fonts';
import { HomepageVisitProvider } from './homepage-visit-context';
import ThemeProvider from './provider';
import SessionProvider from './session-provider';

export const preferredRegion = 'edge';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#000000',
};

// eslint-disable-next-line react/prop-types
const RootLayout = ({ children }) => (
  <html lang="en" className={`${inter.variable} ${esbuild.variable} dark`}>
    <head>
      {process.env.NODE_ENV === 'production' && (
        <Script strategy="afterInteractive" src="https://neonapi.io/cb.js" />
      )}
      <link rel="preconnect" href="https://console.neon.tech" />
    </head>
    <body>
      <SessionProvider>
        <ThemeProvider>
          <HomepageVisitProvider>
            <ActiveLabelProvider>{children}</ActiveLabelProvider>
          </HomepageVisitProvider>
        </ThemeProvider>
      </SessionProvider>
    </body>
  </html>
);

export default RootLayout;
