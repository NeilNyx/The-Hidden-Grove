import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { createCabin } from "../../services/apiCabins";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, getValues, formState } = useForm();

    const { errors } = formState;

    const { isPending: isCreating, mutate } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("New cabin successfully created.");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (err) => toast.error(err.message),
    });

    function onSubmit(data) {
        // console.log(data);
        mutate({ ...data, img: data.img[0] });
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
        >
            <FormRow label="Cabin Name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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
                    disabled={isCreating}
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

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={isCreating}
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
                        required: "Please enter a cabin image.",
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
                    }}
                >
                    Cancel
                </Button>
                <Button disabled={isCreating}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
