"use client";

import { useEffect, useState } from "react";

export const MSWClientTest = () => {
  const [message, setMessage] = useState("로딩 중...");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("❌ 요청 실패: " + err.message));
  }, []);

  return (
    <div className="p-4 border rounded bg-gray-50 text-sm">
      <strong>클라이언트 측 MSW 테스트:</strong>
      <p>{message}</p>
    </div>
  );
};
