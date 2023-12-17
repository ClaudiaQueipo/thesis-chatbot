
import { create } from "zustand";

const useQuestionsStore = create((set) => ({
    questions: [],
    setQuestions: (q) => set({ questions: q }),
}))

export default useQuestionsStore