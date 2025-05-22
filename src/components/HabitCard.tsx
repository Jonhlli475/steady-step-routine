
import { Habit } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import Calendar from "./Calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HabitCardProps {
  habit: Habit;
  onDelete: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onToggleDate: (habitId: string, dateStr: string) => void;
}

const HabitCard = ({ habit, onDelete, onEdit, onToggleDate }: HabitCardProps) => {
  // Check if habit has been completed today
  const isCompletedToday = habit.completedDates.includes(format(new Date(), "yyyy-MM-dd"));

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <div className="flex items-center">
          <button 
            onClick={() => onToggleDate(habit.id, format(new Date(), "yyyy-MM-dd"))}
            className="mr-3"
          >
            <CheckCircle 
              className={isCompletedToday 
                ? "text-habit-active fill-habit-active" 
                : "text-muted hover:text-habit-default transition-colors"} 
              size={24} 
            />
          </button>
          <div>
            <h3 className="font-semibold text-lg">{habit.name}</h3>
            {habit.description && (
              <p className="text-muted-foreground text-sm">{habit.description}</p>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(habit)}>
              <Edit size={14} className="mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(habit.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 size={14} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Calendar 
          completedDates={habit.completedDates} 
          habitId={habit.id}
          onToggleDate={onToggleDate}
        />
        <div className="flex justify-between items-center mt-3 pt-3 border-t">
          <div className="text-sm text-muted-foreground">
            Created {format(new Date(habit.created), "MMM d, yyyy")}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">
              {habit.streak} day streak
            </span>
            {habit.streak > 0 && (
              <span className="text-yellow-500">🔥</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
