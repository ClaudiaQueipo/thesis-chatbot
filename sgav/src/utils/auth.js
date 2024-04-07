
export const getUser = () => localStorage.getItem("user_sgav");

export const setUser = (email) => localStorage.setItem("user_sgav", email);

export const removeUser = () => localStorage.removeItem("user_sgav");

export const isAdmin = () => localStorage.getItem('isAdmin') && localStorage.getItem('isAdmin') == 'SI'

export const setIsAdmin = (word) => localStorage.setItem('isAdmin', word)

export const isLoggedIn = () => {
    const user = getUser()
    return Boolean(user)
}