import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

function useUpdateUser() {
    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updateUser } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success("User account updated successfully.");
            queryClient.setQueryData("user", user);
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateUser };
}

export default useUpdateUser;
