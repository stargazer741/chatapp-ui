const inputNickname = document.querySelector("#inputNickname");
const btnLogin = document.querySelector("#btnLogin");
const chatElements = document.querySelectorAll(".chat");
const chatBar = document.querySelector("#chat-screen");
const messages = document.getElementById("messages");

chatElements.forEach((chat) => {
  chat.addEventListener("click", () => {
    chatBar.classList.toggle("active");
  });
});

const socket = new WebSocket("ws://localhost:3000");
const messageInput = document.getElementById("messageInput");

socket.addEventListener("open", chat);

function addMessage(value, right = true) {
  const date = new Date();
  messages.innerHTML += `
  <tr>
    <td>
      <div class="msg ${right ? "right" : "left"}">
        <span id="sender-name">Test</span>
        <p class="msg-text">
          ${value}
        </p>
        <span id="box-message-time">${date.getHours()}:${date.getMinutes()}</span>
      </div>
    </td>
  </tr>
  `;
}

function chat() {
  const nickNames = ["onur", "alperen", "baran", "ali", "veli", "acun"];
  const send = JSON.stringify({
    command: "username",
    value: nickNames[parseInt(nickNames.length * Math.random())],
  });

  console.log(send);

  socket.send(send);

  messageInput.addEventListener("keyup", (ev) => {
    if (ev.code != "Enter" || messageInput.value.length == 0) {
      return;
    }

    let data = {
      command: "message",
      value: messageInput.value,
    };

    socket.send(JSON.stringify(data));

    addMessage(messageInput.value);

    messageInput.value = "";
  });
}

socket.addEventListener("message", (msg) => {
  const data = JSON.parse(msg.data);

  switch (data.command) {
    case "message":
      addMessage(data.value, false);
      break;
  }

  console.log(data);
});
