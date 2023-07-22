

const stars = document.querySelectorAll("#stars i");

stars.forEach((star, index1) => {
  star.addEventListener("click", () => {
    stars.forEach((star, index2) => {
      if (index1 >= index2) {
        star.classList.add("fa-star");
        star.classList.remove("fa-star-o");
      } else {
        star.classList.add("fa-star-o");
        star.classList.remove("fa-star");
      }
    });
  });
});