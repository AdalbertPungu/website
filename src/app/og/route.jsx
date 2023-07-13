import { ImageResponse } from 'next/server';

export const config = {
  runtime: 'edge', // this is a pre-requisite
  regions: ['iad1'], // only execute this function on iad1
};

export async function GET(request) {
  const fontMedium = fetch(
    new URL('../../../public/fonts/ibm-plex-sans/ibm-plex-sans-medium.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const fontNormal = fetch(
    new URL('../../../public/fonts/ibm-plex-sans/ibm-plex-sans-regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());
  const logo = fetch(new URL('../../../public/images/og-image/logo.png', import.meta.url)).then(
    (res) => res.arrayBuffer()
  );
  const background = fetch(
    new URL('../../../public/images/og-image/background.png', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const [fontDataMedium, fontDataNormal, logoData, backgroundData] = await Promise.all([
    fontMedium,
    fontNormal,
    logo,
    background,
  ]);

  const { searchParams } = request.nextUrl;

  const title =
    searchParams.get('title')?.slice(0, 100) || 'Serverless, Fault-Tolerant, Branchable Postgres';

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: '"IBM Plex Sans"',
          fontStyle: 'normal',
          position: 'relative',
          backgroundColor: '#0A0B0D',
          backgroundSize: '150px 150px',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '44px 56px 56px',
        }}
      >
        <img
          width="1200"
          height="630"
          src={backgroundData}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <img width="229" height="64" src={logoData} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 'auto',
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 500,
              color: 'white',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              whiteSpace: 'pre-wrap',
              maxWidth: '90%',
              marginTop: 10,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.25,
              marginTop: 28,
              letterSpacing: '-0.04em',
              color: '#C9CBCF',
              whiteSpace: 'pre-wrap',
            }}
          >
            neon.tech
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'IBM Plex Sans',
          data: fontDataMedium,
          style: 'normal',
          weight: 500,
        },
        {
          name: 'IBM Plex Sans',
          data: fontDataNormal,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
