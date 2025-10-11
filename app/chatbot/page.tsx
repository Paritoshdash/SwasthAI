import { ChatAssistant } from '../../components/chatbot';

export default function ChatbotPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        {/* Corrected the component name to match the import */}
        <ChatAssistant />
      </div>
    </div>
  );
}
