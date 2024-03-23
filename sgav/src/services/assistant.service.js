

class AssistantService {
  base_path = "http://0.0.0.0:8080/assistants/"

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

  async saveAssistant(assistant) {
    const payload = JSON.stringify(assistant)

    const response = await fetch(
      this.base_path.concat("create"),

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: payload
      }
    )
    
    if (!response.ok) {
      return false
    } else {
      return true
    }
  }


  async generateFiles(questions, answers, name) {
    const data = {
      name: name,
      questions: questions,
      answers: answers
    }
    console.log(data)
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
      return response.blob()
    }
  }

  async getAssistants() {
    const response = await fetch(this.base_path.concat("fetch-assistants"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    } else {
      const data = await response.json()
      console.log(data)
      return data
    }
  }
}




const assistantService = new AssistantService()
export default assistantService