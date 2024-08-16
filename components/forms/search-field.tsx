"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchField = () => {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const query = (form.query as HTMLInputElement).value.trim();
    if (!query) return;
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input name="query" placeholder="Search..." className="pl-8" />
        <Search
          className="absolute left-2 top-1/2 -translate-y-1/2 transform text-muted-foreground"
          size={18}
        />
      </div>
    </form>
  );
};

export default SearchField;
