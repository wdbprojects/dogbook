import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

const avatarPlaceholder = "https://i.pravatar.cc/150?u=a042581f4e29026704d";

interface UserAvatarProps {
  avatarUrl?: string | null | undefined;
  alt?: string;
  className?: string;
}

const UserAvatar = ({
  avatarUrl,
  alt = "user avatar",
  className,
}: UserAvatarProps) => {
  return (
    <Avatar
      className={cn(
        "aspect-square h-8 w-8 flex-none bg-secondary object-cover",
        className,
      )}
    >
      <AvatarImage src={avatarUrl || avatarPlaceholder} alt={alt} />
      <AvatarFallback>DB</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
