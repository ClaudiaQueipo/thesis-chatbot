

class AssistantService {
  base_path = "http://0.0.0.0:8000/assistants/"

  async generateQuestions(file) {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(
        this.base_path.concat("gen-questions"),
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        return data;
      }
    } catch (e) {
      return new Error(e)
    }


  }
  async generateAnswers(questions) {
    const data = {
      questions: questions
    }
    console.log(data)
    const response = await fetch(
      this.base_path.concat("gen-answers"),

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    } else {
      const data = await response.json()
      return data
    }
  }

  async generateFiles(questions, answers) {
    const data = {
      questions: questions,
      answers: answers
    }
    const payload = JSON.stringify(data)

    const response = await fetch(this.base_path.concat("gen-files"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    } else {
      return "Correct"
    }
  }
}


const assistantService = new AssistantService()
export default assistantService