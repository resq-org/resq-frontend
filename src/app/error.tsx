'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF5FF] p-6">
      <div className="space-y-6 text-center">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="512" height="512" rx="128" fill="#7C3AED" />
            <path
              d="M256 120C187.307 120 132 175.307 132 244C132 286.08 153.013 323.307 185.333 346.027V392L230.987 361.467C238.933 363.2 247.307 364 256 364C324.693 364 380 308.693 380 240C380 171.307 324.693 120 256 120Z"
              fill="white"
            />
            <circle cx="200" cy="244" r="24" fill="#7C3AED" />
            <circle cx="256" cy="244" r="24" fill="#7C3AED" />
            <circle cx="312" cy="244" r="24" fill="#7C3AED" />
          </svg>
        </div>

        {/* Error Text */}
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-purple-600">오류</h1>
          <h2 className="text-2xl font-semibold text-purple-900">
            문제가 발생했습니다
          </h2>
          <p className="mx-auto max-w-md text-purple-700">
            예기치 않은 오류가 발생했습니다. 다시 시도하거나 대시보드로
            돌아가세요.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            onClick={reset}
            className="rounded-xl border-2 border-black bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
          >
            다시 시도
          </Button>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="rounded-xl border-2 border-black bg-white px-6 py-3 text-purple-900 hover:bg-purple-100"
            >
              대시보드로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
