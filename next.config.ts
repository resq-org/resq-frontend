import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Webpack의 기본 규칙 중 .svg를 처리하는 rule을 탐색
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // import iconUrl from './icon.svg?url'처럼 ?url이 붙은 SVG를 처리하는 규칙.
      // 기존의 fileLoaderRule를 그대로 복사해서 사용 → Webpack이 SVG를 URL/파일로 반환.
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // 나머지 SVG → React 컴포넌트로 처리
      // ?url이 붙지 않은 SVG → @svgr/webpack으로 처리.
      // SVGR을 쓰면 SVG를 React 컴포넌트처럼 쓸 수 있음
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer ?? { and: [/\.(js|ts)x?$/] }, // issuer: 이 규칙을 .js/.ts/.tsx에서 import한 경우에만 적용.
        resourceQuery: {
          // resourceQuery.not: ?url이 붙은 건 제외.
          not: [...(fileLoaderRule.resourceQuery?.not ?? []), /url/],
        }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true, // .tsx 타입 선언 지원.
              ext: 'tsx', // 'tsx' → 자동 생성되는 컴포넌트 확장자 .tsx로 지정.
            },
          },
        ],
      },
    );
    // 기존 파일 로더에서 .svg 제외
    // Next.js 기본 룰에서는 .svg를 asset으로 처리하는데, 직접 처리할 거니까 제외시킴.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'hyunjin-kim',
  project: 'resq-frontend',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
