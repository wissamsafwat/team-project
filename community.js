document.addEventListener("DOMContentLoaded", function() {
    loadMessages();

    const sendBtn = document.getElementById("send_btn");
    const textInput = document.getElementById("text");
    // send by the send button
    if (sendBtn) {
        sendBtn.addEventListener("click", sendMessage);
    }

    // send by enter 
    if (textInput) {
        textInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
});

function sendMessage() {
    const textInput = document.getElementById("text");
    const messageText = textInput.value.trim();

    // Don't send empty messages
    if (messageText === "") {
        return; 
    }

    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    const user = localStorage.getItem("currentUser") || "guest";

    // Add the new message object
    messages.push({
        sender: user,
        text: messageText,
        // Adding time stamp
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    });

    // Save to local storage
    localStorage.setItem("chatMessages", JSON.stringify(messages));

    // Clear the input box
    textInput.value = "";

    // Redraw the chat screen
    loadMessages();
}

function loadMessages() {
    const msgArea = document.getElementById("msg_area");
    let messages = JSON.parse(localStorage.getItem("chatMessages")) || [];

    // Clear the screen to prevent duplicates
    msgArea.innerHTML = "";

    // Loop through the memory and build a chat bubble for every message
    messages.forEach(msg => {
        const bubble = document.createElement("div");
        
        bubble.style.backgroundColor = "var(--hover-icon)"; 
        bubble.style.color = "white";
        bubble.style.padding = "10px 15px";
        bubble.style.borderRadius = "15px";
        bubble.style.marginBottom = "10px";
        bubble.style.width = "fit-content";
        bubble.style.maxWidth = "80%";
        
        bubble.innerHTML = `
            <strong>${msg.sender}:</strong> ${msg.text} 
            <span style="font-size: 11px; color: #ffd1c9; margin-left: 10px;">${msg.time}</span>
        `;
        
        msgArea.appendChild(bubble);
    });

    // The Magic Auto-Scroll: Forces the window to the bottom every time a message loads
    msgArea.scrollTop = msgArea.scrollHeight;
}