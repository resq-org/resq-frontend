import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/globals.css';
import { RQProvider, MSWProvider } from '@/providers';
import { SpeedInsights } from '@vercel/speed-insights/next';

if (
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_MODE === 'mock' &&
  process.env.NEXT_RUNTIME === 'nodejs'
) {
  const { server } = await import('@/mocks/server');
  server.listen();
}

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'resQ',
  description:
    '목표와 루틴을 시각화하고, 집중력과 실행력을 키워주는 생산성 서비스 resQ의 프론트엔드입니다.',
  icons: '/logo.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`
          ${pretendard.variable}
          antialiased
        `}
      >
        <MSWProvider>
          <RQProvider>{children}</RQProvider>
        </MSWProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
