import { create } from "zustand";

const useLogsStore = create((set) => ({
    logs: [],
    setLogs: (l) => set({ logs: l }),
}))

export default useLogsStore