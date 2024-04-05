import { create } from "zustand";

const useUsersStore = create((set) => ({
    users: [],
    setUsers: (u) => set({ users: u }),
}))

export default useUsersStore