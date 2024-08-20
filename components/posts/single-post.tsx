import { PostData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "@/components/shared/user-avatar";
import { reverseCountDate } from "@/lib/utils";

interface IPostPros {
  post: PostData;
}

const SinglePost = ({ post }: IPostPros) => {
  return (
    <article className="space-y-3 rounded-2xl border bg-card p-5">
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/users/${post.user.username}`}
          className="flex items-center gap-2"
        >
          <UserAvatar
            avatarUrl={post.user.avatarUrl}
            alt={post.user.displayName}
          />
        </Link>
        <div className="flex flex-col gap-0">
          <Link href={`/users/${post.user.username}`} className="">
            <h3 className="text-sm font-medium capitalize hover:underline">
              {post.user.displayName}
            </h3>
          </Link>
          <Link
            href={`/posts/${post.id}`}
            className="text-xs text-muted-foreground hover:underline"
          >
            {reverseCountDate(post.createdAt)}
          </Link>
        </div>
      </div>

      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
};

export default SinglePost;
