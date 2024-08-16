import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SessionProvider from "./session-provider";
import Navbar from "@/components/layout/navbar";
import SidebarLeft from "@/components/layout/sidebar-left";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await validateRequest();
  if (!session.user) redirect("/login");
  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <SidebarLeft className="!sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-gray-100 px-3 py-5 shadow-md dark:bg-gray-900 sm:block lg:px-5 xl:w-80" />
          {children}
        </div>
        <SidebarLeft className="sticky bottom-0 mx-auto flex w-full flex-row justify-center rounded-none border-t bg-gray-100 px-3 py-2 dark:bg-gray-900 sm:hidden" />
      </div>
    </SessionProvider>
  );
};

export default Layout;
