
import { BASE_URL } from "../utils/applicationConstants.js";

const contactFormSubmitBtn = document.getElementById("contactFormSubmitBtn");

contactFormSubmitBtn.addEventListener("click", async()=>{
    const name = document.getElementById("contact-name").value;
    const phone = document.getElementById("contact-Phone").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("contact-message").value;

    const data = {
        name,
        phone,
        email,
        message
    }

    const response = await fetch(`${BASE_URL}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(response)

});