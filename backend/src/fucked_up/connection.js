const profiles = fetch("profiles.json");
const id = profiles[0].id;
const firstName = profiles[0].firstName;
document.getElementById("displayProfile").value = id + " " + firstName;

document.getElementById("connect").addEventListener("click", function() {
    event.preventDefault();
window.location.href = "main.html";
})