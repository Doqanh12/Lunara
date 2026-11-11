import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../../types';

export const AiConsultantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: 'Xin chào! Mình là LUNARA AI - Chuyên viên tư vấn da liễu & mỹ phẩm thuần chay 24/7. Bạn đang quan tâm đến cải thiện nếp nhăn, làm dịu da nhạy cảm hay muốn tìm hiểu về sản phẩm nào của LUNARA hôm nay?',
      timestamp: 'Vừa xong',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    'Routine cho da nhạy cảm dễ ửng đỏ',
    'Sun Veil SPF 50+ có để lại vệt trắng không?',
    'Cách gửi vỏ chai rỗng đổi voucher 50k',
    'Chamomile Serum có tác dụng gì?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: 'Vừa xong',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể kết nối đến máy chủ');
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Cảm ơn bạn. Chuyên viên LUNARA luôn sẵn sàng hỗ trợ!',
        timestamp: 'Vừa xong',
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      // Graceful fallback response
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: 'Cảm ơn bạn! Với làn da nhạy cảm hoặc đang tìm kiếm giải pháp Organic Wrinkle, LUNARA khuyên bạn nên sử dụng kết hợp bộ đôi **Chamomile Serum** (làm dịu phục hồi) và **GreenCalm Night Cream** (chống nhăn ban đêm). Bạn có thể click vào Cửa hàng để xem chi tiết bảng thành phần minh bạch 100% nhé!',
          timestamp: 'Vừa xong',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#2A4B37] hover:bg-[#1E3728] text-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-[#416850]"
          aria-label="Tư vấn da liễu AI"
        >
          <div className="w-8 h-8 rounded-full bg-[#FAF9F5] text-[#2A4B37] flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 text-[#C29B38]" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-bold leading-none">LUNARA AI</p>
            <p className="text-[10px] text-[#C6DACB]">Tư vấn da 24/7</p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute top-1 right-1 border-2 border-white" />
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[400px] h-[540px] bg-white rounded-3xl shadow-2xl border border-[#DCD6C8] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Chat Header */}
          <div className="p-4 bg-[#2A4B37] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#D4AF37]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Trợ Lý Da Liễu LUNARA AI</span>
                  <span className="text-[10px] bg-[#3B664B] text-[#D8EADB] px-1.5 py-0.5 rounded font-normal">
                    24/7
                  </span>
                </h3>
                <p className="text-[11px] text-[#B8CDBF]">Tư vấn thuần chay & chăm sóc da an toàn</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
              aria-label="Thu nhỏ chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF9F5]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#E5EFE8] text-[#2A4B37] flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#2A4B37] text-white rounded-br-xs'
                      : 'bg-white text-[#2B382E] border border-[#E3DFD5] rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-xs text-[#7A8B7E] italic">
                <div className="w-7 h-7 rounded-full bg-[#E5EFE8] text-[#2A4B37] flex items-center justify-center shrink-0">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2A4B37]" />
                </div>
                <span>Chuyên gia AI đang phân tích phác đồ...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-[#EDE8DC] overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="text-[11px] bg-[#F2F7F4] hover:bg-[#E2EDE5] text-[#2A4B37] px-2.5 py-1 rounded-lg border border-[#D2E2D6] cursor-pointer transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#E7E4DC] flex items-center gap-2">
            <input
              type="text"
              placeholder="Hỏi về nếp nhăn, da nhạy cảm, đơn hàng..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[#D5DCD6] focus:outline-none focus:border-[#2A4B37] text-[#1F3325]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="p-2 bg-[#2A4B37] hover:bg-[#1E3728] text-white rounded-xl transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              title="Gửi câu hỏi"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
