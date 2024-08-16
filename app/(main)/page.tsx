import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1>Welcome to abundance</h1>
      <Button asChild variant="default" size="lg">
        <Link href="/signup">Click to enter the 5th dimension</Link>
      </Button>
    </div>
  );
}
