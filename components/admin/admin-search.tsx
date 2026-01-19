"use client";

import { Input } from "@/components/ui/input";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const AdminSearch = () => {
  const pathname = usePathname();
  const formActionUrl = pathname.includes("/admin/orders")
    ? "/admin/orders"
    : pathname.includes("/admin/users")
    ? "/admin/users"
    : "/admin/products";

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const updateQueryState = async () => {
      setQueryValue(searchParams.get("query") || "");
    };
    updateQueryState();
  }, [searchParams]);
  return (
    <form action={formActionUrl} method="GET">
      <Input
        type="search"
        name="query"
        placeholder="Search..."
        className="md:w-25 lg:w-75"
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
      />
      <button className="sr-only" type="submit">
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
