import { useEffect, useState } from "react";
import API from "../services/api";

function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [conversationId, setConversationId] = useState(null);

  // Fallback dummy user for testing or layout tracking if your database doesn't pass a clear sender ID 
  // Normally you can grab the current logged-in user details via an auth context or global storage.
  const token = localStorage.getItem("token");

  // Helper function to get authorization headers dynamically
  const getAuthConfig = () => {
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
  const sendMessage = async (e) => {
    if (e) e.preventDefault(); // allow pressing enter
    if (!text.trim() || !conversationId) return;

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

  // Fetch Users List
  useEffect(() => {
    let isMounted = true;

    const fetchUsers = async () => {
      try {
        const res = await API.get("/users", getAuthConfig());
        if (isMounted) {
          setUsers(res.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  // WhatsApp styling scheme
  const styles = {
    appContainer: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#dadbd3", // Classic WhatsApp outer background
      fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
      overflow: "hidden",
    },
    sidebar: {
      width: "30%",
      minWidth: "260px",
      maxWidth: "400px",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid #e0e0e0",
    },
    sidebarHeader: {
      height: "60px",
      backgroundColor: "#f0f2f5",
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      fontWeight: "bold",
      fontSize: "18px",
      color: "#3b4a54",
    },
    userList: {
      flex: 1,
      overflowY: "auto",
    },
    userRow: (isSelected) => ({
      display: "flex",
      alignItems: "center",
      padding: "12px 16px",
      cursor: "pointer",
      backgroundColor: isSelected ? "#48cdd9" : "#ffffff",
      borderBottom: "1px solid #ffffff",
      transition: "background-color 0.2s",
    }),
    avatarPlaceholder: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#dfe5e7",
      marginRight: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#54656f",
      fontWeight: "600",
      fontSize: "16px",
    },
    usernameText: {
      fontSize: "16px",
      fontWeight: "500",
      color: "#111b21",
    },
    chatArea: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#efeae2", // True WhatsApp chat wallpaper tint
      position: "relative",
    },
    chatHeader: {
      height: "60px",
      backgroundColor: "#f0f2f5",
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      borderBottom: "1px solid #e0e0e0",
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    chatHeaderTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#111b21",
    },
    messagesPanel: {
      flex: 1,
      padding: "20px 4%",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    bubbleWrapper: (isMe) => ({
      display: "flex",
      justifyContent: isMe ? "flex-end" : "flex-start",
      width: "100%",
    }),
    messageBubble: (isMe) => ({
      maxWidth: "65%",
      padding: "8px 12px",
      borderRadius: "8px",
      backgroundColor: isMe ? "#d9fdd3" : "#ffffff", // WhatsApp incoming vs outgoing colors
      boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
      color: "#111b21",
      fontSize: "14.5px",
      lineHeight: "1.4",
      position: "relative",
      wordBreak: "break-word",
    }),
    senderTag: {
      fontSize: "11px",
      fontWeight: "bold",
      color: "#d7481d",
      display: "block",
      marginBottom: "3px",
    },
    inputArea: {
      height: "62px",
      backgroundColor: "#f0f2f5",
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      gap: "12px",
    },
    inputField: {
      flex: 1,
      height: "42px",
      borderRadius: "8px",
      border: "none",
      padding: "0 16px",
      fontSize: "15px",
      outline: "none",
      color : "black",
      backgroundColor: "#ffffff",
      
    },
    sendBtn: {
      backgroundColor: "#00a884", // Classic WhatsApp green primary
      color: "#ffffff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    emptyState: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#667781",
      textAlign: "center",
    }
  };

  return (
    <div style={styles.appContainer}>
      
      {/* SIDEBAR: CHAT LIST */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Chats</div>
        <div style={styles.userList}>
          {users.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            return (
              <div
                key={user._id}
                onClick={() => startChat(user)}
                style={styles.userRow(isSelected)}
              >
                <div style={styles.avatarPlaceholder}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div style={styles.usernameText}>{user.username}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT SIDE: ACTIVE CONVERSATION */}
      <div style={styles.chatArea}>
        {selectedUser ? (
          <>
            {/* ACTIVE CHAT HEADER */}
            <div style={styles.chatHeader}>
              <div>
                <div style={styles.chatHeaderTitle}>{selectedUser.username}</div>
              </div>
            </div>

            {/* MESSAGES VIEW */}
            <div style={styles.messagesPanel}>
              {messages.map((msg) => {
                // Determine layout alignment. If sender context matches active recipient, align left.
                const isMe = msg.sender?._id !== selectedUser._id;
                
                return (
                  <div key={msg._id} style={styles.bubbleWrapper(isMe)}>
                    <div style={styles.messageBubble(isMe)}>
                      {!isMe && (
                        <span style={styles.senderTag}>
                          {msg.sender?.username || "User"}
                        </span>
                      )}
                      <div>{msg.text}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MESSAGE INPUT CONTAINER */}
            <form onSubmit={sendMessage} style={styles.inputArea}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message"
                style={styles.inputField}
              />
              <button type="submit" style={styles.sendBtn}>
                Send
              </button>
            </form>
          </>
        ) : (
          /* BLANK CHAT SCREEN STATE */
          <div style={styles.emptyState}>
            <h2 style={{ fontWeight: "300", margin: "0 0 10px 0" }}>WhatsApp API Client</h2>
            <p style={{ fontSize: "14px" }}>Select a user from the sidebar panel to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;