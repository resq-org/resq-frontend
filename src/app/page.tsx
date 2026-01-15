// import { MSWClientTest, MSWServerTest } from '@/components';
import Logo from '@/assets/resQ.svg';

export default function Home() {
  return (
    <main className="p-6">
      <header className="mb-4 flex flex-row gap-4 text-xl font-bold">
        <Logo className="h-8 w-8" /> MSW 테스트 페이지
      </header>
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
      <h1 className="text-2xl font-[800]">Font Debug</h1>

      {/* Pretendard 적용 (전역) */}
      <p className="text-lg">산세리프</p>

      {/* Pretendard 가변 가중치 테스트 */}
      <p className="text-lg font-[920]">산세리프</p>

      {/* 기본 시스템 산세리프와 비교 */}
      <div className="font-sans not-italic">
        <p className="text-lg">산세리프</p>
      </div>
    </main>
  );
}
