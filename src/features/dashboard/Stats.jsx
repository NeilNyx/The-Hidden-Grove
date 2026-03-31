import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
    HiOutlineBanknotes,
    HiOutlineBriefcase,
    HiOutlineCalendarDays,
    HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays }) {
    // 1.
    const numBookings = bookings?.length || 0;

    // 2.
    const sales = bookings.reduce(
        (acc, cur) => acc + Number(cur.total_price || 0),
        0,
    );

    // 3.
    const checkins = confirmedStays?.length || 0;

    // 4.
    const occupation = confirmedStays.reduce(
        (acc, cur) => acc + Number(cur.num_nights || 0),
        0,
    );

    console.log(confirmedStays);
    return (
        <>
            <Stat
                title="bookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<HiOutlineBanknotes />}
                value={formatCurrency(sales)}
            />
            <Stat
                title="Check ins"
                color="indigo"
                icon={<HiOutlineCalendarDays />}
                value={checkins}
            />
            <Stat
                title="Occupancy Rate"
                color="yellow"
                icon={<HiOutlineChartBar />}
                value={occupation}
            />
            <Stat />
            <Stat />
            <Stat />
        </>
    );
}

export default Stats;
