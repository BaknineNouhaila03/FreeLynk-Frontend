"use client"
import { useState, useRef, useEffect } from 'react';
import styles from './Chat.module.css';
import Image from 'next/image';
import NavBar from '../navbar2/Navbar';
import Footer from '../Footer/Footer';

const Sidebar = ({ conversations, activeConversation, setActiveConversation, searchTerm, setSearchTerm, filteredConversations }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search" 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.conversationsList}>
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`${styles.conversationItem} ${activeConversation === conversation.id ? styles.activeConversation : ''}`}
            onClick={() => setActiveConversation(conversation.id)}
          >
            <div className={styles.conversationAvatar}>
              <img
                src="/images/profle.jpeg"
                alt={conversation.name}
                width={40}
                height={40}
                className={styles.avatar}
              />
            </div>
            <div className={styles.conversationInfo}>
              <div className={styles.conversationName}>{conversation.name}</div>
              <div className={styles.conversationPreview}>
                {conversation.typing ? (
                  <span className={styles.typingText}>is typing a message...</span>
                ) : (
                  conversation.lastMessage
                )}
              </div>
            </div>
            <div className={styles.conversationMeta}>
              <div className={styles.conversationTime}>{conversation.time}</div>
              {conversation.unread > 0 && (
                <div className={styles.unreadBadge}>{conversation.unread}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatInterface = () => {
  const [searchTerm, setSearchTerm] = useState('');
 
  const [conversations, setConversations] = useState([
    { 
      id: 1, 
      name: 'Eva Johnston', 
      lastMessage: "Yupp, It's been a long time ago lol :)", 
      time: '5m ago', 
      unread: 0, 
      typing: false 
    },
    { 
      id: 2, 
      name: 'Alex Morgan', 
      lastMessage: 'See you tomorrow!', 
      time: '2h ago', 
      unread: 3, 
      typing: false 
    },
    { 
      id: 3, 
      name: 'Sarah Williams', 
      lastMessage: 'Thanks for the update', 
      time: 'Yesterday', 
      unread: 0, 
      typing: false 
    },
    { 
      id: 4, 
      name: 'John Davis', 
      lastMessage: 'Can you send the document?', 
      time: 'Tuesday', 
      unread: 0, 
      typing: false 
    },
    { 
      id: 5, 
      name: 'Mike Thompson', 
      lastMessage: 'Great idea!', 
      time: 'Monday', 
      unread: 0, 
      typing: false 
    }
  ]);
  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi!! How are you?', sender: 'user' },
    { id: 2, text: 'Yupp, It\'s been a long time ago lol :)', sender: 'recipient' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const messagesEndRef = useRef(null);

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(convo =>
    convo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show typing indicator temporarily after receiving a message
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].sender === 'user') {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const newId = messages.length > 0 ? Math.max(...messages.map(msg => msg.id)) + 1 : 1;
    setMessages([...messages, { id: newId, text: newMessage, sender: 'user', timestamp: new Date() }]);
    setNewMessage('');
  };

  const formatTimestamp = (date) => {
    if (!date) return '';
    return `${date.toLocaleString('en-US', { weekday: 'short' })} at ${date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
  };

  // Toggle sidebar visibility (for mobile)
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Get active conversation details
  const activeConvDetails = conversations.find(c => c.id === activeConversation) || conversations[0];
  
  return (
    <div>
      <NavBar/>
    <div className={styles.mainContainer}>
      {/* Sidebar component */}
      <div className={`${styles.sidebarContainer} ${sidebarVisible ? '' : styles.hiddenSidebar}`}>
        <Sidebar 
          conversations={conversations} 
          activeConversation={activeConversation} 
          setActiveConversation={setActiveConversation}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredConversations={filteredConversations}
        />
      </div>
      
      {/* Chat area */}
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <div className={styles.recipientInfo}>
            <button 
              className={styles.toggleSidebarButton}
              onClick={toggleSidebar}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className={styles.avatarContainer}>
              <img 
                src="/images/profle.jpeg" 
                alt="Avatar" 
                width={40} 
                height={40}
                className={styles.avatar} 
              />
            </div>
            <div className={styles.recipientName}>
              {activeConvDetails.name}
              {isTyping && <div className={styles.typingIndicator}>is typing a message...</div>}
            </div>
          </div>
          
        </div>

        <div className={styles.chatMessages}>
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`${styles.messageContainer} ${message.sender === 'user' ? styles.userMessage : styles.recipientMessage}`}
            >
              {message.sender === 'recipient' && (
                <div className={styles.messageAvatar}>
                  <img 
                    src="/images/profle.jpeg"
                    alt="Avatar" 
                    width={32} 
                    height={32}
                    className={styles.avatar} 
                  />
                </div>
              )}
              <div className={styles.messageContent}>
                <div className={styles.messageText}>{message.text}</div>
                {message.timestamp && (
                  <div className={styles.messageTimestamp}>
                    {formatTimestamp(message.timestamp)}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`${styles.messageContainer} ${styles.recipientMessage}`}>
              <div className={styles.messageAvatar}>
                <img 
                  src="/images/profle.jpeg" 
                  alt="Avatar" 
                  width={32} 
                  height={32}
                  className={styles.avatar} 
                />
              </div>
              <div className={styles.messageContent}>
                <div className={`${styles.typingIndicatorBubble}`}>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className={styles.messageInputContainer} onSubmit={handleSendMessage}>
          <button type="button" className={styles.attachButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type your message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={styles.messageInput}
          />
          <button type="submit" className={styles.sendButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
    <div style={{ backgroundColor: "#2f3c7e", marginTop: "50px" }}>
                <Footer />
      </div>
    </div>

  );
};

export default ChatInterface;