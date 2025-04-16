console.log(firebase);

// code for the calendar

document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar");
  const monthYearDisplay = document.getElementById("monthYear");
  const prevButton = document.getElementById("prevMonth");
  const nextButton = document.getElementById("nextMonth");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let currentDate = new Date();
  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYearDisplay.textContent = currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarContainer.innerHTML = "";

    // Header row with weekdays
    const daysRow = document.createElement("div");
    daysRow.classList.add("calendar-row");
    daysOfWeek.forEach((day) => {
      const dayEl = document.createElement("div");
      dayEl.textContent = day;
      daysRow.appendChild(dayEl);
    });
    calendarContainer.appendChild(daysRow);

    // Day grid
    const grid = document.createElement("div");
    grid.classList.add("calendar-grid");

    // Blank cells
    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement("div");
      blank.classList.add("calendar-day", "empty");
      grid.appendChild(blank);
    }

    // Calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement("div");
      dayEl.classList.add("calendar-day");

      // Manual input of a reservation bar
      // Make it logistical
      // Make it apply to months and days
      if (day === 15) {
        dayEl.classList.add("bar-start");
        dayEl.setAttribute(
          "data-label",
          "11am pickup - 2¼ inch (Josiah) - return @5pm"
        );
      } else if (day === 16) {
        dayEl.classList.add("bar-middle");
      } else if (day === 17) {
        dayEl.classList.add("bar-end");
      }

      dayEl.innerHTML = `<div class="day-number">${day}</div>`;
      grid.appendChild(dayEl);
    }

    calendarContainer.appendChild(grid);
  }

  prevButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  renderCalendar();
});

// Java Script Page
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { getDatabase, ref, push, set } from "firebase/database";

// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID",
//     measurementId: "YOUR_MEASUREMENT_ID"
// };

// const auth = getAuth(app);
// const db = getFirestore(app);

let first_name = "Daniel";
let last_name = "Wang";

let user_email = "example@gmail.com";
let user_phone_number = "2624120000";

let startDate = "06/01/2026"; // current date of reservation
let endDate = "06/04/2026"; // end date that will be adjusted in reservation

let available = true;

function disclaimer(reservation_data = False) {
  // popup modal that provides user information, reservation dates, and disclaimer notes
  console.log("Disclaimer", reservation_data);
}

function submit_reservation(user_information) {
  console.log("submit function");

  let collection = "reservation_collection";

  return true; //TODO Placeholder to prevent return errors

  // add user information passed onto firebase

  // const db = getDatabase(); //TODO firebase push implementation
  // const dataRef = ref(db, 'your-data-path'); // Replace 'your-data-path'

  // try {
  //     // Add a new document with a generated ID
  //     const docRef = await addDoc(collection(db, {collection}), user_information);
  //     console.log("Document written with ID: ", docRef.id);
  //     return true;
  // } catch(error) {
  //   console.error("Error pushing data: ", error);
  //   return False;
  // };
}

function available_dates(start = false, end = false) {
  console.log("availla");
  // if any of the requested dates are not avaialble, return false

  if ((start || end) == false) {
    //Missing dates needed to confirm availability
    return false;
  }

  let overlapped_dates = true; //TODO add functionality to check overlapping dates
  if (overlapped_dates) {
    // if true = requested dates not available
    return false;
  }
}

function confirmation() {
  console.log("confirmation detected");

  // confirmation pop-up

  if (available_dates(startDate, endDate)) {
    // if True = date(s) not available
    console.log("Overlap dates detected");
    return;
  }

  console.log("herer");

  let reservation_data = {
    //JSON to store user data to add onto firebase
    firstName: first_name,
    lastName: last_name,
    email: user_email,
    phoneNumber: user_phone_number,
    startDate: startDate,
    endDate: endDate,
  };

  console.log("----");

  if (available) {
    try {
      // submit reservation
      let submitation_result = submit_reservation(reservation_data);
      if (submitation_result) {
        // add disclaimers via disclaimer function
        disclaimer(reservation_data);
      } else {
        return;
      }
    } catch (error) {
      console.error("ERROR:", error.message);
      return;
    }
  }
}

// Admin Login Modal
const adminButton = document.querySelector("#admin-login-button");
document.addEventListener("DOMContentLoaded", () => {
  function r_e(id) {
    return document.querySelector(`#${id}`);
  }

  r_e("admin-login-button").addEventListener("click", () => {
    r_e("admin_modal").classList.add("is-active");
  });

  r_e("admin_modalbg").addEventListener("click", () => {
    r_e("admin_modal").classList.remove("is-active");
  });
});

// admin login

function r_e(id) {
  return document.querySelector(`#${id}`);
}

r_e("login_form").addEventListener("submit", (e) => {
  // prevent page from auto refresh
  e.preventDefault();

  // get the username and password
  let email = r_e("email_").value;
  let password = r_e("password_").value;

  // log in the admin
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      // show admin dashboard
      r_e("admin_dashboard").classList.remove("is-hidden");
      r_e("reserve_form").classList.add("is-hidden");

      // configure message bar
      console.log(`Admin ${auth.currentUser.email} is now logged in`);

      // reset the form
      r_e("login_form").reset();

      // close the modal
      r_e("admin_modal").classList.remove("is-active");
    })
    .catch((err) => {
      r_e("signinerror").innerHTML = `Invalid username or password`;
      // show the error message
      r_e("signinerror").classList.remove("is-hidden");
    });
});
