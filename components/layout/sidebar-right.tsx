import { validateRequest } from "@/auth";
import { userDataSelect } from "@/lib/types";
import prisma from "@/utils/db";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import UserAvatar from "@/components/shared/user-avatar";
import { Button } from "@/components/ui/button";
import { unstable_cache } from "next/cache";
import { formatNumber } from "@/lib/utils";

const WhoToFollow = async () => {
  const { user } = await validateRequest();
  if (!user) return null;
  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: userDataSelect,
    take: 5,
  });
  return (
    <div className="space-y-5 rounded-2xl border bg-card p-5">
      <div className="text-xl font-semibold">Who to follow</div>
      {usersToFollow.map((user) => {
        return (
          <div
            key={user.id}
            className="flex items-center justify-between gap-3"
          >
            <Link
              href={`/users/${user.username}`}
              className="flex items-center gap-3"
            >
              <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
              <div>
                <p className="my-0 line-clamp-1 break-all py-0 font-semibold leading-tight hover:underline">
                  {user.displayName}
                </p>
                <p className="my-0 line-clamp-1 break-all py-0 text-sm leading-tight text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </Link>
            <Button size="sm" variant="outline">
              Follow
            </Button>
          </div>
        );
      })}
    </div>
  );
};

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
    SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count FROM posts GROUP BY (hashtag) ORDER BY count DESC, hashtag ASC LIMIT 5;
  `;
    return result.map((row) => {
      return { hashtag: row.hashtag, count: Number(row.count) };
    });
  },
  ["trendingTopics"],
  { tags: ["trending_topics"], revalidate: 3 * 60 * 60 },
);

const TrendingTopics = async () => {
  const trendingTopics = await getTrendingTopics();
  return (
    <div className="space-y-5 rounded-2xl border bg-card p-5">
      <div className="text-xl font-semibold">Trending Topics</div>
      {trendingTopics.map((item) => {
        console.log("item", item);

        const title = item.hashtag.split("#")[1];

        return (
          <Link href={`/hashtag/${title}`} className="block" key={title}>
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={item.hashtag}
            >
              {item.hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(item.count)} {item.count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

const SidebarRight = () => {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <Suspense fallback={<Loader2 className="mx-auto block animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};

export default SidebarRight;
