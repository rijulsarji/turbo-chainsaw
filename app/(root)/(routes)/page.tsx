import { Categories } from "@/components/categores";
import SearchInput from "@/components/search-input";
import prismaDB from "@/lib/prismadb";
import { UserButton } from "@clerk/nextjs";

const RootPage = async () => {
  const categories = await prismaDB.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
};

export default RootPage;
