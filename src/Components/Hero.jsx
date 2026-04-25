import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Zap, Shield, ChevronRight } from 'lucide-react';
import './Hero.css';
import aiImage from '../assets/ai.png'; // Extension (png/jpg) likhna zaroori hai

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-container">
        <div className="hero-content">
          <div className="badge" style={{color:"skyblue"}}>✨ Next-Gen AI Assistant</div>
          <h1 className="hero-title">
            Unlock the Power of <span className="text-gradient">Shaz AI</span>
          </h1>
          <p className="hero-subtitle">
            A smarter way to chat, create, and solve. Experience the ultimate ChatGPT clone
            designed for speed, accuracy, and a better user experience.
          </p>
        </div>

        <div className="hero-visual">
          <div className="ai-blob"></div>
          {/* Aap yahan apni image ya video ka tag daal sakte hain */}
          <img
            src={aiImage} 
            alt="AI Visual"
            className="floating-img"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="feature-card">
          <Zap className="icon-gold" />
          <h3>Lightning Fast</h3>
          <p>Instant responses with Google Gemini 2.0 Flash engine.</p>
        </div>
        <div className="feature-card">
          <MessageSquare className="icon-blue" />
          <h3>Smart Context</h3>
          <p>Remembers your conversation history for better flow.</p>
        </div>
        <div className="feature-card">
          <Shield className="icon-green" />
          <h3>Private & Secure</h3>
          <p>Your chats are encrypted and stored safely with JWT.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">Shaz AI</div>
          <p>© 2024 Created by Shazil Bukhari. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
