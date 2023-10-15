import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CoursesList from "@/components/courses-list";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

//!Metadata
export async function generateMetadata({ searchParams }: SearchPageProps) {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const selectedCategory = categories.filter(
    (category) => category.id === searchParams?.categoryId
  );

  const selectedCategoryName = selectedCategory.map((item) => {
    return item.name;
  });
  return {
    title: selectedCategoryName.length
      ? `Search | ${selectedCategoryName}`
      : `Search`,
    description: "Search for courses.",
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:mb-0 md:hidden block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
