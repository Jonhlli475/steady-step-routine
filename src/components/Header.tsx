
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface HeaderProps {
  openAddHabitForm: () => void;
}

const Header = ({ openAddHabitForm }: HeaderProps) => {
  return (
    <header className="py-6 px-4 md:px-0 flex justify-between items-center border-b">
      <div>
        <h1 className="text-2xl font-bold">Habit Tracker</h1>
        <p className="text-muted-foreground">Track your daily habits and build consistency</p>
      </div>
      <Button onClick={openAddHabitForm} className="flex items-center gap-1">
        <PlusIcon size={16} />
        <span>Add Habit</span>
      </Button>
    </header>
  );
};

export default Header;
