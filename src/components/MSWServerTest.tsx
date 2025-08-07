export const dynamic = 'force-dynamic';

export const MSWServerTest = async () => {
  const res = await fetch('http://localhost:3000/api/hello', {
    cache: 'no-store',
  });

  const text = await res.text();
  //   console.log("🔍 실제 응답 내용:", text);

  const data = JSON.parse(text);

  return (
    <div className="rounded border bg-gray-50 p-4 text-sm">
      <strong>SSR MSW 테스트:</strong>
      <p>{data.message}</p>
    </div>
  );
};
