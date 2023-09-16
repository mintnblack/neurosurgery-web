import { BASE_URL } from "../utils/applicationConstants.js";
import { setAlertAction } from "../functions/setAlertAction.js";

const insuranceNumberInput = document.getElementById("insuranceNumberInput");
const appointmentClinicId = document.getElementById("appointment_clinic_id");
const appointmentClinicName = document.getElementById("appointment_clinic");
const username = document.getElementById("appointment_user");
const email = document.getElementById("appointment_email");
const phone = document.getElementById("appointment_phone");
const age = document.getElementById("appointment_age");
const date = document.getElementById("appointment_date");
const gender = document.getElementById("appointment_gender");
const authorisation = document.getElementById("appointment_authorisation");
const insuranceRadioGroup = document.getElementsByName("appointment-insurace");

const clinicNames = document.getElementById("appointment_dropdown_content");

appointmentClinicName.addEventListener("click", () => {
  clinicNames.classList.toggle("visible_appointment_dropdown_content");
});

clinicNames.addEventListener("click", () => {
  clinicNames.classList.toggle("visible_appointment_dropdown_content");
});

insuranceRadioGroup.forEach((radioButton) => {
  radioButton.addEventListener("click", () => {
    if (radioButton.value === "YES") {
      insuranceNumberInput.style.display = "block";
    } else {
      insuranceNumberInput.style.display = "none";
    }
  });
});

window.onSelectClinicName = async (index) => {
  const response = await fetch(`${BASE_URL}/clinic/20/1`);
  const data = await response.json();
  document.getElementById("appointment_clinic").innerHTML =
    data.data[index].name;
  document.getElementById("appointment_clinic_id").value = data.data[index].id;
};

const fetchAllClinicData = async () => {
  const response = await fetch(`${BASE_URL}/clinic/20/1`);
  const data = await response.json();

  const clinicData = data.data;

  clinicData.forEach((clinic, index) => {
    clinicNames.innerHTML += `
        <p onClick="onSelectClinicName(${index})">${clinic.name}</p>
        `;
  });
};

fetchAllClinicData();

const handleValidation = () => {
  let isValid = true;
  let insurace;

  for (const radioButton of insuranceRadioGroup) {
    if (radioButton.checked) {
      insurace = radioButton.value;
      break; // Exit the loop once a selected radio button is found
    }
  }
  if (
    appointmentClinicName.innerHTML === "" ||
    appointmentClinicName.innerHTML === "Choose a clinic"
  ) {
    isValid = false;
    setAlertAction("Please select clinic name", "danger");
  } else if (username.value === "" || username.value === null) {
    isValid = false;
    setAlertAction("Please enter your name", "danger");
  } else if (email.value === "" || email.value === null) {
    isValid = false;
    setAlertAction("Please enter your email", "danger");
  } else if (!email.value?.includes("@")) {
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  } else if (!email.value?.includes(".")) {
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  } else if (email.value?.includes(" ")) {
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  } else if (email.value?.includes("@.")) {
    isValid = false;
    setAlertAction("Please enter valid email", "danger");
  } else if (phone.value === "" || phone.value === null) {
    isValid = false;
    setAlertAction("Please enter your phone number", "danger");
  } else if (phone.value?.length !== 10) {
    isValid = false;
    setAlertAction("Please enter valid phone number", "danger");
  } else if (phone.value?.includes(" ")) {
    isValid = false;
    setAlertAction("Please enter valid phone number", "danger");
  } else if (insurace === "YES" && authorisation.value === "") {
    isValid = false;
    setAlertAction("Please enter authorisation number", "danger");
  } else if (age.value === "" || age.value === null) {
    isValid = false;
    setAlertAction("Please enter your age", "danger");
  } else if (date.value === "" || date.value === null) {
    isValid = false;
    setAlertAction("Please select date", "danger");
  } else if (gender.value === "Gender") {
    isValid = false;
    setAlertAction("Please select your gender", "danger");
  }
  return isValid;
};

const bookAppointmentBtn = document.getElementById("bookAppointmentBtn");

bookAppointmentBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (handleValidation()) {
    let insurace;

    for (const radioButton of insuranceRadioGroup) {
      if (radioButton.checked) {
        insurace = radioButton.value;
        break; // Exit the loop once a selected radio button is found
      }
    }

    console.log(insurace, authorisation);

    const data = {
      age: age.value,
      clinic: appointmentClinicName.innerHTML,
      clinic_id: appointmentClinicId.value,
      date: date.value,
      email: email.value,
      gender: gender.value,
      name: username.value,
      phone: phone.value,
      insurance: insurace,
      authorisation: authorisation.value,
    };

    console.log(data);

    // const response = await fetch(`${BASE_URL}/appointment/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });

    // console.log(response)
    // if( response.status === 200) {
    //   window.location.reload();
    // }
  }
});
