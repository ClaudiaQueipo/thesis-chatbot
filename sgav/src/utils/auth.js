
export const getUser = () => localStorage.getItem("user_sgav");

export const setUser = (email) => localStorage.setItem("user_sgav", email);

export const removeUser = () => localStorage.removeItem("user_sgav");

export const isLoggedIn = () => {
    const user = getUser()
    return Boolean(user)
}