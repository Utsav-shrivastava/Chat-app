import { useEffect, useState } from "react";
import API from "../services/api";

function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState(null);

  // Helper function to get authorization headers dynamically
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // START CHAT
  const startChat = async (user) => {
    setSelectedUser(user);
    try {
      const res = await API.post(
        "/chat/conversation",
        { userId: user._id },
        getAuthConfig()
      );
      setConversationId(res.data._id);
      fetchMessages(res.data._id);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  // GET MESSAGES
  const fetchMessages = async (id) => {
    try {
      const res = await API.get(`/chat/messages/${id}`, getAuthConfig());
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // SEND MESSAGE
  const sendMessage = async () => {
    if (!text || !conversationId) return;

    try {
      await API.post(
        "/chat/message",
        {
          conversationId,
          text,
        },
        getAuthConfig()
      );
      setText("");
      fetchMessages(conversationId); // refresh messages
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // FIX: Handled asynchronous side-effect correctly inside useEffect
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const res = await API.get("/users", getAuthConfig());
        // Only update state if the component is still mounted to prevent memory leaks
        if (isMounted) {
          setUsers(res.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false; // Cleanup flag
    };
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* USERS */}
      <div style={{ width: "30%", borderRight: "1px solid gray" }}>
        <h3>Users</h3>
        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => startChat(user)}
            style={{ cursor: "pointer", padding: "10px" }}
          >
            {user.username}
          </div>
        ))}
      </div>

      {/* CHAT */}
      <div style={{ width: "70%", padding: "10px" }}>
        <h3>
          Chat with {selectedUser ? selectedUser.username : "Select user"}
        </h3>

        <div style={{ height: "80%", overflowY: "auto" }}>
          {messages.map((msg) => (
            <div key={msg._id}>
              <b>{msg.sender?.username || "User"}:</b> {msg.text}
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;