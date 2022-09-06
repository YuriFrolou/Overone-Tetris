const blockKey = document.querySelector('.box-key');
const blockWhich = document.querySelector('.box-which');
const blockCode = document.querySelector('.box-code');

document.addEventListener('keydown', (event) => {
    if (event.repeat) {
        return
    } else {
        blockKey.innerHTML = event.key;
        blockWhich.innerHTML = event.which;
        blockCode.innerHTML = event.code;
    }
});