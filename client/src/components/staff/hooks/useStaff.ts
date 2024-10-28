import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Staff } from "@shared/types";
import { filterByTreatment } from "../utils";

import { axiosInstance } from "@/axiosInstance";
import { queryKeys } from "@/react-query/constants";

// Query function to fetch staff
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/staff");
  return data;
}

export function useStaff() {
  // State for filtering staff by treatment
  const [filter, setFilter] = useState("all");

  const selectFn = useCallback(
    (unfilteredStaff: Staff[]) => {
      //console.log("Unfiltered Staff:", unfilteredStaff); // Debugging statement
      if (filter === "all") {
        return unfilteredStaff;
      } else {
        const filteredStaff = filterByTreatment(unfilteredStaff, filter);
        //console.log("Filtered Staff:", filteredStaff); // Debugging statement
        return filteredStaff;
      }
    },
    [filter]
  );

  // Fetching data from the server via useQuery
  const fallback: Staff[] = [];
  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: selectFn,
  });

  return { staff, filter, setFilter };
}
