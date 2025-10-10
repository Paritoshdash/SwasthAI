import { ChatAssistant } from '../../components/chat-assistant';

export default function ChatbotPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <ChatAssistant />
      </div>
    </div>
  );
}

