//console.log(firebase);

let currentUserState = null;

function r_e(id) {
  return document.querySelector(`#${id}`);
}

// Removed the sign-up functionality since users are created manually in Firebase

// Login functionality
// r_e("login_form").addEventListener("submit", (e) => {
//   // Prevent page from auto refreshing
//   e.preventDefault();

//   // Get the username and password from the login form
//   let email = r_e("admin_email").value;
//   let password = r_e("password").value;

//   // Log in the admin/user
//   auth
//     .signInWithEmailAndPassword(email, password)
//     .then(() => {
//       // On successful login, the onAuthStateChanged callback will also log the user info.
//       console.log(`User ${auth.currentUser.email} is now logged in`);
//     })
//     .catch((err) => {
//       // Fix: Use innerHTML instead of innerContent
//       r_e("login_error").innerHTML = `Invalid username or password`;
//       // Show the error message
//       r_e("login_error").classList.remove("is-hidden");
//       console.error(err);
//     });
// });

r_e("login_form").addEventListener("submit", (e) => {
  // Prevent page auto-refresh
  e.preventDefault();

  // Get the username and password from the login form
  let email = r_e("admin_email").value;
  let password = r_e("password").value;

  // Log in the admin/user
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log(`User ${auth.currentUser.email} is now logged in`);
      // Hide the login modal once the user is logged in
      r_e("admin_modal").classList.remove("is-active");
    })
    .catch((err) => {
      r_e("login_error").innerHTML = `Invalid username or password`;
      r_e("login_error").classList.remove("is-hidden");
      console.error(err);
    });
});


// Listen for authentication status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUserState = user; // or use auth.currentUser to directly access auth
    // Log successful authentication and show user details on console
    console.log("onAuthStateChanged: User logged in:", user.email);
  } else {
    console.log("onAuthStateChanged: No user logged in");
  }
});

// Calendar code
document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar");
  const monthYearDisplay = document.getElementById("monthYear");
  const prevButton = document.getElementById("prevMonth");
  const nextButton = document.getElementById("nextMonth");
  const reserveButton = document.getElementById("reserveButton");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDate = new Date();
  let selectedDays = [];

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

    // Create headers
    const daysRow = document.createElement("div");
    daysRow.classList.add("calendar-row");
    daysOfWeek.forEach((day) => {
      const dayHeader = createElement("div", "calendar-day day-header", day);
      daysRow.appendChild(dayHeader);
    });
    calendarContainer.appendChild(daysRow);

    // Create calendar grid
    const daysGrid = document.createElement("div");
    daysGrid.classList.add("calendar-grid");

    for (let i = 0; i < firstDay; i++) {
      daysGrid.appendChild(createElement("div", "calendar-day empty", ""));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let dayElement = createElement("div", "calendar-day", day);
      dayElement.addEventListener("click", () =>
        handleDayClick(day, dayElement)
      );
      daysGrid.appendChild(dayElement);
    }

    calendarContainer.appendChild(daysGrid);
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function handleDayClick(day, element) {
    if (selectedDays.length === 3) {
      selectedDays = [];
      clearSelection();
    }

    if (selectedDays.length === 0 || isConsecutive(day)) {
      selectedDays.push(day);
      element.classList.add("selected");
    } else {
      selectedDays = [day];
      clearSelection();
      element.classList.add("selected");
    }
  }

  function isConsecutive(day) {
    return (
      selectedDays.length === 0 ||
      day === selectedDays[selectedDays.length - 1] + 1
    );
  }

  function clearSelection() {
    document
      .querySelectorAll(".selected")
      .forEach((el) => el.classList.remove("selected"));
  }

  prevButton.addEventListener("click", () => changeMonth(-1));
  nextButton.addEventListener("click", () => changeMonth(1));

  function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    selectedDays = [];
    renderCalendar();
  }

  renderCalendar();
});

// Java Script Page
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { getDatabase, ref, push, set } from "firebase/database";


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
const adminButton = document.querySelector('#admin-login-button');

document.addEventListener("DOMContentLoaded", () => {
  // Get references to the buttons by their unique IDs
  const adminLoginButton = r_e("admin-login-button");
  const signOutButton = r_e("sign-out-button");

  // Listen for auth state changes
  auth.onAuthStateChanged((user) => {
    if (user) {
      // When the user is authenticated, show the sign out button and hide admin login.
      signOutButton.style.display = "inline-block";
      adminLoginButton.style.display = "none";
    } else {
      // When no user is authenticated, hide the sign out button and show admin login.
      signOutButton.style.display = "none";
      adminLoginButton.style.display = "inline-block";
    }
  });

  // Attach sign out event to the sign out button
  signOutButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut()
      .then(() => {
        console.log("User signed out successfully.");
        // Optionally, you can update UI elements or redirect the user after sign out.
      })
      .catch((error) => {
        console.error("Error during sign out:", error);
      });
  });

  // (Optional) Additional code handling other UI elements or interactions can go here.
  // When the Admin Login button is clicked, show the login modal.
  r_e("admin-login-button").addEventListener("click", () => {
    r_e("admin_modal").classList.add("is-active");
  });

  // When the modal background is clicked, hide the modal.
  r_e("admin_modalbg").addEventListener("click", () => {
    r_e("admin_modal").classList.remove("is-active");
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   function r_e(id) {
//     return document.querySelector(`#${id}`);
//   }

//   r_e("admin-login-button").addEventListener("click", () => {
//     r_e("admin_modal").classList.add("is-active");
//   });

//   r_e("admin_modalbg").addEventListener("click", () => {
//     r_e("admin_modal").classList.remove("is-active");
//   });
// });

// admin login