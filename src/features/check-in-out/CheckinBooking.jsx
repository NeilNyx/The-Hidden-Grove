import { useEffect, useState } from "react";
import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const { booking, isPending } = useBooking();
    const { checkin, isCheckingIn } = useCheckin();
    const { settings, isPending: isLoadingSettings } = useSettings();
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);

    useEffect(() => setConfirmPaid(booking?.is_paid ?? false), [booking]);

    const moveBack = useMoveBack();

    if (isPending || isLoadingSettings) return <Spinner />;
    if (!booking || !settings) return null;

    const {
        id: bookingId,
        guests,
        total_price: totalPrice,
        num_guests: numGuests,
        has_breakfast: hasBreakfast,
        num_nights: numNights,
    } = booking;

    const optionalBreakfastPrice =
        settings.breakfast_price * numNights * numGuests;
    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkin({
                bookingId,
                breakfast: {
                    has_breakfast: true,
                    extras_price: optionalBreakfastPrice,
                    total_price: totalPrice + optionalBreakfastPrice,
                },
            });
        } else checkin({ bookingId, breakfast: {} });
    }

    // function addBreakfast() {
    //     if (!addBreakfast) return;
    //     setAddBreakfast(bookingId);
    // }
    return (
        <>
            <Row $type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((add) => !add);
                            setConfirmPaid(false);
                        }}
                        id="breakfast"
                    >
                        Want to add breakfast for{" "}
                        {formatCurrency(optionalBreakfastPrice)}.
                    </Checkbox>
                </Box>
            )}
            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    id="confirm"
                    disabled={confirmPaid || isCheckingIn}
                >
                    I confirm that {guests.full_name} has paid the total amount
                    of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingIn}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
