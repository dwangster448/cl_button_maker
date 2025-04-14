const signInButton = document.querySelector('#signin');
const signInModalBg = document.querySelector('#sign-in-modal .modal-background');
const signInModal = document.querySelector('.modal#sign-in-modal');

signInButton.addEventListener('click', () => {
    signInModal.classList.add('is-active');
});

signInModalBg.addEventListener('click', () => {
    signInModal.classList.remove('is-active');
});

const reservationQueue = document.querySelector('#reservation_queue');

function renderReservation(doc) {
  const data = doc.data();

  const box = document.createElement('div');
  box.className = 'box';

  box.innerHTML = `
    <p class="title is-4">Reservation Request</p>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Start:</strong> ${data.start_date}</p>
    <p><strong>End:</strong> ${data.end_date}</p>
    <p><strong>Button Type:</strong> ${data.button_type}</p>

    <div class="buttons mt-3">
      <button class="button is-success">Accept</button>
      <button class="button is-danger">Deny</button>
    </div>
  `;

  const [acceptBtn, denyBtn] = box.querySelectorAll('button');

  acceptBtn.addEventListener('click', () => {
    db.collection('reservations').doc(doc.id).update({ status: 'accepted' });
    box.remove();
  });

  denyBtn.addEventListener('click', () => {
    db.collection('reservations').doc(doc.id).update({ status: 'denied' });
    box.remove();
  });

  reservationQueue.appendChild(box);
}

// Grabs only reservations that are only pending
function loadReservations() {
  db.collection('reservations')
    .where('status', '==', 'pending')
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        reservationQueue.innerHTML = '<p>No pending reservations.</p>';
        return;
      }
      snapshot.forEach(renderReservation);
    });
}
