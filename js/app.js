"use strict";

const showBtn = document.getElementById("show-btn")
const questionCard = document.querySelector(".question-card")
const closeBtn = document.querySelector(".close-btn")
const form = document.getElementById("question-form")
const feedback = document.querySelector(".feedback")
const questionInput = document.getElementById("question-input")
const answerInput = document.getElementById("answer-input")
const questionList = document.getElementById("questions-list")
const submitBtn = document.querySelector(".submitBtn");

let data = []
let id = 1


class New_Card {
  constructor(question, answer, id) {
    this.question = question
    this.answer = answer
    this.id = id
  }
}

class FlashCard {
  constructor() {
    // this.Open_QuestionList()
    // this.Close_QuestionList();
    // this.Validate_QuestionList();
    showBtn.addEventListener("click", this.Open_QuestionList)
    closeBtn.addEventListener("click", this.Close_QuestionList)

    // save buttton
    submitBtn.addEventListener("click", this.Validate_QuestionList.bind(this));
    questionList.addEventListener('click', this.GetElem.bind(this))

    // showBtn.addEventListener("click", this.toggle_AddQuestion)
  }

  Open_QuestionList() {
    questionCard.classList.remove("question-card")
  }

  Close_QuestionList() {
    questionCard.classList.add("question-card")
  }

  // clear Fields
  Clear_QuestionList() {
    questionInput.value = answerInput.value = ""
  }

// Validate form
  Validate_QuestionList(e) {
    e.preventDefault()
    if (questionInput.value && answerInput.value) {
      id++
      feedback.style.display = "none"
      const Card = new New_Card(questionInput.value, answerInput.value, id)
      data.push(Card)
      this.New_Question_Card(Card);

      this.Clear_QuestionList();
    } else {
      feedback.style.display = "block"
      feedback.textContent = "Cannot Add Empty Values"
      // unlcear
      setTimeout(() => (feedback.style.display = "none"), 4000)
    }
  }

  // New Html elements
  New_Question_Card(detail) {
    const html = `
     <div class="col-md-4">
    <div class="card card-body flashcard my-3">
     <h4 class="text-capitalize">${detail.question}</h4>
     <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
     <h5 class="answer mb-3">${detail.answer}</h5>
     <div class="flashcard-btn d-flex justify-content-between">

      <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${detail.id}">edit</a>
      <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase">delete</a>
     </div>
    </div>
   </div>
    `
    questionList.insertAdjacentHTML('afterbegin', html);
  }

  Edit_Card(e) {
    const first = e.target.closest(".flashcard").querySelector("h4")
    const second = e.target.closest(".flashcard").querySelector("h5")
    questionInput.value = first.textContent
    answerInput.value = second.textContent;
    this.Open_QuestionList();
    e.target.closest(".col-md-4").remove()
  }

  Display__Answer(e) {
     const displayAnswer = e.target.closest(".col-md-4").querySelector(".mb-3")
     displayAnswer.classList.toggle("answer")
  }

  GetElem(e) {
    e.preventDefault();
    //Display answer
    if(e.target.classList.contains('show-answer')) {
      this.Display__Answer(e)
    }

    // Edit element
    if(e.target.classList.contains('edit-flashcard')) {
      this.Edit_Card(e)
    }
    // delete card
    if(e.target.classList.contains('delete-flashcard')) {
      e.target.closest(".col-md-4").remove();
    }
  }
  
}

const FlashCards = new FlashCard()
