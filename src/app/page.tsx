import { MSWClientTest, MSWServerTest } from '@/components';

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl font-bold">🔍 MSW 테스트 페이지</h1>
      {/* <MSWClientTest />
      <MSWServerTest /> */}
      <div
        className={`
          z-50 flex items-center justify-center rounded-md border
          border-gray-300 bg-black p-4 text-lg text-white shadow-md
        `}
      >
        <span className="text-center font-bold text-red-500">
          테스트 컴포넌트
        </span>
      </div>
    </main>
  );
}
