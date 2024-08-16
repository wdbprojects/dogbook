import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Home, MessageSquareText } from "lucide-react";
import Link from "next/link";

interface ISidebarProps {
  className?: string;
}

const SidebarLeft = ({ className }: ISidebarProps) => {
  return (
    <aside className={className}>
      <Button
        asChild
        variant="ghost"
        title="Home"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/">
          <Home className="h-5 w-5 text-muted-foreground" />
          <span className="hidden text-muted-foreground lg:inline">Home</span>
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        title="Notifications"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/notifications">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="hidden text-muted-foreground lg:inline">
            Notifications
          </span>
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        title="Messages"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/messages">
          <MessageSquareText className="h-5 w-5 text-muted-foreground" />
          <span className="hidden text-muted-foreground lg:inline">
            Messages
          </span>
        </Link>
      </Button>
      <Button
        asChild
        variant="ghost"
        title="Bookmarks"
        className="flex items-center justify-start gap-3"
      >
        <Link href="/bookmarks">
          <Bookmark className="h-5 w-5 text-muted-foreground" />
          <span className="hidden text-muted-foreground lg:inline">
            Bookmarks
          </span>
        </Link>
      </Button>
    </aside>
  );
};

export default SidebarLeft;
