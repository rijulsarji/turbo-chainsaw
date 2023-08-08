import prismaDB from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    redirectToSignIn();
  }

  //TODO: check subscription

  const companion = await prismaDB.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prismaDB.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
