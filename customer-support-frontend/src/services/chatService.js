
const API_URL = "http://localhost:8089/api/chat";

export async function sendChatMessage(message) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error(`Chat request failed: ${response.status}`);
  }

  return response.json();
}

export async function getChatHistory() {
  const response = await fetch(`${API_URL}/history`);

  if (!response.ok) {
    throw new Error(`History request failed: ${response.status}`);
  }

  return response.json();
}
