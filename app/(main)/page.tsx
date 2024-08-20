import SidebarRight from "@/components/layout/sidebar-right";
import PostEditor from "@/components/posts/editor/post-editor";
import SinglePost from "@/components/posts/single-post";
import { postDataInclude } from "@/lib/types";
import prisma from "@/utils/db";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-w-o flex w-full gap-5">
      <div className="w-full min-w-0 space-y-3">
        <PostEditor />
        {posts.map((post) => {
          return <SinglePost key={post.id} post={post} />;
        })}
      </div>
      <SidebarRight />
    </main>
  );
}
