

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
    delete assistant._id;
    assistant.user_id = assistant.username
    delete assistant.username
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
    console.log(response)
    if (!response.ok) {
      return false
    } else {
      return true
    }
  }

  async deleteAssistant(assistantId) {
    const response = await fetch(
      this.base_path.concat(`delete/${assistantId}`),
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return true;
    }
  }


  async updateAssistant(assistantId, updatedAssistant) {
    const payload = JSON.stringify(updatedAssistant);

    const response = await fetch(
      this.base_path.concat(`edit/${assistantId}`),

      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },
        body: payload
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return true;
    }
  }

  async generateFiles(questions, answers, name) {
    const data = {
      name: name,
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
      return await response.json()
    }
  }

  async getAssistants(email) {
    const payload = {
      email: email
    }

    const response = await fetch(this.base_path.concat("fetch-assistants"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
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