import { ConditionalLayout } from "./conditional-layout";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import Chatbot from "./chatbot"; // Import the chatbot

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConditionalLayout>
        <Navbar />
      </ConditionalLayout>
      <main className="min-h-screen">{children}</main>
      <Footer />
      <Chatbot /> {/* Add the chatbot here */}
    </>
  );
}

