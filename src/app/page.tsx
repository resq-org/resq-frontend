import { MSWClientTest, MSWServerTest } from "@/components";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">🔍 MSW 테스트 페이지</h1>
      <MSWClientTest />
      <MSWServerTest />
    </main>
  );
}
