import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "./lib/LangContext";
import FloatingAssistant from "./components/FloatingAssistant";

export const metadata: Metadata = {
  title: "VoteQuest — Your Election Education Journey",
  description: "Master the election process through an interactive, AI-powered gamified learning experience. From registration to results — understand every step of democracy.",
  keywords: "voting, election education, voter registration, civic education, election process, भारत चुनाव",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ position: "relative", zIndex: 1 }}>
        <LangProvider>
          {children}
          <FloatingAssistant />
        </LangProvider>
      </body>
    </html>
  );
}
