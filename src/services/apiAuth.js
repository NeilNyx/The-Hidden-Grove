import supabase, { supabaseUrl } from "./supabase";

async function login({ email, password }) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);
    return data;
}

export default login;

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();

    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
    // 1. Update password or fullname

    let updateData = {};

    if (password) updateData.password = password;
    if (fullName) updateData.data = { fullName };

    let data = null;

    if (password || fullName) {
        const { data: updatedData, error } =
            await supabase.auth.updateUser(updateData);

        if (error) throw new Error(error.message);
        data = updatedData;
    }
    if (!avatar) return data;

    // 2. Upload the avatar image
    const userId = data?.user?.id;
    if (!userId) throw new Error("User ID not found");

    const fileName = `avatar-${userId}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);
    if (storageError) throw new Error(storageError.message);

    // 3. Update avatar in the user
    const { data: updatedUser, error: err } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
    });

    if (err) throw new Error(err.message);
    return updatedUser;
}
