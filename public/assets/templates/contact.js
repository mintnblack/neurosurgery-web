import { BASE_URL } from "../utils/applicationConstants.js";
import { setAlertAction } from "../functions/setAlertAction.js";

const name = document.getElementById("contact-name");
const phone = document.getElementById("contact-Phone");
const email = document.getElementById("contact-email");
const message = document.getElementById("contact-message");

const contactFormSubmitBtn = document.getElementById("contactFormSubmitBtn");

const handleValidation = () => {
  let isValid = true;
  if (name.value === "") {
    isValid = false;
    setAlertAction("Please enter your name", "danger");
  }else if(phone.value === ""){
    isValid = false;
    setAlertAction("Please enter your phone number", "danger");
  }else if(phone.value.length !== 10){
    isValid = false;
    setAlertAction("Please enter valid phone number", "danger");
  }else if(phone.value.includes(" ")){
    isValid = false;
    setAlertAction("Please enter valid phone number", "danger");
  }else if(email.value === ""){
    isValid = false;
    setAlertAction("Please enter your email", "danger");
  }else if(!email.value.includes("@")){
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  }else if(!email.value.includes(".")){
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  }else if(email.value.includes(" ")){
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  }else if(email.value.includes("@.")){
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  }else if(message.value === ""){
    isValid = false;
    setAlertAction("Please enter your message", "danger");
  }
  return isValid;
};

contactFormSubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (handleValidation()) {
    const data = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      message: message.value,
    };

    console.log(data);

    //   const response = await fetch(`${BASE_URL}/contact/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    // console.log(response)
  }
});
