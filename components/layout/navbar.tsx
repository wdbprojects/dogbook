import DarkMode from "@/components/shared/dark-mode";
import Link from "next/link";
import UserMenu from "@/components/shared/user-menu";
import SearchField from "../forms/search-field";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-muted dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          dogbook
        </Link>
        <SearchField />
        <div className="flex items-center gap-4">
          <DarkMode />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
