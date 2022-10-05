const inputNickname = document.querySelector("#inputNickname");
const btnLogin = document.querySelector("#btnLogin");
const chatElements = document.querySelectorAll(".chat");
const chatBar = document.querySelector("#chat-screen");

chatElements.forEach((chat) => {
  chat.addEventListener("click", () => {
    chatBar.classList.toggle("active");
  });
});
