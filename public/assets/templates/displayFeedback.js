import { BASE_URL } from "../utils/applicationConstants.js";

const userName = document.querySelectorAll(".testimonial__meta-title");
const userJob = document.querySelectorAll(".testimonial__meta-desc");
const userComments = document.querySelectorAll(".testimonial__title");

const fetchFeedbacks = async () => {
  const response = await fetch(`${BASE_URL}/feedback/approved/20/1`);
  const data = await response.json();
  const feedbacks = data.data;

  feedbacks.map((feedback, index) => {
    userName[index].innerHTML = feedback.name;
    userJob[index].innerHTML = feedback.designation;
    userComments[index].innerHTML = feedback.feedback;
  });

  if (feedbacks.length < 3) {
    const length = 3 - feedbacks.length;
    console.log(length);
    for (let i = 0; i < length; i++) {
      userName[feedbacks.length + i].innerHTML = "Anonymous";
      userJob[feedbacks.length + i].innerHTML = "Anonymous";
      userComments[feedbacks.length + i].innerHTML = "Anonymous";
    }
  }
};

fetchFeedbacks();
