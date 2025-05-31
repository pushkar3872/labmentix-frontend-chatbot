import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, User, Bot, X, FileText, Image, File, Loader2, Plus, Menu, Sparkles, MessageCircle } from 'lucide-react';

export default function Hero() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today? ✨',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    event.target.value = '';
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) return <Image className="w-4 h-4 text-rose-500" />;
    if (fileType.includes('text') || fileType.includes('document')) return <FileText className="w-4 h-4 text-blue-500" />;
    return <File className="w-4 h-4 text-indigo-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Simulate API call
  const callAPI = async (message, files) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock response based on input
    const responses = [
      "That's an interesting question! Let me help you with that. 🎯",
      "I understand what you're asking. Here's my thoughts on this topic... 💭",
      "Based on your message, I can provide some insights. ✨",
      "Great question! This is something I can definitely help you explore. 🚀",
      "I see what you're getting at. Let me break this down for you. 📊"
    ];
    
    let response = responses[Math.floor(Math.random() * responses.length)];
    
    if (files.length > 0) {
      response += ` I can see you've uploaded ${files.length} file${files.length > 1 ? 's' : ''}. I'll analyze ${files.map(f => f.name).join(', ')} for you. 📄`;
    }
    
    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() && uploadedFiles.length === 0) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      files: uploadedFiles,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    const currentInput = inputValue;
    const currentFiles = [...uploadedFiles];
    
    setInputValue('');
    setUploadedFiles([]);

    try {
      const response = await callAPI(currentInput, currentFiles);
      
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again. 😔',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex-col shadow-2xl border-r border-slate-700">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-rose-400 to-blue-400 bg-clip-text text-transparent">
                AI Chat
              </h2>
              <p className="text-xs text-slate-400">Powered by AI</p>
            </div>
          </div>
          
          <button className="flex items-center gap-3 w-full p-4 rounded-xl bg-gradient-to-r from-rose-600/20 to-blue-600/20 hover:from-rose-600/30 hover:to-blue-600/30 transition-all duration-300 border border-rose-500/20 hover:border-rose-500/40 shadow-lg">
            <Plus className="w-5 h-5 text-rose-400" />
            <span className="font-medium">New Conversation</span>
          </button>
        </div>
        
        <div className="flex-1 p-6">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Recent Chats</h3>
          <div className="space-y-3">
            <div className="group p-3 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-all duration-200 border border-transparent hover:border-slate-700">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-300 truncate">AI Development Tips</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
            </div>
            
            <div className="group p-3 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-all duration-200 border border-transparent hover:border-slate-700">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-rose-400 group-hover:text-rose-300" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-300 truncate">Code Review Help</p>
                  <p className="text-xs text-slate-500">Yesterday</p>
                </div>
              </div>
            </div>
            
            <div className="group p-3 rounded-xl hover:bg-slate-800/50 cursor-pointer transition-all duration-200 border border-transparent hover:border-slate-700">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-300 truncate">Design System Ideas</p>
                  <p className="text-xs text-slate-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-slate-700">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-300">User Account</p>
              <p className="text-xs text-slate-500">Free Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col backdrop-blur-sm">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-rose-100/50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="md:hidden p-2 rounded-xl bg-gradient-to-r from-rose-500 to-blue-500 text-white shadow-lg">
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-blue-600 bg-clip-text text-transparent">
                    AI Assistant
                  </h1>
                  <p className="text-sm text-slate-500">Always here to help ✨</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm animate-pulse"></div>
              <span className="text-sm text-slate-600 font-medium">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'assistant' && (
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div className={`max-w-2xl ${message.type === 'user' ? 'order-1' : ''}`}>
                <div className={`rounded-3xl p-6 shadow-lg ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-rose-500 to-blue-500 text-white ml-auto transform hover:scale-105 transition-all duration-200' 
                    : 'bg-white/90 backdrop-blur-sm border border-rose-100/50 hover:shadow-xl transition-all duration-200'
                }`}>
                  {message.files && message.files.length > 0 && (
                    <div className="mb-4 space-y-3">
                      {message.files.map((file) => (
                        <div key={file.id} className={`flex items-center gap-3 p-3 rounded-2xl ${
                          message.type === 'user' 
                            ? 'bg-white/20 backdrop-blur-sm' 
                            : 'bg-gradient-to-r from-rose-50 to-blue-50 border border-rose-100'
                        }`}>
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold truncate ${
                              message.type === 'user' ? 'text-white' : 'text-slate-700'
                            }`}>
                              {file.name}
                            </p>
                            <p className={`text-xs ${
                              message.type === 'user' ? 'text-white/70' : 'text-slate-500'
                            }`}>
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className={`leading-relaxed ${
                    message.type === 'assistant' ? 'text-slate-700' : 'text-white'
                  }`}>
                    {message.content}
                  </p>
                </div>
                
                <div className={`text-xs text-slate-500 mt-2 px-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-rose-100/50 rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-rose-500 to-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-slate-600 font-medium">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-xl border-t border-rose-100/50 p-6">
          {/* File Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 bg-gradient-to-r from-rose-50 to-blue-50 rounded-2xl p-3 border border-rose-200/50 shadow-sm hover:shadow-md transition-all duration-200">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">({formatFileSize(file.size)})</p>
                  </div>
                  <button 
                    onClick={() => removeFile(file.id)}
                    className="ml-2 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-4">
            <div className="flex-1 relative">
              <div className="relative bg-white rounded-3xl shadow-lg border border-rose-200/50 hover:border-rose-300/50 transition-all duration-200">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here... ✨"
                  className="w-full p-6 pr-16 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-rose-400/50 bg-transparent text-slate-700 placeholder-slate-400 min-h-[64px] max-h-[200px]"
                  rows={1}
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-4 bottom-4 p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-2xl transition-all duration-200"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={(!inputValue.trim() && uploadedFiles.length === 0) || isLoading}
              className="p-4 bg-gradient-to-r from-rose-500 to-blue-500 text-white rounded-2xl hover:from-rose-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept="*/*"
            />
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-500">
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-slate-100 rounded-lg font-mono text-xs">Enter</kbd>
              to send
            </span>
            <span className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-slate-100 rounded-lg font-mono text-xs">Shift + Enter</kbd>
              for new line
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}