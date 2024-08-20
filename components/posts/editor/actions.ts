"use server";

import { validateRequest } from "@/auth";
import { postSchema } from "@/lib/validation";
import prisma from "@/utils/db";

export const submitPost = async (input: string) => {
  const { user } = await validateRequest();
  if (!user) throw Error("Unauthorized");

  const { content } = postSchema.parse({ content: input });

  await prisma.post.create({
    data: {
      content: content,
      userId: user.id,
    },
  });
};
