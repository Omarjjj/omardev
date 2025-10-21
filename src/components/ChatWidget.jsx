import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, Zap, Brain, User } from 'lucide-react';
import { gsap } from 'gsap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const buttonRef = useRef(null);
  const widgetRef = useRef(null);
  const particlesRef = useRef([]);
  const glowRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    // Extravagant entrance animation sequence
    const timeline = gsap.timeline({ delay: 1 });
    
    timeline
      .fromTo(buttonRef.current, 
        { scale: 0, rotation: -180, opacity: 0, y: 100 },
        { 
          scale: 1, 
          rotation: 0,
          opacity: 1,
          y: 0,
          duration: 1.2, 
          ease: 'elastic.out(1, 0.5)'
        }
      )
      .fromTo('.button-inner',
        { scale: 0 },
        { scale: 1, duration: 0.6, ease: 'back.out(2)' },
        '-=0.5'
      );

    // Pulsing glow animation
    gsap.to(glowRef.current, {
      scale: 1.3,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async (text) => {
    const userMessage = text || inputValue.trim();
    
    if (!userMessage) return;

    // Add user message to chat
    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call backend API (works in both dev and production)
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3001/api/chat' 
        : '/api/chat';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error Response:', errorData);
        throw new Error(errorData.details || errorData.error || 'Failed to get response');
      }

      const data = await response.json();

      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('❌ Chat Error:', error);
      console.error('Error details:', error.message);
      
      // Add error message with details
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `⚠️ **Connection Issue**\n\nI'm having trouble connecting to the AI service right now.\n\n**Error:** ${error.message}\n\nPlease try again in a moment or check the browser console for more details.`,
        timestamp: new Date(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestedQuestion = (question) => {
    sendMessage(question);
  };

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      
      // Dramatic button exit
      const exitTimeline = gsap.timeline();
      exitTimeline
        .to(buttonRef.current, {
          scale: 1.2,
          duration: 0.2,
          ease: 'power2.out'
        })
        .to(buttonRef.current, {
          scale: 0,
          rotation: 180,
          y: -20,
          opacity: 0,
          duration: 0.5,
          ease: 'back.in(2)'
        });

      // Spectacular widget entrance
      setTimeout(() => {
        const entranceTimeline = gsap.timeline();
        entranceTimeline
          .fromTo(widgetRef.current,
            { y: 100, opacity: 0, scale: 0.8, rotateX: -15 },
            { 
              y: 0, 
              opacity: 1, 
              scale: 1, 
              rotateX: 0,
              duration: 0.8, 
              ease: 'elastic.out(1, 0.6)',
              onComplete: () => {
                // Cascading element animation
                gsap.fromTo('.chat-element',
                  { y: 30, opacity: 0, scale: 0.9 },
                  { 
                    y: 0, 
                    opacity: 1, 
                    scale: 1,
                    duration: 0.6, 
                    stagger: 0.1,
                    ease: 'back.out(1.7)'
                  }
                );
              }
            }
          );
      }, 300);
    } else {
      // Elegant widget exit
      const exitTimeline = gsap.timeline();
      exitTimeline
        .to('.chat-element', {
          y: -20,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.in'
        })
        .to(widgetRef.current, {
          y: 100,
          opacity: 0,
          scale: 0.8,
          rotateX: 15,
          duration: 0.5,
          ease: 'back.in(1.7)',
          onComplete: () => {
            setIsOpen(false);
            // Wait for React to render the button before animating
            setTimeout(() => {
              if (buttonRef.current) {
                gsap.fromTo(buttonRef.current,
                  { scale: 0, rotation: -180, y: 20, opacity: 0 },
                  { 
                    scale: 1, 
                    rotation: 0,
                    y: 0,
                    opacity: 1,
                    duration: 0.8, 
                    ease: 'elastic.out(1, 0.5)'
                  }
                );
              }
            }, 50);
          }
        }, '-=0.2');
    }
  };

  return (
    <>
      {/* Floating Chat Button - Bottom Center */}
      {!isOpen && (
        <div
          ref={buttonRef}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150]"
          style={{ opacity: 0 }}
        >
        <button
          onClick={handleToggle}
          className="relative group"
        >
          {/* Outer glow pulse */}
          <div ref={glowRef} className="absolute inset-0 -m-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-primary-500 blur-2xl opacity-60" />
          </div>

          {/* Main button */}
          <div className="button-inner relative w-16 h-16 bg-gradient-to-br from-purple-600 via-primary-600 to-purple-700 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/40 border-2 border-purple-400/30 group-hover:scale-110 group-hover:shadow-purple-500/60 transition-all duration-300 overflow-hidden">
            {/* Background gradient animation */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-primary-500/30 opacity-50" />
            
            {/* Icon */}
            <MessageCircle 
              size={26} 
              className="relative text-white drop-shadow-lg z-10" 
              strokeWidth={2.5} 
            />

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </div>
        </button>
      </div>
      )}

      {/* Chat Widget - Bottom Center */}
      {isOpen && (
        <div
          ref={widgetRef}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[150] w-[420px] h-[530px]"
          style={{ opacity: 0 }}
        >
          {/* Animated glow rings */}
          <div className="absolute inset-0 -m-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-primary-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
          </div>
          
          {/* Main widget */}
          <div className="relative h-full bg-gradient-to-br from-gray-900 via-gray-900/98 to-gray-800 backdrop-blur-2xl rounded-3xl border border-purple-500/20 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Mesh gradient overlay */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(168,85,247,0.3),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(192,132,252,0.3),transparent_50%)]" />
            </div>
              
            {/* Header */}
            <div className="chat-element relative p-4 border-b border-white/10 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800">
              {/* Circuit pattern background */}
              <div className="absolute inset-0 opacity-5">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill="currentColor" className="text-purple-400"/>
                      <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-primary-500"/>
                      <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.5" className="text-primary-500"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#circuit)"/>
                </svg>
              </div>

              {/* Top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

              <div className="relative flex items-center gap-3">
                {/* AI Avatar with glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-500 rounded-full blur-md opacity-50 animate-pulse" />
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-2 border-purple-400/50 shadow-lg shadow-purple-500/30">
                    <Brain size={24} className="text-purple-400" />
                  </div>
                  {/* Pulse ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-purple-400/30 animate-ping" />
                  {/* Online status */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900 flex items-center justify-center">
                    <Zap size={8} className="text-gray-900" />
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-white font-bold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Omar AI
                    </h3>
                    <div className="flex gap-0.5">
                      <Sparkles size={12} className="text-yellow-400 animate-pulse" style={{ animationDelay: '0s' }} />
                      <Sparkles size={10} className="text-purple-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                  <p className="text-purple-300 text-[11px] font-medium">GPT-4 Powered • Always Online</p>
                </div>

                {/* Close button */}
                <button 
                  onClick={handleToggle}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 flex items-center justify-center transition-all group"
                >
                  <X size={16} className="text-gray-400 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 relative">
              {/* Welcome message */}
              <div className="chat-element flex gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-800/50 backdrop-blur-sm rounded-2xl rounded-tl-none p-3 border border-purple-500/20 shadow-xl">
                    <p className="text-gray-100 text-xs leading-relaxed">
                      <span className="text-lg mr-1">👋</span>
                      Hello! I'm <span className="text-purple-400 font-semibold">Omar's AI assistant</span>. I can help you learn more about his projects, skills, and experience. Feel free to ask me anything!
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-gray-500">Just now</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full" />
                    <span className="text-[10px] text-purple-400">AI</span>
                  </div>
                </div>
              </div>

              {/* Suggested questions - only show if no messages */}
              {messages.length === 0 && (
                <div className="chat-element space-y-2">
                  <div className="flex items-center gap-2">
                    <Sparkles size={12} className="text-purple-400" />
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Quick Start</p>
                    <div className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent" />
                  </div>
                  
                  {[
                    { text: "Tell me about Omar's projects", icon: "💼" },
                    { text: "What are his technical skills?", icon: "⚡" },
                    { text: "Tell me about his recognition", icon: "🏆" }
                  ].map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question.text)}
                      disabled={isLoading}
                      className="w-full text-left px-3 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/5 to-purple-600/5 hover:from-purple-600/15 hover:to-purple-600/15 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <div className="relative flex items-center gap-2.5">
                        <span className="text-base">{question.icon}</span>
                        <span className="text-xs text-gray-300 group-hover:text-white transition-colors font-medium">
                          {question.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-2.5 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/30' 
                      : 'bg-gradient-to-br from-purple-500 to-primary-500 shadow-purple-500/30'
                  }`}>
                    {message.role === 'user' ? (
                      <User size={18} className="text-white" />
                    ) : (
                      <Bot size={18} className="text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`flex-1 ${message.role === 'user' ? 'flex flex-col items-end' : ''}`}>
                    <div className={`backdrop-blur-sm rounded-2xl p-3 border shadow-xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-purple-600/60 to-pink-600/40 border-purple-500/20 rounded-tr-none'
                        : message.isError
                        ? 'bg-gradient-to-br from-red-900/40 to-red-800/30 border-red-500/20 rounded-tl-none'
                        : 'bg-gradient-to-br from-gray-800/80 to-gray-800/50 border-purple-500/20 rounded-tl-none'
                    }`}>
                      {message.role === 'assistant' && !message.isError ? (
                        <div className="markdown-content text-gray-100 text-xs leading-relaxed">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              // Headings with gradient
                              h1: ({node, ...props}) => <h1 className="text-base font-bold mb-2 bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-sm font-bold mb-2 text-purple-300" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-xs font-bold mb-1.5 text-purple-400" {...props} />,
                              
                              // Paragraphs with spacing
                              p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                              
                              // Lists with custom bullets
                              ul: ({node, ...props}) => <ul className="list-none space-y-1 mb-2 ml-3" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal space-y-1 mb-2 ml-4 marker:text-purple-400" {...props} />,
                              li: ({node, ...props}) => (
                                <li className="relative pl-4 before:content-['▹'] before:absolute before:left-0 before:text-purple-400 before:font-bold" {...props} />
                              ),
                              
                              // Bold and italic
                              strong: ({node, ...props}) => <strong className="font-bold text-purple-300" {...props} />,
                              em: ({node, ...props}) => <em className="italic text-purple-300" {...props} />,
                              
                              // Code blocks with styling
                              code: ({node, inline, ...props}) => 
                                inline ? (
                                  <code className="bg-gray-900/60 text-purple-300 px-1.5 py-0.5 rounded text-[10px] font-mono border border-purple-500/20" {...props} />
                                ) : (
                                  <code className="block bg-gray-900/80 text-purple-300 p-2 rounded-lg text-[10px] font-mono border border-purple-500/20 my-2 overflow-x-auto" {...props} />
                                ),
                              pre: ({node, ...props}) => <pre className="my-2" {...props} />,
                              
                              // Links
                              a: ({node, ...props}) => (
                                <a 
                                  className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/40 hover:decoration-purple-300 transition-colors" 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  {...props} 
                                />
                              ),
                              
                              // Blockquotes
                              blockquote: ({node, ...props}) => (
                                <blockquote className="border-l-2 border-purple-500/50 pl-3 italic text-gray-300 my-2 bg-purple-500/5 py-1 rounded-r" {...props} />
                              ),
                              
                              // Horizontal rule
                              hr: ({node, ...props}) => <hr className="border-purple-500/30 my-3" {...props} />,
                              
                              // Tables
                              table: ({node, ...props}) => <table className="w-full border-collapse my-2" {...props} />,
                              th: ({node, ...props}) => <th className="border border-purple-500/30 px-2 py-1 bg-purple-500/10 text-left text-[10px] font-semibold" {...props} />,
                              td: ({node, ...props}) => <td className="border border-purple-500/30 px-2 py-1 text-[10px]" {...props} />,
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-gray-100 text-xs leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full" />
                      <span className={`text-[10px] ${message.role === 'user' ? 'text-purple-400' : 'text-purple-400'}`}>
                        {message.role === 'user' ? 'You' : 'AI'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-primary-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-gray-800/80 to-gray-800/50 backdrop-blur-sm rounded-2xl rounded-tl-none p-3 border border-purple-500/20 shadow-xl">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="chat-element p-4 border-t border-white/10 bg-gradient-to-b from-gray-900/50 to-gray-900/80 backdrop-blur-sm">
              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              
              <div className="relative">
                {/* Input field */}
                <div className="flex items-center gap-2 bg-gray-800/60 rounded-2xl border-2 border-white/10 focus-within:border-purple-500/50 focus-within:shadow-lg focus-within:shadow-purple-500/20 transition-all p-2 group">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    placeholder="Ask me anything about Omar..."
                    className="flex-1 bg-transparent text-white placeholder-gray-500 px-3 py-2 outline-none text-xs disabled:opacity-50"
                  />
                  
                  {/* Send button */}
                  <button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !inputValue.trim()}
                    className="relative w-9 h-9 rounded-xl bg-gradient-to-r from-purple-600 to-primary-600 hover:from-purple-500 hover:to-primary-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group/btn overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                    
                    <Send size={16} className="text-white relative z-10 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>

                {/* Status indicators */}
                <div className="mt-2.5 flex items-center justify-between">
                  {/* AI Status */}
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <div className="flex gap-0.5">
                      <span className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                      <span className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span className="text-gray-500">{isLoading ? 'AI is thinking...' : 'AI is ready'}</span>
                  </div>

                  {/* Footer badge */}
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/10 to-purple-500/10 border border-purple-500/20">
                    <Sparkles size={9} className="text-purple-400" />
                    <span className="text-[9px] text-gray-400 font-medium">GPT-4 Turbo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-purple-500/20 rounded-tl-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-purple-500/40 rounded-tl-3xl pointer-events-none animate-pulse" />
            
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-purple-500/20 rounded-br-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-purple-500/40 rounded-br-3xl pointer-events-none animate-pulse" />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;

