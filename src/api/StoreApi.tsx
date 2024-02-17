import { SearchState } from "@/pages/SearchPage";
import { Store, StoreSearchResponse } from "@/types";
// import axios from "axios";
import { useQuery } from "react-query";

const API_BASE_URL = "http://localhost:7100";

export const useSearchStores = (searchState: SearchState, city?: string) => {
  const createSearchRequest = async (): Promise<StoreSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCategories", searchState.selectedCategories.join(""));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(
      `${API_BASE_URL}/api/v1/store/search/${city}?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error("Failed to get store");
    }
    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchStores", searchState],
    createSearchRequest,
    { enabled: !!city }
  );

  return { results, isLoading };
};
