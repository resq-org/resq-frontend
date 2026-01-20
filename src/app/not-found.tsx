import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF5FF] p-6">
      {/* Logo */}
      <div className="mb-8">
        <svg
          width="64"
          height="64"
          viewBox="0 0 512 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="512" height="512" rx="128" fill="#7C3AED" />
          <path
            d="M256 128C185.3 128 128 185.3 128 256C128 326.7 185.3 384 256 384C266.5 384 276.7 382.9 286.4 380.8C284.2 374.4 283 367.5 283 360.3C283 359.5 283 358.7 283.1 357.9C274.4 359.3 265.3 360 256 360C198.6 360 152 313.4 152 256C152 198.6 198.6 152 256 152C313.4 152 360 198.6 360 256C360 256.7 360 257.5 359.9 258.2C367.1 256.8 374.6 256 382.3 256C383.4 256 384.6 256 385.7 256.1C385.9 254.7 386 253.4 386 252C386 181.3 326.7 128 256 128Z"
            fill="white"
          />
          <circle cx="364" cy="360" r="64" fill="#A78BFA" />
          <path
            d="M364 328V392M332 360H396"
            stroke="white"
            strokeWidth="16"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* 404 Text */}
      <h1 className="mb-4 text-8xl font-bold text-purple-600">404</h1>

      {/* Message */}
      <h2 className="mb-2 text-2xl font-bold text-purple-900">
        페이지를 찾을 수 없습니다
      </h2>
      <p className="mb-8 max-w-md text-center text-purple-600">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>

      {/* Home Button */}
      <Link href="/dashboard">
        <Button className="rounded-xl bg-purple-600 px-6 py-3 text-white hover:bg-purple-700">
          <Home className="mr-2 h-5 w-5" />
          대시보드로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
