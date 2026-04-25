import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Chat.css"
import { ToastContainer, toast, Bounce } from 'react-toastify';


import {
  Plus,
  PanelLeft,
  Search,
  Image as ImageIcon,
  Mic,
  Copy,
  Share,
  Send,
  MessageCircle,
  PanelRight,
  DeleteIcon
} from 'lucide-react';
import axios from 'axios';
import { ReactTyped } from "react-typed";

const Chat = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(true);
  const [userMsg, setuserMsg] = useState("")
  const [messages, setmessages] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const [sessionId, setsessionId] = useState(null)
  const [history, sethistory] = useState([])


  const handleSend = async (e) => {
    e.preventDefault()
    const newMessage = { text: userMsg, sender: "user" }
    setmessages([...messages, newMessage])
    setuserMsg("")
    setisLoading(true)
    try {
      const res = await axios.post("https://shazai-backend.onrender.com/api/chat",
        {
          message: userMsg,
          session: sessionId
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        })
      const ai_message = { text: res.data.reply, sender: "assistant" }
      setmessages(prev => [...prev, ai_message])
      if (!sessionId) setsessionId(res.data.session_id)
    } catch (err) {
      if (err.response && err.response.status == 401) {
        localStorage.removeItem("token")
        navigate("/login")
        return
      }
      const errorMsg = { text: "Server Error", sender: "assistant" }
      setmessages(prev => [...prev, errorMsg])
    } finally {
      setisLoading(false)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    navigate("/login")
  }

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])

  const handleNew = (e) => {
    e.preventDefault()
    setmessages([])
    setsessionId(null)
    setuserMsg("")
  }


  useEffect(() => {
    const fetchsidebar = async () => {
      try {
        const res = await axios.get("https://shazai-backend.onrender.com/api/session", {
          headers: { Authorization: `Bearer ${token}` }
        })
        sethistory(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchsidebar()
  }, [token])


  const loadChat = async (id) => {
    try {
      const res = await axios.get(`https://shazai-backend.onrender.com/api/history/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const formatted = res.data.map(msg => ({
        text: msg.message,
        sender: msg.role
      }))
      setmessages(formatted)
      setsessionId(id)
    } catch (err) {
      toast.error("Failed to Load")
    }
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://shazai-backend.onrender.com/api/delete-session/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success(res.data.message)
      sethistory(prev => prev.filter(item => item.session_id !== id))
    } catch (err) {
      toast.error(err.response?.data?.error || "Session Not Found")
    }
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="app-container">
        {/* Sidebar Section */}
        <aside className={`sidebar ${showSidebar ? '' : 'sidebar-closed'}`}>
          <div className="sidebar-inner">
            <div className="sidebar-header">
              <button onClick={handleNew} className="new-chat-btn">
                <Plus size={18} /> <span>New chat</span>
              </button>
              <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                <PanelRight size={20} />
              </button>
            </div>

            <nav className="nav-section">
              {history.map((item) => (
                <div key={item.session_id} className="nav-item"
                  onClick={() => loadChat(item.session_id)}
                  style={{
                    display: "flex",           // 🔥 Zaroori hai
                    alignItems: "center",      // 🔥 Vertical center alignment
                    justifyContent: "space-between", // 🔥 Title ko left aur Icon ko ek dum right phek dega
                    padding: "10px 12px",
                    cursor: 'pointer',
                    gap: "10px"
                  }}
                >

                  <MessageCircle size={18} />
                  <span style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: "14px",
                    flex: 1
                  }}>
                    {item.title}
                  </span>


                  <DeleteIcon onClick={() => handleDelete(item.session_id)} size={18}
                    style={{
                      color: "#9ca3af",
                      cursor: "pointer",
                      flexShrink: 0 // Icon ko dabne se rokega
                    }}
                    onMouseEnter={(e) => e.target.style.color = "#ef4444"} // Hover par Red
                    onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
                  />
                </div>
              ))}

            </nav>

            <div className="sidebar-bottom">

              <div className="tailored-card">
                <p className="card-title">Your personalized experience</p>
                <p className="card-desc">Access your chats and fast response.</p>
                <button onClick={handleLogout} className="card-login-btn">Logout</button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Chat View */}
        <main className="main-view">
          <header className="header-bar">
            <div className="header-left">
              {!showSidebar && (
                <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                  <PanelLeft size={20} />
                </button>
              )}
              <div className="model-dropdown">
                ChatGPT
              </div>
            </div>
            <div className="header-right">
              <button onClick={handleLogout} className="btn-login-header" style={{ fontWeight: "700" }}>Logout</button>
            </div>
          </header>

          <div className="chat-container">
            <div className="chat-content">
              {messages.map((msg, index) => (
                <div key={index} className={`msg-wrapper ${msg.sender}`}>
                  <div className="msg-box">
                    {(msg.message || msg.text)?.split('\n').map((t, i) => <p key={i}>{t}</p>)}
                    {msg.sender === 'assistant' && (
                      <div className="msg-actions">
                        <button onClick={() => {
                          navigator.clipboard.writeText(msg.text || msg.message)
                          toast.success("Copy to Clipboard!")
                        }} title="Copy"><Copy size={14} /></button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div>
                  <ReactTyped
                    strings={["Thinking...", "Fetching response...", "Almost there..."]}
                    typeSpeed={40}
                    backSpeed={50}
                    loop
                  />
                </div>
              )}
            </div>
          </div>

          <div className="input-sticky">
            <div className="input-box-container">
              <form onSubmit={handleSend}>
                <div className="input-field-wrapper">
                  {/* <button className="btn-action-input"><Plus size={18} /></button> */}
                  <input type="text" placeholder="Ask anything..."
                    value={userMsg}
                    onChange={(e) => setuserMsg(e.target.value)}
                  />
                  <button className="btn-voice" type='submit'>
                    <Send size={16} />
                  </button>
                </div>
              </form>
              <p className="disclaimer-text">
                Created by Shazil Bukhari. Crafted with care to give you a <u>better experience</u>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Chat