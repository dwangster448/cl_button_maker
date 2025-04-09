const signInButton = document.querySelector('#signin');
const signInModalBg = document.querySelector('#sign-in-modal .modal-background');
const signInModal = document.querySelector('.modal#sign-in-modal');

signInButton.addEventListener('click', () => {
    signInModal.classList.add('is-active');
});

signInModalBg.addEventListener('click', () => {
    signInModal.classList.remove('is-active');
});