let badi = document.getElementsByClassName("badi")[0];
let all_modals = document.getElementsByClassName("all_modals");

function open_modal(elem) {
    for (let i = 0; i < all_modals.length; i++) {
        all_modals[i].style.display = "none";
    }
    modal_now = document.querySelectorAll(
        `div#${elem.dataset.target}.all_modals`
    )[0];
    modal_now.style.display = "flex";
    badi.style.overflow = "hidden";
}

function close_modal(elem) {
    modal_now = document.querySelectorAll(
        `div#${elem.dataset.target}.all_modals`
    )[0];
    modal_now.style.display = "none";
    badi.style.overflow = "visible";
}

document.addEventListener("click", function (evt) {
    // Закрытие модалок на 500
    for (let i = 0; i < all_modals.length; i++) {
        if (evt.target === all_modals[i]) {
            all_modals[i].style.display = "none";
            badi.style.overflow = "visible";
        }
    }
});

// accordion

let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        this.children[1].classList.toggle("rotated");
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            setTimeout(() => panel.classList.remove("mt-3"), 200);
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            panel.classList.add("mt-3");
        }
    });
}
