import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();
    const isWorking = isCreating || isEditing;

    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    const { errors } = formState;

    function onSubmit(data) {
        const image = typeof data.img === "string" ? data.img : data.img[0];

        if (isEditSession)
            editCabin(
                { newCabinData: { ...data, img: image }, id: editId },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                },
            );
        else
            createCabin(
                { ...data, img: image },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                },
            );
    }

    // function onError(errors) {
    // console.log(errors);
    // }

    return (
        <Form
            onSubmit={handleSubmit(
                onSubmit,
                // onError
            )}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin Name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "Please enter the cabin name.",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum Capacity"
                error={errors?.max_capacity?.message}
            >
                <Input
                    type="text"
                    id="maxCapacity"
                    disabled={isWorking}
                    inputMode="numeric"
                    {...register("max_capacity", {
                        required: "Please enter the maximum capacity.",
                        validate: (value) => {
                            if (!/^\d+$/.test(value))
                                return "Only whole number is allowed";
                        },
                        min: {
                            value: 1,
                            message: "Capacity must be at least 1.",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular Price"
                error={errors?.regular_price?.message}
            >
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regular_price", {
                        required: "Please enter the regular price.",
                        min: {
                            value: 1,
                            message: "Price must be at least 1.",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                    {...register("discount", {
                        required: "Please enter the discount.",
                        validate: (value) =>
                            Number(value) <=
                                Number(getValues().regular_price) ||
                            "Discount should be less than the regular price",
                        min: {
                            value: 0,
                            message: "Discount cannot be negative.",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Description for website">
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    defaultValue=""
                    {...register("description", {
                        required: "Please enter the description.",
                    })}
                />
            </FormRow>

            <FormRow error={errors?.img?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    type="file"
                    {...register("img", {
                        required: isEditSession
                            ? false
                            : "Please enter a cabin image.",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    $variation="secondary"
                    $type="reset"
                    onClick={(e) => {
                        e.preventDefault();
                        onCloseModal?.();
                    }}
                >
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Update cabin" : "Create new cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
