import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
    const {
        isPending,
        settings: {
            min_booking_length,
            max_booking_length,
            max_guest_per_booking,
            breafast_price,
        } = {},
    } = useSettings();

    const { isUpdating, updateSetting } = useUpdateSetting();

    function handleUpdate(e, field) {
        const { value } = e.target;

        if (!value) return;
        updateSetting({ [field]: value });
    }

    if (isPending) return <Spinner />;
    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={min_booking_length}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate(e, "min_booking_length")}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={max_booking_length}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate(e, "max_booking_length")}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={max_guest_per_booking}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate(e, "max_guest_per_booking")}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breafast_price}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdate(e, "breafast_price")}
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
