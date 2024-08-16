import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SessionProvider from "./session-provider";
import Navbar from "@/components/layout/navbar";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await validateRequest();
  if (!session.user) redirect("/login");
  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto max-w-7xl p-5">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default Layout;
