const reviewCards = document.querySelectorAll('.review1, .review2, .review3');

reviewCards.forEach(card => {
    card.addEventListener('click', () => {
        const name = card.querySelector('.name').textContent;
        alert(`${name} sharhiga ovoz berdingiz!`);
    });
});
let menuList = document.getElementById("menuList")
menuList.style.maxHeight = "0px";

function toggleMenu() {
  if (menuList.style.maxHeight == "0px")
  {
    menuList.style.maxHeight = "300px";
  }
  else {
    menuList.style.maxHeight = "0px";
  }
}