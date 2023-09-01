
import { BASE_URL } from "../utils/applicationConstants.js";

const stars = document.querySelectorAll("#stars i");

stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      if (index1 >= index2) {
        star.classList.add("fa-star");
        star.classList.remove("fa-star-o");
      } else {
        star.classList.add("fa-star-o");
        star.classList.remove("fa-star");
      }
    });
  });
});


const feedbackSubmit = document.getElementById("feedback-submit");

feedbackSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("feedback-user").value;
  const email = document.getElementById("feedback-email").value;
  const phone = document.getElementById("feedback-phone").value;
  const designation = document.getElementById("feedback-designation").value;
  const feedback = document.getElementById("feedback-message").value;
  const rating = document.querySelectorAll("#stars i.fa-star").length;

  const data = {
    "designation": designation,
    "email": email,
    "feedback": feedback,
    "name": name,
    "phone": phone
  }

  // post api using fetch

  const response = await fetch(`${BASE_URL}/feedback/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("response : ",response);
  
});

const fetchFeedbacks = async () => {
  const response  = await fetch(`${BASE_URL}/feedback/`);
  const data = await response.json();

  console.log(data);
};


fetchFeedbacks();