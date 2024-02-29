import { BASE_URL } from "../utils/applicationConstants.js";
import { setAlertAction } from "../functions/setAlertAction.js";
import { toFindDayOfWeek } from "../utils/functions/dateFormatter.js";

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

const getWorkingDaysOfClinic = async (clinicId) => {
  const response = await fetch(`${BASE_URL}/day/clinic/{clinic_id}?id=${clinicId}`);
  const data = await response.json();
  const clinicDays = data.data;
  let workingDays = [];
  clinicDays.forEach((clinicDay) => {
    workingDays.push(clinicDay.day);
  });
  return workingDays;
};

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
  const response = await fetch(`${BASE_URL}/clinic/`);
  const data = await response.json();
  document.getElementById("appointment_clinic").innerHTML =
    data.data[index].name;
  document.getElementById("appointment_clinic_id").value = data.data[index].id;

  const clinicDays = await getWorkingDaysOfClinic(data.data[index].id);

  let workingDays = "Working Days : ";
  clinicDays.forEach((clinicDay, index) => {
    if (index !== clinicDays.length - 1) {
      workingDays += `${clinicDay}, `;
    } else{
      workingDays += `${clinicDay}`;
    }
  });

  document.getElementById("appointmentClinicWorkingDaysPara").innerHTML = workingDays;
  document.getElementById("bookAppointmentClinicWebsite").href = data.data[index].link;
  document.getElementById("WorkingDaysAndAppointmentLink").style.display = "flex";
};

const fetchAllClinicData = async () => {
  const response = await fetch(`${BASE_URL}/clinic/`);
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
  } else if (phone.value?.length > 11) {
    isValid = false;
    setAlertAction("Please enter valid phone number", "danger");
  } else if (phone.value?.includes(" ")) {
    isValid = false;
    setAlertAction("Please enter valid phone number", "danger");
  } else if (insurace === "YES" && authorisation.value === "") {
    isValid = false;
    setAlertAction("Please enter insurance number", "danger");
  } else if (age.value === "" || age.value === null) {
    isValid = false;
    setAlertAction("Please enter your age", "danger");
  } else if (date.value === "" || date.value === null) {
    isValid = false;
    setAlertAction("Please select date", "danger");
  } else if(date.value){
    const dayofWeek = toFindDayOfWeek(date.value);
    const clinicWorkingDay = document.getElementById("appointmentClinicWorkingDaysPara").innerHTML;
    if(!clinicWorkingDay.includes(dayofWeek)) {
      isValid = false;
      setAlertAction("Clinic is not availbale on this date ", "danger");
    }
  }
  else if (gender.value === "Gender") {
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
        if(radioButton.value === "YES") {
          insurace = true;
        }else if (radioButton.value === "NO") {
          insurace = false;
        }
        break; // Exit the loop once a selected radio button is found
      }
    }

    const data = {
      age: age.value,
      clinic: appointmentClinicName.innerHTML,
      clinic_id: appointmentClinicId.value,
      date: date.value,
      email: email.value,
      gender: gender.value,
      name: username.value,
      phone: "+44"+phone.value,
      insurance: insurace,
      authorisation: authorisation.value,
    };

    // console.log(data)

    const response = await fetch(`${BASE_URL}/appointment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response)
    if( response.status === 200) {
      setAlertAction("Appointment requested successfully", "success");
      document.getElementById("appointmentClinicWorkingDaysPara").innerHTML = "";
      appointmentClinicName.innerHTML = "Choose a clinic";  
      appointmentClinicId.value = "";
      username.value = "";
      email.value = "";
      phone.value = "";
      age.value = "";
      date.value = "";
      authorisation.value = "";
    }
  }
});
