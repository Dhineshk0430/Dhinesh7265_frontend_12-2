const heading = document.getElementById("title");
const button = document.getElementById("btn");

heading.style.color = "black";

button.addEventListener("click", () => {
    heading.style.color = "red";
    heading.style.fontSize = "30px";
});