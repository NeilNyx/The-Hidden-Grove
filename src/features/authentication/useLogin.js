import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import loginAPI from "../../services/apiAuth";
import toast from "react-hot-toast";

function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isPending, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginAPI({ email, password }),
        onSuccess: ({ user }) => {
            queryClient.setQueryData(["user"], user);
            navigate("/dashboard", { replace: true });
        },

        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isPending, login };
}

export default useLogin;
