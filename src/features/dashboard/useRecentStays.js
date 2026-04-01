import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
const DEFAULT_NUM_DAYS = 7;
function useRecentStays() {
    const [searchParams] = useSearchParams();

    const numDays = !searchParams.get("last")
        ? DEFAULT_NUM_DAYS
        : Number(searchParams.get("last"));
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isPending, data: stays } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["bookings", `last=${numDays}`],
    });
    const confirmedStays = stays?.filter(
        (stay) => stay.status === "checked-in" || stay.status === "checked-out",
    );
    return { isPending, stays, confirmedStays, numDays };
}

export default useRecentStays;
