let acceptCallCount = 0;

function waitForAuthInit() {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe(); // Only run once
      resolve(user);
    });
  });
}

function updateUIBasedOnUser(user) {
  const adminLoginBtn = document.getElementById("admin-login-button");
  const signOutBtn = document.getElementById("sign-out-button");
  const formContainer = document.getElementById("reservation-form-container");
  const queueContainer = document.getElementById("reservation-queue-container");
  const bookNowBtn = document.getElementById("booknow-button");

  if (user) {
    // Authenticated state
    if (adminLoginBtn) adminLoginBtn.style.display = "none";
    if (signOutBtn) signOutBtn.style.display = "inline-block";
    if (formContainer) formContainer.classList.add("is-hidden");
    if (queueContainer) queueContainer.classList.remove("is-hidden");
    if (bookNowBtn) bookNowBtn.setAttribute("href", "booknow.html");

    loadReservationQueue(); // load queue only if user is logged in
  } else {
    // Not authenticated
    if (adminLoginBtn) adminLoginBtn.style.display = "inline-block";
    if (signOutBtn) signOutBtn.style.display = "none";
    if (formContainer) formContainer.classList.remove("is-hidden");
    if (queueContainer) queueContainer.classList.add("is-hidden");
    if (bookNowBtn) bookNowBtn.setAttribute("href", "booknow.html");
  }
}

let currentUserState = null; //variable to track user auth
const bookNowBtn = document.getElementById("booknow-button");
const formContainer = document.getElementById("reservation-form-container");
const queueContainer = document.getElementById("reservation-queue-container");


// message bar
function message_bar(msg) {
  const bar = document.getElementById("message_bar");
  if (!bar) return;

  bar.innerHTML = msg;
  bar.classList.remove("is-hidden");
  bar.classList.add("has-background-success");

  setTimeout(() => {
    bar.classList.add("is-hidden");
    bar.innerHTML = "";
  }, 5000);
}
// code for the calendar

document.addEventListener("DOMContentLoaded", function () {
  const calendarContainer = document.getElementById("calendar");
  const monthYearDisplay = document.getElementById("monthYear");
  const prevButton = document.getElementById("prevMonth");
  const nextButton = document.getElementById("nextMonth");
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let currentDate = new Date();

  // Converts the string to Date
  function parseDate(str) {
    const [year, month, day] = str.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  // Formats the time to standard time
  function formatTime(timeStr) {
    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr.padStart(2, "0");
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  // Fetch documents from Calendar collection
  async function fetchReservations() {
    try {
      const snapshot = await db.collection("Calendar").get();
      const reservations = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        reservations.push({
          id: doc.id,
          startDate: parseDate(data.start_date),
          endDate: parseDate(data.end_date),
          buttonType: data.button_type,
          firstName: data.first_name,
          pickupTime: data.pickup_time,
          returnTime: data.return_time,
        });
      });
      return reservations;
    } catch (err) {
      console.error("Error fetching from Calendar collection:", err);
      return [];
    }
  }


  async function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const reservations = await fetchReservations();

    monthYearDisplay.textContent = currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarContainer.innerHTML = "";

    const daysRow = document.createElement("div");
    daysRow.classList.add("calendar-row");
    daysOfWeek.forEach((day) => {
      const dayEl = document.createElement("div");
      dayEl.textContent = day;
      daysRow.appendChild(dayEl);
    });
    calendarContainer.appendChild(daysRow);

    const grid = document.createElement("div");
    grid.classList.add("calendar-grid");

    for (let i = 0; i < firstDay; i++) {
      const blank = document.createElement("div");
      blank.classList.add("calendar-day", "empty");
      grid.appendChild(blank);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement("div");
      dayEl.classList.add("calendar-day");

      const thisDate = new Date(year, month, day);
      const barContainer = document.createElement("div");
      barContainer.classList.add("bar-container");

      // Always show the day number at the top
      const dayNumber = document.createElement("div");
      dayNumber.classList.add("day-number");
      dayNumber.textContent = day;
      dayEl.appendChild(dayNumber);

      // Loop through each reservation
      reservations.forEach((res) => {
        const start = res.startDate;
        const end = res.endDate;

        if (thisDate >= start && thisDate <= end) {
          const label = `${formatTime(res.pickupTime)} - ${res.buttonType} (${res.firstName
            }); return @ ${formatTime(res.returnTime)}`;

          const bar = document.createElement("div");

          // Seting the level and label
          if (res.buttonType === '1"') {
            bar.classList.add("bar-start", "bar-1inch");
          } else if (res.buttonType === '2.25"') {
            bar.classList.add("bar-start", "bar-2_25inch");
          }

          // Positioning
          if (thisDate.toDateString() === start.toDateString()) {
            bar.setAttribute("data-label", label);
            bar.setAttribute("data-reservation", JSON.stringify(res));
          } else if (thisDate.toDateString() === end.toDateString()) {
            bar.classList.remove("bar-start");
            bar.classList.add("bar-end");
          } else {
            bar.classList.remove("bar-start");
            bar.classList.add("bar-middle");
          }

          // Make it clickable to trigger modal
          bar.classList.add("clickable-bar");
          bar.addEventListener("click", () => openReservationModal(res)); //

          barContainer.appendChild(bar);
        }
      });

      // Append all bars for that day
      dayEl.appendChild(barContainer);
      grid.appendChild(dayEl);
    }

    calendarContainer.appendChild(grid);
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
  }

  renderCalendar();
});

async function fetchReservations() {
  try {
    const snap = await db.collection("Reservation").get();
    return snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        name: d.name,
        email: d.email,
        phoneNumber: d.phoneNumber,
        buttonSize: d.buttonSize,
        pickupDate: d.pickupDate,
        pickupTime: d.pickupTime,
        returnDate: d.returnDate,
        returnTime: d.returnTime,
        additionalNotes: d.additionalNotes || "",
      };
    });
  } catch (e) {
    console.error("Error loading reservations:", e);
    return [];
  }
}

let currentPage = 1;
const pageSize = 4;

async function queueClickHandler(e) {
  const btn = e.target.closest("button[data-id]");
  if (!btn) return;


  const { id, action } = btn.dataset;
  const reservationRef = db.collection("Reservation").doc(id);
  const snap = await reservationRef.get();
  const data = snap.data();

  //     if (!data) return;
  if (action === "accept") {
    const payload = {
      button_type: data.buttonSize,
      start_date: data.pickupDate,
      end_date: data.returnDate,
      first_name: data.name,
      pickup_time: data.pickupTime,
      return_time: data.returnTime,
    };

    acceptCallCount++;

    const calRef = await db.collection("Calendar").add(payload);

    await db.collection("acceptedReservation").add({
      ...payload,
      calendarId: calRef.id,
      acceptedAt: new Date().toISOString(),
      phoneNumber: data.phoneNumber,
      email: data.email,
    });

    message_bar("Reservation accepted.");
  } else if (action === "deny") {
    message_bar("Reservation denied.");
  }

  await reservationRef.delete();

  setTimeout(() => {
    location.reload();
  }, 1550);
}



// 2) Purely DOM construction: fetches then paginates then renders
async function loadReservationQueue() {
  const reservations = await fetchReservations(); 

  // pagination math
  const totalPages = Math.max(1, Math.ceil(reservations.length / pageSize));
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = reservations.slice(startIdx, startIdx + pageSize);

  // grab & clear
  const wrapper = document.getElementById("reservation-queue-container");
  const queue = document.getElementById("reservation_queue");
  queue.addEventListener("click", queueClickHandler);

  wrapper.classList.remove("is-hidden");
  queue.innerHTML = "";
  const oldPager = document.getElementById("queue-pagination");
  if (oldPager) oldPager.remove();

  // render boxes
  pageItems.forEach((res) => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `
      <p class="title is-4">Reservation Request</p>
      <p><strong>Name:</strong> ${res.name}</p>
      <p><strong>Phone:</strong> ${res.phoneNumber}</p>
      <p><strong>Email:</strong> ${res.email}</p>
      <p><strong>Button Size:</strong> ${res.buttonSize}"</p>
      <p><strong>Pickup:</strong> ${new Date(res.pickupDate).toLocaleDateString(
      "en-US",
      { month: "long", day: "numeric", year: "numeric" }
    )} @ ${res.pickupTime}</p>
      <p><strong>Return:</strong> ${new Date(res.returnDate).toLocaleDateString(
      "en-US",
      { month: "long", day: "numeric", year: "numeric" }
    )} @ ${res.returnTime}</p>
      <p><strong>Comments:</strong> ${res.additionalNotes || "None"}</p>
      <div class="buttons mt-3">
        <button class="button is-success" data-id="${res.id
      }" data-action="accept">Accept</button>
        <button class="button is-danger"  data-id="${res.id
      }" data-action="deny">Deny</button>
      </div>
    `;
    queue.appendChild(box);
  });

  // render pager
  const pager = document.createElement("div");
  pager.id = "queue-pagination";
  pager.classList.add("buttons", "are-small", "mt-4", "is-centered");

  const prevBtn = document.createElement("button");
  prevBtn.classList.add("button");
  prevBtn.textContent = "← Prev";
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener("click", () => {
    currentPage--;
    loadReservationQueue();
  });

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("button");
  nextBtn.textContent = "Next →";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener("click", () => {
    currentPage++;
    loadReservationQueue();
  });

  const info = document.createElement("span");
  info.textContent = `Page ${currentPage} of ${totalPages}`;

  pager.append(prevBtn, info, nextBtn);
  queue.parentNode.appendChild(pager);
}


function disclaimer(reservation_data = False) {
  // popup modal that provides user information, reservation dates, and disclaimer notes
}

function submit_reservation(user_information) {

  let collection = "reservation_collection";

  return true; 
}

function available_dates(start = false, end = false) {
  // if any of the requested dates are not avaialble, return false

  if ((start || end) == false) {
    //Missing dates needed to confirm availability
    return false;
  }

  let overlapped_dates = true; 
  if (overlapped_dates) {
    // if true = requested dates not available
    return false;
  }
}

function confirmation() {

  // confirmation pop-up

  if (available_dates(startDate, endDate)) {
    // if True = date(s) not available
    return;
  }


  let reservation_data = {
    //JSON to store user data to add onto firebase
    firstName: first_name,
    lastName: last_name,
    email: user_email,
    phoneNumber: user_phone_number,
    startDate: startDate,
    endDate: endDate,
  };



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
      r_e("reservation-queue-container").classList.remove("is-hidden");
      r_e("admin-dashboard-title").classList.remove("is-hidden");
      r_e("reservation-form-container").classList.add("is-hidden");
      r_e("reservation-page-title").classList.add("is-hidden");

      // configure message bar

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
  const adminLoginBtn = document.getElementById("admin-login-button");
  const adminModal = document.getElementById("admin_modal");
  const adminModalBg = document.getElementById("admin_modalbg");
  const loginForm = document.getElementById("login_form");
  const loginError = document.getElementById("login_error");
  const signOutBtn = document.getElementById("sign-out-button");
  const formContainer = document.getElementById("reservation-form-container");
  const queueContainer = document.getElementById("reservation-queue-container");
  const bookNowBtn = document.getElementById("booknow-button");

  const user = await waitForAuthInit(); // waits for initial auth state
  updateUIBasedOnUser(user); // sets initial UI

  auth.onAuthStateChanged(updateUIBasedOnUser);

  if (adminLoginBtn && adminModal) {
    adminLoginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      adminModal.classList.add("is-active");
    });
  }
  if (adminModalBg) {
    adminModalBg.addEventListener("click", () => {
      adminModal.classList.remove("is-active");
    });
  }

  // 2) Login form submit
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("admin_email").value;
      const password = document.getElementById("password").value;
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          loginError.classList.add("is-hidden");
          loginForm.reset();
          adminModal.classList.remove("is-active");
        })
        .catch((err) => {
          loginError.textContent = err.message;
          loginError.classList.remove("is-hidden");
        });
    });
  }

  // 3) Sign out
  if (signOutBtn) {
    signOutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      auth.signOut();
    });
  }
});

r_e("login_form").addEventListener("submit", (e) => {

  e.preventDefault();

  // Get the username and password from the login form

  let email = r_e("admin_email").value;

  let password = r_e("password").value;

  // Log in the admin/user

  auth

    .signInWithEmailAndPassword(email, password)

    .then(() => {

      // Hide the login modal once the user is logged in

      r_e("admin_modal").classList.remove("is-active");
    })

    .catch((err) => {
      r_e("login_error").innerHTML = `Invalid username or password`;

      r_e("login_error").classList.remove("is-hidden");

      console.error(err);
    });
});


//  form submission and adding to collection
document.addEventListener("DOMContentLoaded", () => {
  r_e("review").addEventListener("submit", (e) => {
    e.preventDefault();

    const reservation = {
      name: r_e("res_name").value,
      email: r_e("res_email").value,
      buttonSize:
        document.querySelector('input[name="button-size"]:checked').value + '"',
      pickupDate: r_e("pickup_date").value,
      pickupTime: r_e("pickup_time").value,
      returnDate: r_e("return_date").value,
      returnTime: r_e("return_time").value,
      phoneNumber: r_e("res_phone").value,
      additionalNotes: r_e("additional_notes").value,
    };

    db.collection("Reservation")
      .add(reservation)
      .then(() => {
        r_e("review").reset();
        message_bar("Reservation submitted.");
      })
      .catch((err) => {
        message_bar("Error submitting reservation:", err);
      });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.getElementById(burger.dataset.target);

  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
});

firebase.auth().onAuthStateChanged((user) => {
  const bookButton = document.getElementById("booknow-button");

  if (bookButton) {
    if (user) {
      // User is signed in
      bookButton.textContent = "Reservations";
    } else {
      // User is signed out
      bookButton.textContent = "Book Now";
    }
  }
});

// Modal for reservation details

let currentReservationDocId = null;

async function openReservationModal(res) {
  const modal = document.getElementById("reservationModal");
  const content = document.getElementById("modal-content-body");
  const deleteBtn = document.getElementById("deleteReservationBtn");

  currentReservationDocId = res.id || null;

  content.innerHTML = `
    <p><strong>Name:</strong> ${res.firstName || "N/A"}</p>
    <p><strong>Start:</strong> ${formatDate(res.startDate)}</p>
    <p><strong>Pickup:</strong> ${formatTime(res.pickupTime)}</p>
    <p><strong>End:</strong> ${formatDate(res.endDate)}</p>
    <p><strong>Return:</strong> ${formatTime(res.returnTime)}</p>
    <p><strong>Button Type:</strong> ${res.buttonType}</p>
  `;

  if (auth.currentUser) {
    deleteBtn.classList.remove("is-hidden");
  } else {
    deleteBtn.classList.add("is-hidden");
  }

  if (auth.currentUser) {
    try {
      const snap = await db
        .collection("acceptedReservation")
        .where("calendarId", "==", currentReservationDocId)
        .limit(1)
        .get();

      if (!snap.empty) {
        selectedReservation = snap.docs[0].data();

        calendarEmail =  selectedReservation.email;
        calendarNumber = selectedReservation.phoneNumber;

        const contactHtml = `
          <p><strong>Email:</strong> ${calendarEmail}</p>
          <p><strong>Phone Number:</strong> ${calendarNumber}</p>
        `;
        content.innerHTML += contactHtml;
      }

    } catch (err) {
      console.error("Could not load contact info:", err);
    }
  }


  modal.classList.add("is-active");
}

function closeReservationModal() {
  document.getElementById("reservationModal").classList.remove("is-active");
}

// Utility formatting helpers
function formatDate(dateObj) {
  return new Date(dateObj).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timeStr) {
  const [hourStr, minuteStr] = timeStr.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minuteStr.padStart(2, "0");
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

document
  .getElementById("deleteReservationBtn")
  .addEventListener("click", async () => {
    if (!currentReservationDocId) return;

    try {
      await db.collection("Calendar").doc(currentReservationDocId).delete();
      closeReservationModal();
      message_bar("Reservation deleted.");
      setTimeout(() => {
        location.reload(); // refreshes the whole page
      }, 1500);
    } catch (err) {
      console.error("Error deleting reservation:", err);
    }
  });
