console.log(firebase);

function r_e(id) {
  return document.querySelector(`#${id}`);
}

// sign up
r_e("submit_user").addEventListener("click", () => {
  let email = r_e("email").value;
  let pass = r_e("pass").value;
  //console.log(email, pass);

  auth.createUserWithEmailAndPassword(email, pass).then((user) => {
    console.log("user");
    console.log(user.user.uid);
    db.collection("users").doc(user.user.email).set({
      admin: 0,
    });
  });
});

function make_admin(id) {
  db.collection("users").doc(id).set({
    admin: 1,
  }).then(() => all_users('edit'));
}

function make_regular_user(id){
   db.collection("users").doc(id).set({
    admin: 0,
  }).then(() => all_users('edit'));
}

function update_status(yn, admin, uid, email) {
  // console.log("update status");
  // console.log(yn, uid, email)
  r_e("logged_in_user").innerHTML = yn;
   r_e("is_user_admin").innerHTML = admin;
  r_e("current_user_id").innerHTML = uid,
  r_e("user_email").innerHTML = email;
}

r_e("login_form").addEventListener("submit", (e) => {
  // prevent page from auto refresh
  e.preventDefault();

  // get the username and password
  let email = r_e("admin_email").value;
  let password = r_e("password").value;

  // log in the admin
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {

      // configure message bar
      console.log(`Admin ${auth.currentUser.email} is now logged in`);

    })
    .catch((err) => {
      r_e("login_error").innerContent = `Invalid username or password`;

      // show the error message
      r_e("login_error").classList.remove("is-hidden");
    });
});

auth.onAuthStateChanged((user) => {
  console.log("auth change found")
  if (user) {
    console.log(user);
    // r_e("info").innerHTML = `<p>You are signed in as ${user.email} </p>`;
    // db.collection("users").doc(user.email).get().then((d) => {
      
    //   // possible admin values are 0 or 1
    //   // admin value of 1 means admin user. a value of 0 means no admin
    //   let admin = d.data().admin;

    //   if(admin == 0){
    //     // a signed-in user can only view a list of users
    //      //all_users('view');
    //      console.log("User logged")
    //   }else{
    //      // a signed-in admin user can view and edit user roles
    //      //all_users('edit');
    //      console.log("User not logged in")
    //   }

      
     
    //   //update_status(1, admin, user.uid, user.email);
      
    // })
    
    
  } else {
    // don't show user information as user isn't currently authenticated
    // all_users(0)
    // update_status(0, "", "", "");
    console.log("not user auth")
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
const adminButton = document.querySelector('#admin-login-button');
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









