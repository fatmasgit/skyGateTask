import { useQuery } from "@tanstack/react-query";

import { wizards as wizardsService } from "@/services/wizards";
import type { SearchField } from "@/types/wizard";

export function useWizards(searchField: SearchField, searchValue: string) {
  return useQuery({
    queryKey: ["wizards", searchField, searchValue],

    queryFn: () => {
      if (!searchValue) {
        return wizardsService.getWizards();
      }

      const formattedSearch =
        searchValue.charAt(0).toUpperCase() + searchValue.slice(1);

      return wizardsService.getWizards({
        [searchField]: formattedSearch,
      });
    },
  });
}
