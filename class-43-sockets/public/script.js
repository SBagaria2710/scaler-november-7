const socket = io();

socket.on("message", (data) => {
    const { id, value } = data;
    console.log(id + ": " + value);
});

const btn = document.getElementById("sendCta");
const input = document.getElementById("eventMessage");

btn.addEventListener("click", () => {
    const value = input.value;
    socket.emit("message", { id: socket.id, value});
    input.value = "";
});