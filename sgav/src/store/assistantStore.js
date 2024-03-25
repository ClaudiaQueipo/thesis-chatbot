import { create } from "zustand";
import { getUser } from "../utils/auth";

const useAssistantStore = create((set) => ({
    assistant: {
        name: "",
        description: "",
        knowledge: "",
        questions: "",
        answers: "",
        username: getUser()
    },
    setAssistant: (a) => set({ assistant: a }),
}))

export default useAssistantStore