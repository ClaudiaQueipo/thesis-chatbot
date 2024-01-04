import { create } from "zustand";

const useAssistantsStore = create((set) => ({
    assistants: [],
    setAssistants: (a) => set({ assistants: a }),
}))

export default useAssistantsStore