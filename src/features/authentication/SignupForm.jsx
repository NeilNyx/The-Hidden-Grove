import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const { signup, isPending } = useSignup();
    const { register, formState, getValues, handleSubmit, reset } = useForm();
    const { errors } = formState;

    function onSubmit({ fullName, email, password }) {
        signup(
            { fullName, email, password },
            {
                onSettled: reset,
            },
        );
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    id="fullName"
                    disabled={isPending}
                    {...register("fullName", {
                        required: "Fullname is required.",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input
                    type="email"
                    id="email"
                    disabled={isPending}
                    {...register("email", {
                        required: "Email is required.",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide a valid email",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Password (min 8 characters)"
                error={errors?.password?.message}
            >
                <Input
                    type="password"
                    id="password"
                    disabled={isPending}
                    {...register("password", {
                        required: "Password is required.",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors?.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    disabled={isPending}
                    {...register("passwordConfirm", {
                        required: "Password Confirmation is required.",
                        validate: (value) =>
                            value === getValues().password ||
                            "Password do not match.",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button
                    $variation="secondary"
                    type="reset"
                    disabled={isPending}
                    onClick={reset}
                >
                    Cancel
                </Button>
                <Button disabled={isPending}>Create new user</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
