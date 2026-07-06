import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { useChatHistory } from '../../../modules/chat/query/useChatHistory';
import { useSendMessage } from '../../../modules/chat/mutation/useSendMessage';
import { usePersonas } from '../../../modules/chat/query/usePersonas';
import { Send, Bot, User, Loader2 } from 'lucide-react';

type ChatFormValues = {
  prompt: string;
};

function ChatPage() {
  const { personaSlug } = useParams<{ personaSlug: string }>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch persona details
  const { data: personasData } = usePersonas();
  const currentPersona = personasData?.personas?.find(p => p.slug === personaSlug);

  // Fetch history & setup message send mutation
  const { data: historyData, isLoading: isHistoryLoading } = useChatHistory(personaSlug);
  const { mutateAsync: sendMessage, isPending: isSending } = useSendMessage();

  const messages = historyData?.messages ?? [];

  // Formik for the message input
  const formik = useFormik<ChatFormValues>({
    initialValues: { prompt: '' },
    onSubmit: async (values, { resetForm }) => {
      if (!values.prompt.trim() || !personaSlug) return;
      
      const currentPrompt = values.prompt;
      resetForm();

      try {
        await sendMessage({
          prompt: currentPrompt,
          personaSlug
        });
      } catch (error) {
        console.error("Failed to send message", error);
      }
    }
  });

  // Scroll to bottom on new messages or loading states
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending, isHistoryLoading]);

  return (
    <div className="flex-1 flex flex-col bg-app h-full overflow-hidden">
      {/* Chat Header */}
      <div className="h-16 bg-card border-b border-border px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            {currentPersona?.avatarUrl ? (
              <img
                src={currentPersona.avatarUrl}
                alt={currentPersona?.name}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <Bot className="w-5 h-5" />
            )}
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">
              {currentPersona?.name ?? "AI Assistant"}
            </h2>
            <span className="text-[10px] font-mono text-success flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Messages Window */}
      <div className="flex-grow overflow-y-auto px-6 py-6 space-y-4">
        {isHistoryLoading ? (
          <div className="h-full flex flex-col items-center justify-center py-20 gap-2">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="text-neutral text-xs font-mono">Loading history...</span>
          </div>
        ) : (
          <>
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="bg-tertiary p-4 rounded-full border border-border mb-4">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-white font-bold text-base">Start the Conversation</h3>
                <p className="text-neutral text-xs max-w-sm mt-1">
                  Send a message below to prompt {currentPersona?.name ?? "this persona"} and receive a customized response.
                </p>
              </div>
            )}

            {messages.map((message, index) => {
              const isUser = message.role === 'user';
              const text = message.parts?.[0]?.text ?? '';
              
              return (
                <div
                  key={message._id ?? index}
                  className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  {/* Bubble Icon */}
                  {isUser ? (
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border bg-primary/10 border-primary/20 text-primary">
                      <User className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border bg-tertiary border-border overflow-hidden text-neutral">
                      {currentPersona?.avatarUrl ? (
                        <img src={currentPersona.avatarUrl} alt={currentPersona.name} className="w-full h-full object-cover" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                  )}

                  {/* Bubble Bubble */}
                  <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-md
                    ${isUser
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-card border border-border text-gray-100 rounded-tl-none'
                    }`}
                  >
                    {text}
                  </div>
                </div>
              );
            })}

            {/* AI Typing Indicator */}
            {isSending && (
              <div className="flex gap-3 mr-auto items-end">
                <div className="w-8 h-8 rounded-lg bg-tertiary border border-border flex items-center justify-center overflow-hidden text-neutral shrink-0">
                  {currentPersona?.avatarUrl ? (
                    <img src={currentPersona.avatarUrl} alt={currentPersona.name} className="w-full h-full object-cover" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                <div className="bg-card border border-border text-neutral rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-2">
                  <span className="font-mono text-xs text-neutral">typing</span>
                  <span className="flex gap-1 items-center justify-center h-2 mt-1 shrink-0">
                    <span className="w-1.5 h-1.5 bg-neutral rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-neutral rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-neutral rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Message Form */}
      <div className="p-4 bg-card border-t border-border shrink-0">
        <form onSubmit={formik.handleSubmit} className="flex gap-3 items-center">
          <input
            name="prompt"
            type="text"
            autoComplete="off"
            value={formik.values.prompt}
            onChange={formik.handleChange}
            placeholder={`Message ${currentPersona?.name ?? "AI"}...`}
            disabled={isSending}
            className="flex-grow bg-tertiary text-white placeholder:text-neutral/65 text-sm rounded-xl border border-border px-4 py-3.5 outline-none focus:border-primary transition-colors disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isSending || !formik.values.prompt.trim()}
            className="p-3.5 rounded-xl bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:hover:bg-primary text-white transition-all shadow-lg shadow-primary/10 hover:shadow-primary/20 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatPage;
