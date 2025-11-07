/** @type {import('next').NextConfig} */

const defaultApp = process.env.NEXT_PUBLIC_DEFAULT_APP || 'klayr_mainchain';

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  async redirects() {
    return [
      {
        source: '/account/:slug',
        destination: `/${defaultApp}/account/:slug`,
        permanent: true,
      },
      {
        source: '/transaction/:slug',
        destination: `/${defaultApp}/transactions/:slug`,
        permanent: true,
      },
      {
        source: '/block/:slug',
        destination: `/${defaultApp}/blocks/:slug`,
        permanent: true,
      },
      {
        source: '/event/:slug',
        destination: `/${defaultApp}`,
        permanent: true,
      },
      {
        source: '/transactions',
        destination: `/${defaultApp}/transactions`,
        permanent: true,
      },
      {
        source: '/validators/eligible',
        destination: `/${defaultApp}/validators`,
        permanent: true,
      },
      {
        source: '/validators',
        destination: `/${defaultApp}/validators`,
        permanent: true,
      },
      {
        source: '/stakes',
        destination: `/${defaultApp}/stakes`,
        permanent: true,
      },
      {
        source: '/apps',
        destination: `/${defaultApp}/chains`,
        permanent: true,
      },
      {
        source: '/blocks',
        destination: `/${defaultApp}/blocks`,
        permanent: true,
      },
      {
        source: '/network',
        destination: `/${defaultApp}/nodes`,
        permanent: true,
      },
      {
        source: '/events',
        destination: `/${defaultApp}`,
        permanent: true,
      },
      {
        source: '/chain-info',
        destination: `/${defaultApp}`,
        permanent: true,
      },
      {
        source: '/analyze',
        destination: `/${defaultApp}`,
        permanent: true,
      },
      {
        source: '/tokens',
        destination: `/${defaultApp}/tokens`,
        permanent: true,
      },
      {
        source: '/top',
        destination: `/${defaultApp}/top-accounts`,
        permanent: true,
      },
    ];
  },
};
