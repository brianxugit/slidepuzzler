function openPopup(id) {
    document.getElementById(id).classList.add('open');
    document.body.classList.add('popup-open');
}

function closePopup() {
    document.querySelector('.popup.open').classList.remove('open');
    document.body.classList.remove('popup-open');
}

window.addEventListener('load', function() {
    document.addEventListener('click', event => {
        if (event.target.classList.contains('popup')) {
            closePopup();
        }
    })
});