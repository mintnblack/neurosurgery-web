import { BASE_URL } from "../utils/applicationConstants.js";

const userName = document.querySelectorAll(".testimonial__meta-title");
const userJob = document.querySelectorAll(".testimonial__meta-desc");
const userComments = document.querySelectorAll(".testimonial__title");

console.log(userName);
console.log(userJob);
console.log(userComments);

const fetchFeedbacks = async () => {
  const response = await fetch(`${BASE_URL}/feedback/approved/20/1`);
  const data = await response.json();
  const feedbacks = data.data;

  if (feedbacks.length >= 3) {
    feedbacks.map((feedback, index) => {
      userName[index].innerHTML = feedback.name;
      userJob[index].innerHTML = feedback.designation;
      userComments[index].innerHTML = feedback.feedback;
    });
  } else {
    const testimonials = document.querySelectorAll(".testimonials-layout1");
    console.log("testimonials", testimonials);
    testimonials[0].style.display = "none";
  }
};

fetchFeedbacks();
