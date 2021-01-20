const url = window.location.pathname;

const menuItems = document.querySelectorAll('header .content a');

for(item of menuItems) {
    if (url.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}