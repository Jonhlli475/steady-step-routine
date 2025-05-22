
import HabitList from "@/components/HabitList";
import { Toaster } from "sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <HabitList />
    </div>
  );
};

export default Index;
