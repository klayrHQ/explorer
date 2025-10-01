/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@repo/ui'],
  async redirects() {
    return [
      {
        source: '/account/:slug',
        destination: '/klayr_mainchain/account/:slug',
        permanent: true,
      },
      {
        source: '/transaction/:slug',
        destination: '/klayr_mainchain/transactions/:slug',
        permanent: true,
      },
      {
        source: '/block/:slug',
        destination: '/klayr_mainchain/blocks/:slug',
        permanent: true,
      },
      {
        source: '/event/:slug',
        destination: '/klayr_mainchain',
        permanent: true,
      },
      {
        source: '/transactions',
        destination: '/klayr_mainchain/transactions',
        permanent: true,
      },
      {
        source: '/validators/eligible',
        destination: '/klayr_mainchain/validators',
        permanent: true,
      },
      {
        source: '/validators',
        destination: '/klayr_mainchain/validators',
        permanent: true,
      },
      {
        source: '/stakes',
        destination: '/klayr_mainchain/stakes',
        permanent: true,
      },
      {
        source: '/apps',
        destination: '/klayr_mainchain/chains',
        permanent: true,
      },
      {
        source: '/blocks',
        destination: '/klayr_mainchain/blocks',
        permanent: true,
      },
      {
        source: '/network',
        destination: '/klayr_mainchain/nodes',
        permanent: true,
      },
      {
        source: '/events',
        destination: '/klayr_mainchain',
        permanent: true,
      },
      {
        source: '/chain-info',
        destination: '/klayr_mainchain',
        permanent: true,
      },
      {
        source: '/analyze',
        destination: '/klayr_mainchain',
        permanent: true,
      },
      {
        source: '/tokens',
        destination: '/klayr_mainchain/tokens',
        permanent: true,
      },
      {
        source: '/top',
        destination: '/klayr_mainchain/top-accounts',
        permanent: true,
      },
    ];
  },
};
