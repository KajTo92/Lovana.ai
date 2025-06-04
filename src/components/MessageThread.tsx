import { MessageCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

interface MessageThreadProps {
  messages: Message[];
  suggestedReplies?: string[];
  onSelectReply?: (reply: string) => void;
}

const MessageThread = ({ messages, suggestedReplies, onSelectReply }: MessageThreadProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-primary text-white p-4">
        <div className="flex items-center space-x-2">
          <MessageCircle size={20} />
          <h3 className="font-semibold">Conversation</h3>
        </div>
      </div>
      
      <div className="p-4 max-h-[400px] overflow-y-auto space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.isUser
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${message.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                {message.timestamp}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {suggestedReplies && suggestedReplies.length > 0 && (
        <div className="p-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-500 mb-3">Suggested Replies</h4>
          <div className="space-y-2">
            {suggestedReplies.map((reply, index) => (
              <motion.button
                key={index}
                className="block w-full text-left bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-gray-800 transition-colors"
                onClick={() => onSelectReply && onSelectReply(reply)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {reply}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageThread;