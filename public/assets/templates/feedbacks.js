import { BASE_URL } from "../utils/applicationConstants.js";
import { setAlertAction } from "../functions/setAlertAction.js";

const name = document.getElementById("feedback-user");
const email = document.getElementById("feedback-email");
const phone = document.getElementById("feedback-phone");
const designation = document.getElementById("feedback-designation");
const feedback = document.getElementById("feedback-message");
const rating = document.querySelectorAll("#stars i.fa-star");

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

const handleValidation = () => {
  let isValid = true;
  if (name.value === "") {
    isValid = false;
    setAlertAction("Please enter your name", "danger");
  } else if (designation.value === "") {
    isValid = false;
    setAlertAction("Please enter your designation", "danger");
  } else if (phone.value === "") {
    isValid = false;
    setAlertAction("Please enter your phone number", "danger");
  } else if (phone.value.length !== 10) {
    isValid = false;
    setAlertAction("Please enter valid phone number", "danger");
  } else if (phone.value.includes(" ")) {
    isValid = false;
    setAlertAction("Please enter valid phone number", "danger");
  } else if (email.value === "") {
    isValid = false;
    setAlertAction("Please enter your email", "danger");
  } else if (!email.value.includes("@")) {
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  } else if (!email.value.includes(".")) {
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  } else if (email.value.includes(" ")) {
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  } else if (email.value.includes("@.")) {
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  } else if (feedback.value === "") {
    isValid = false;
    setAlertAction("Please enter your feedback", "danger");
  } else if (rating.length === 0) {
    isValid = false;
    setAlertAction("Please enter your rating", "danger");
  }
  return isValid;
};

const feedbackSubmit = document.getElementById("feedback-submit");

feedbackSubmit.addEventListener("click", async (e) => {
  e.preventDefault();
  if (handleValidation()) {
    const data = {
      designation: designation.value,
      email: email.value,
      feedback: feedback.value,
      name: name.value,
      phone: phone.value,
      rating: rating.length.toString(),
    };

    console.log(data);

    // post api using fetch

    const response = await fetch(`${BASE_URL}/feedback/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      setAlertAction("Feedback submitted successfully", "success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      setAlertAction("Something went wrong", "danger");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  }
});
