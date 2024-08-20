"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StartedKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "@/components/posts/editor/actions";
import UserAvatar from "@/components/shared/user-avatar";
import { useSession } from "@/app/(main)/session-provider";
import { Button } from "@/components/ui/button";
import "@/components/posts/editor/style.css";

const PostEditor = () => {
  const { user } = useSession();

  const editor = useEditor({
    extensions: [
      StartedKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's on your mind",
      }),
    ],
    immediatelyRender: false,
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = async () => {
    await submitPost(input);
    editor?.commands.clearContent();
  };

  return (
    <div className="flex w-full flex-col gap-5 rounded-2xl border bg-card px-5 pb-3 pt-5">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-muted-foreground/10 px-5 py-3"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
