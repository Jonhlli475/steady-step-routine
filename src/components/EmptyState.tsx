
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface EmptyStateProps {
  openAddHabitForm: () => void;
}

const EmptyState = ({ openAddHabitForm }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 mt-8 text-center border-2 border-dashed rounded-lg">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <PlusIcon size={24} className="text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        Start tracking your habits to build better routines and improve consistency in your daily life.
      </p>
      <Button onClick={openAddHabitForm}>
        <PlusIcon size={16} className="mr-1" />
        Add your first habit
      </Button>
    </div>
  );
};

export default EmptyState;
