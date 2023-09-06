import { BASE_URL } from "../utils/applicationConstants.js";

const clinicNames = document.getElementById("appointment_dropdown_content");

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
        <p onClick="onSelectClinicName(${index})" id="clinicName">${clinic.name}</p>
        `;
  });
};

fetchAllClinicData();

const bookAppointmentBtn = document.getElementById("bookAppointmentBtn");

bookAppointmentBtn.addEventListener("click", async(e) => {
  e.preventDefault();
  const appointmentClinicId = document.getElementById(
    "appointment_clinic_id"
  ).value;
  const appointmentClinicName= document.getElementById("appointment_clinic").innerHTML;
  const username = document.getElementById("appointment_user").value;
  const email = document.getElementById("appointment_email").value;
  const phone = document.getElementById("appointment_phone").value;
  const age = document.getElementById("appointment_age").value;
  const date = document.getElementById("appointment_date").value;
  const gender = document.getElementById("appointment_gender").value;
  const authorisation = document.getElementById("appointment_authorisation").value;
  const insuranceRadioGroup = document.getElementsByName("appointment-insurace");
  let insurace;

  for (const radioButton of insuranceRadioGroup) {
    if (radioButton.checked) {
      insurace = radioButton.value;
      break; // Exit the loop once a selected radio button is found
    }
  }

  console.log(insurace, authorisation)

  const data = {
    age: age,
    clinic: appointmentClinicName,
    clinic_id: appointmentClinicId,
    date: date,
    email: email,
    gender: gender,
    name: username,
    phone: phone,
    insurance: insurace,
    authorisation: authorisation
  };

  const response = await fetch(`${BASE_URL}/appointment/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(response)

});
