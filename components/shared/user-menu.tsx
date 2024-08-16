"use client";

import { useSession } from "@/app/(main)/session-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/shared/user-avatar";
import Link from "next/link";
import { logout } from "@/app/(auth)/actions";
import { LogOut } from "lucide-react";

interface UserButtonProps {
  className?: string;
}

const UserMenu = ({ className }: UserButtonProps) => {
  const { user } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full border"
          size="icon"
        >
          <UserAvatar className="h-8 w-8" avatarUrl={user?.avatarUrl} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              Logged in as {user.username}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href={`/users/${user.username}`}
              className="flex items-center gap-2"
            >
              <UserAvatar className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-2"
          onClick={() => {
            logout();
          }}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
