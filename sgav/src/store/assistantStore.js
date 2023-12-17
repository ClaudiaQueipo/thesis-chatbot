import { create } from "zustand";

const useAssistantStore = create((set) => ({
    assistant: {
        name: "",
        description: "",
        knowledge: "",
        questions: "",
        answers: ""
    },
    setAssistant: (a) => set({ assistant: a }),
}))

export default useAssistantStore