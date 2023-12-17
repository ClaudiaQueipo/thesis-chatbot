
import { create } from "zustand";

const useAnswersStore = create((set) => ({
    answers: [],
    setAnswers: (a) => set({ answers: a }),
}))

export default useAnswersStore