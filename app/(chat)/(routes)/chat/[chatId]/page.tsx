import prismaDB from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatClient from "./components/client";

interface ChatIdPageProps {
  params: {
    chatId: string;
  };
}

const ChatIdPage = async ({ params }: ChatIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismaDB.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if(!companion) {
    redirect("/")
  }

  return (
    <div>
      <ChatClient companion={companion} />
    </div>
  );
};

export default ChatIdPage;
