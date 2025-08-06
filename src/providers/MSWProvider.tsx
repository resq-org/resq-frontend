"use client";

import { Suspense, use } from "react";
import { handlers } from "@/mocks/handlers";

type HotModule = {
  hot?: {
    dispose(callback: () => void): void;
  };
};

const mockingEnabledPromise =
  typeof window !== "undefined"
    ? import("@/mocks/browser").then(async (module) => {
        const { worker } = module;

        if (
          process.env.NODE_ENV === "production" ||
          process.env.NEXT_PUBLIC_MODE !== "mock"
        ) {
          return;
        }
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes("_next")) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handlers);

        const hotModule = module as HotModule;

        hotModule.hot?.dispose?.(() => {
          worker.stop();
        });
        console.log(worker.listHandlers());
      })
    : Promise.resolve();

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  use(mockingEnabledPromise);
  return children;
}
