console.log(firebase);

function waitForAuthInit() {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe(); // Only run once
      resolve(user);
    });
  });
}

function updateUIBasedOnUser(user) {
  const adminLoginBtn   = document.getElementById('admin-login-button');
  const signOutBtn      = document.getElementById('sign-out-button');
  const formContainer   = document.getElementById('reservation-form-container');
  const queueContainer  = document.getElementById('reservation-queue-container');
  const bookNowBtn      = document.getElementById('booknow-button');

  if (user) {
    // Authenticated state
    console.log("✅ User logged in:", user.email);
    if (adminLoginBtn)   adminLoginBtn.style.display = 'none';
    if (signOutBtn)      signOutBtn.style.display = 'inline-block';
    if (formContainer)   formContainer.classList.add('is-hidden');
    if (queueContainer)  queueContainer.classList.remove('is-hidden');
    if (bookNowBtn)      bookNowBtn.setAttribute('href', 'booknow.html');
  } else {
    // Not authenticated
    console.log("🚫 No user logged in");
    if (adminLoginBtn)   adminLoginBtn.style.display = 'inline-block';
    if (signOutBtn)      signOutBtn.style.display = 'none';
    if (formContainer)   formContainer.classList.remove('is-hidden');
    if (queueContainer)  queueContainer.classList.add('is-hidden');
    if (bookNowBtn)      bookNowBtn.setAttribute('href', 'booknow.html');
  }
}


let currentUserState = null; //variable to track user auth
const bookNowBtn = document.getElementById('booknow-button');
const formContainer = document.getElementById('reservation-form-container');
const queueContainer = document.getElementById('reservation-queue-container');

// auth.onAuthStateChanged(user => {
//   const adminBtn = document.getElementById('admin-login-button');
//   const signOutBtn = document.getElementById('sign-out-button');
//   const formDiv = document.getElementById('reservation-form-container');
//   const queueDiv = document.getElementById('reservation-queue-container');
//   const bookNowBtn = document.getElementById('booknow-button');

//   if (user) {
//     console.log("logged in")
//     // Admin is signed in
//     if (adminBtn) adminBtn.style.display = 'none';
//     if (signOutBtn) signOutBtn.style.display = 'inline-block';
//     if (formDiv) formDiv.classList.add('is-hidden');
//     if (queueDiv) queueDiv.classList.remove('is-hidden');
//     if (bookNowBtn) bookNowBtn.href = 'admin.html';
//     // load your reservations
//     if (typeof loadReservations === 'function') loadReservations();
//   } else {
//     console.log("logged out")
//     // No admin signed in
//     if (adminBtn) adminBtn.style.display = 'inline-block';
//     if (signOutBtn) signOutBtn.style.display = 'none';
//     if (formDiv) formDiv.classList.remove('is-hidden');
//     if (queueDiv) queueDiv.classList.add('is-hidden');
//     if (bookNowBtn) bookNowBtn.href = 'booknow.html';
//   }
// });

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

document.addEventListener("DOMContentLoaded", async () => {

  // Get references to the buttons by their unique IDs
  const adminLoginBtn = document.getElementById('admin-login-button');
  const adminModal = document.getElementById('admin_modal');
  const adminModalBg = document.getElementById('admin_modalbg');
  const loginForm = document.getElementById('login_form');
  const loginError = document.getElementById('login_error');
  const signOutBtn = document.getElementById('sign-out-button');
  const formContainer = document.getElementById('reservation-form-container');
  const queueContainer = document.getElementById('reservation-queue-container');
  const bookNowBtn = document.getElementById('booknow-button');

  const user = await waitForAuthInit();     // waits for initial auth state
  updateUIBasedOnUser(user);                // sets initial UI

  auth.onAuthStateChanged(updateUIBasedOnUser);

  if (adminLoginBtn && adminModal) {
    adminLoginBtn.addEventListener('click', e => {
      e.preventDefault();
      adminModal.classList.add('is-active');
    });
  }
  if (adminModalBg) {
    adminModalBg.addEventListener('click', () => {
      adminModal.classList.remove('is-active');
    });
  }

  // 2) Login form submit
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('admin_email').value;
      const password = document.getElementById('password').value;
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          loginError.classList.add('is-hidden');
          loginForm.reset();
          adminModal.classList.remove('is-active');
        })
        .catch(err => {
          loginError.textContent = err.message;
          loginError.classList.remove('is-hidden');
        });
    });
  }

  // 3) Sign out
  if (signOutBtn) {
    signOutBtn.addEventListener('click', e => {
      e.preventDefault();
      auth.signOut();
    });
  }



  // Attach sign out event to the sign out button

  // signOutButton.addEventListener("click", (e) => {

  //   e.preventDefault();

  //   auth.signOut()

  //     .then(() => {

  //       console.log("User signed out successfully.");

  //       // Optionally, you can update UI elements or redirect the user after sign out.

  //     })

  //     .catch((error) => {

  //       console.error("Error during sign out:", error);

  //     });

  // });

  // (Optional) Additional code handling other UI elements or interactions can go here.
  // When the Admin Login button is clicked, show the login modal.

});


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


