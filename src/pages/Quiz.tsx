import EcoHeader from "@/components/eco-header";
import QuizForm from "@/components/quiz-form";

export default function QuizPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <EcoHeader />
      <main className="flex-grow">
        <QuizForm />
      </main>
    </div>
  );
}