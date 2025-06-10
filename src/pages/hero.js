import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, User, Bot, X, FileText, Image, File, Loader2, Plus, Menu, Sparkles, MessageCircle, Beaker } from 'lucide-react';

export default function Hero() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI laboratory assistant. How can I help you with your research today? ✨',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
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
    if (fileType.startsWith('image/')) return <Image className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />;
    if (fileType.includes('text') || fileType.includes('document')) return <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400" />;
    return <File className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Save message to backend
  const saveMessageToDB = async (message) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/savemessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: message.type,
          content: message.content,
          files: message.files || [],
          timestamp: message.timestamp,
        }),
      });
    } catch (err) {
      console.error('Failed to save message:', err);
    }
  };

  // Backend API call function
  const callBackendAPI = async (message) => {
    if (!message.trim()) {
      throw new Error('Please enter a message');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/callapi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mymsg: message }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data || { reply: 'No response from backend.' };
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() && uploadedFiles.length === 0) return;

    // Clear any previous errors
    setError(null);

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      files: uploadedFiles,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    saveMessageToDB(userMessage); // Save user message

    setIsLoading(true);

    const currentInput = inputValue;
    const currentFiles = [...uploadedFiles];

    setInputValue('');
    setUploadedFiles([]);

    try {
      // Call the actual backend API
      const response = await callBackendAPI(currentInput);

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response.reply || response.message || 'No response from backend.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      saveMessageToDB(assistantMessage); // Save assistant message

    } catch (error) {
      console.error('API Error:', error);
      setError('Failed to send message: ' + error.message);

      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'Sorry, I encountered an error. Please try again. 😔\nError: ' + error.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      saveMessageToDB(errorMessage); // Save error message
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 sm:w-48 md:w-80 h-32 sm:h-48 md:h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 sm:w-32 md:w-64 h-24 sm:h-32 md:h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Floating Scientific Elements */}
      <div className="absolute top-8 sm:top-16 left-4 sm:left-8 animate-bounce" style={{animationDelay: '0s'}}>
        <div className="w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-indigo-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-16 sm:top-32 right-8 sm:right-16 animate-bounce" style={{animationDelay: '1s'}}>
        <div className="w-1.5 sm:w-2 md:w-3 h-1.5 sm:h-2 md:h-3 bg-cyan-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-20 sm:bottom-32 left-8 sm:left-16 animate-bounce" style={{animationDelay: '2s'}}>
        <div className="w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 bg-purple-400 rounded-full opacity-60"></div>
      </div>
      <div className="absolute bottom-8 sm:bottom-16 right-4 sm:right-8 animate-bounce" style={{animationDelay: '3s'}}>
        <div className="w-2 sm:w-3 md:w-4 h-2 sm:h-3 md:h-4 bg-emerald-400 rounded-full opacity-60"></div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:relative inset-y-0 left-0 z-30 lg:z-10 w-60 sm:w-64 lg:w-72 bg-white/5 backdrop-blur-xl text-white flex-col shadow-2xl border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${sidebarOpen ? 'flex' : 'hidden lg:flex'}`}>
        {/* ...sidebar code unchanged... */}
        {/* (Keep your sidebar code here as in your original file) */}
        <div className="p-3 sm:p-4 lg:p-6 border-b border-white/10">
          <div className="flex items-center justify-between lg:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                <Beaker className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-sm sm:text-base lg:text-lg bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
                  Labmentix AI
                </h2>
                <p className="text-xs text-gray-400">Laboratory Assistant</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 sm:gap-3 w-full p-2.5 sm:p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 border border-white/20 hover:border-indigo-400/50 shadow-lg group">
            <Plus className="w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 text-indigo-400 group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-medium text-gray-300 text-xs sm:text-sm lg:text-base">New Conversation</span>
          </button>
        </div>
        
        <div className="flex-1 p-3 sm:p-4 lg:p-6">
          <h3 className="text-xs lg:text-sm font-semibold text-gray-400 mb-2 sm:mb-3 lg:mb-4 uppercase tracking-wider">Recent Sessions</h3>
          <div className="space-y-1.5 sm:space-y-2 lg:space-y-3">
            {[
              { title: 'Protein Analysis', time: '2 hours ago', color: 'indigo' },
              { title: 'Chemical Synthesis', time: 'Yesterday', color: 'cyan' },
              { title: 'Lab Equipment Setup', time: '3 days ago', color: 'purple' }
            ].map((session, idx) => (
              <div key={idx} className="group p-2 sm:p-2.5 lg:p-3 rounded-xl lg:rounded-2xl hover:bg-white/5 cursor-pointer transition-all duration-200 border border-transparent hover:border-white/20">
                <div className="flex items-center gap-2 lg:gap-3">
                  <MessageCircle className={`w-3 sm:w-3.5 lg:w-4 h-3 sm:h-3.5 lg:h-4 text-${session.color}-400 group-hover:text-${session.color}-300`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm font-medium text-gray-300 truncate">{session.title}</p>
                    <p className="text-xs text-gray-500">{session.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-3 sm:p-4 lg:p-6 border-t border-white/10">
          <div className="flex items-center gap-2 lg:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-xl lg:rounded-2xl bg-white/5 backdrop-blur-sm">
            <div className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-2.5 sm:w-3 lg:w-4 h-2.5 sm:h-3 lg:h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm font-medium text-gray-300">Researcher</p>
              <p className="text-xs text-gray-500">Premium Access</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 p-3 sm:p-4 lg:p-6 shadow-lg flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 sm:p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
              >
                <Menu className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 sm:w-8 lg:w-12 h-7 sm:h-8 lg:h-12 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                  <Bot className="w-3.5 sm:w-4 lg:w-6 h-3.5 sm:h-4 lg:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-sm sm:text-base lg:text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
                    Laboratory Assistant
                  </h1>
                  <p className="text-xs lg:text-sm text-gray-400 hidden sm:block">Advanced AI for scientific research ✨</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1.5 sm:w-2 lg:w-3 h-1.5 sm:h-2 lg:h-3 bg-emerald-400 rounded-full shadow-sm animate-pulse"></div>
              <span className="text-xs lg:text-sm text-gray-300 font-medium hidden sm:inline">Online</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-3 sm:mx-4 lg:mx-6 mt-2 lg:mt-4 p-3 lg:p-4 bg-red-500/10 border border-red-400/20 rounded-xl lg:rounded-2xl backdrop-blur-sm flex-shrink-0">
            <p className="text-red-400 text-xs sm:text-sm">{error}</p>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 lg:space-y-6 min-h-0">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-2 sm:gap-3 lg:gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              {message.type === 'assistant' && (
                <div className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 text-white" />
                </div>
              )}
              
              <div className={`max-w-[85%] sm:max-w-[80%] lg:max-w-2xl ${message.type === 'user' ? 'order-1' : ''}`}>
                <div className={`rounded-2xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-lg border ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white ml-auto transform hover:scale-105 transition-all duration-200 border-indigo-400/20' 
                    : 'bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-200 text-white'
                }`}>
                  {message.files && message.files.length > 0 && (
                    <div className="mb-2 sm:mb-3 lg:mb-4 space-y-1.5 sm:space-y-2 lg:space-y-3">
                      {message.files.map((file) => (
                        <div key={file.id} className={`flex items-center gap-2 sm:gap-2.5 lg:gap-3 p-2 sm:p-2.5 lg:p-3 rounded-xl lg:rounded-2xl ${
                          message.type === 'user' 
                            ? 'bg-white/20 backdrop-blur-sm' 
                            : 'bg-white/5 backdrop-blur-sm border border-white/10'
                        }`}>
                          {getFileIcon(file.type)}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs sm:text-sm font-semibold truncate ${
                              message.type === 'user' ? 'text-white' : 'text-gray-300'
                            }`}>
                              {file.name}
                            </p>
                            <p className={`text-xs ${
                              message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <p className={`text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-wrap ${
                    message.type === 'assistant' ? 'text-gray-200' : 'text-white'
                  }`}>
                    {message.content}
                  </p>
                </div>
                
                <div className={`text-xs text-gray-500 mt-1 sm:mt-1.5 lg:mt-2 px-2 ${message.type === 'user' ? 'text-right' : ''}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 text-white" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2 sm:gap-3 lg:gap-4 justify-start">
              <div className="w-7 sm:w-8 lg:w-10 h-7 sm:h-8 lg:h-10 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5 text-white" />
              </div>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-lg">
                <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1.5 lg:w-2 h-1.5 lg:h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-gray-300 font-medium text-sm sm:text-base">AI is analyzing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/5 backdrop-blur-xl border-t border-white/10 p-2.5 sm:p-3 lg:p-4 flex-shrink-0">
          {/* File Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mb-2 sm:mb-3 lg:mb-4 flex flex-wrap gap-1.5 sm:gap-2">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-1.5 sm:gap-2 bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-1.5 sm:p-2 border border-white/20 shadow-sm hover:bg-white/10 transition-all duration-200">
                  {getFileIcon(file.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-300 truncate max-w-16 sm:max-w-20 lg:max-w-32">{file.name}</p>
                    <p className="text-xs text-gray-500">({formatFileSize(file.size)})</p>
                  </div>
                  <button 
                    onClick={() => removeFile(file.id)}
                    className="p-0.5 sm:p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-all duration-200"
                  >
                    <X className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2 sm:gap-2.5 lg:gap-3">
            <div className="flex-1 relative">
              <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg border border-white/20 hover:border-indigo-400/50 transition-all duration-200">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about your research... ✨"
                  className="w-full p-2.5 sm:p-3 lg:p-4 pr-10 sm:pr-12 lg:pr-14 rounded-xl sm:rounded-2xl lg:rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400/50 bg-transparent text-white placeholder-gray-400 min-h-[38px] sm:min-h-[44px] lg:min-h-[52px] max-h-[100px] sm:max-h-[120px] text-sm sm:text-base"
                  rows={1}
                  disabled={isLoading}
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-2 sm:right-2.5 lg:right-3 bottom-2 sm:bottom-2.5 lg:bottom-3 p-1.5 sm:p-2 text-gray-400 hover:text-gray-300 hover:bg-white/5 rounded-lg sm:rounded-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  <Paperclip className="w-3.5 sm:w-4 lg:w-5 h-3.5 sm:h-4 lg:h-5" />
                </button>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={(!inputValue.trim() && uploadedFiles.length === 0) || isLoading}
              className="p-2.5 sm:p-3 lg:p-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg sm:rounded-xl lg:rounded-2xl hover:from-indigo-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100"
            >
              {isLoading ? (
                <Loader2 className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 animate-spin" />
              ) : (
                <Send className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6" />
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
          
          <div className="hidden sm:flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 mt-2 lg:mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1 lg:gap-2">
              <kbd className="px-1.5 lg:px-2 py-0.5 lg:py-1 bg-white/5 backdrop-blur-sm rounded-md lg:rounded-lg font-mono text-xs border border-white/20">Enter</kbd>
              to send
            </span>
            <span className="flex items-center gap-1 lg:gap-2">
              <kbd className="px-1.5 lg:px-2 py-0.5 lg:py-1 bg-white/5 backdrop-blur-sm rounded-md lg:rounded-lg font-mono text-xs border border-white/20">Shift + Enter</kbd>
              for new line
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}