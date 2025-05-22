
import { useState } from "react";
import { Habit, HabitFormData } from "@/types";
import { format, isToday, startOfToday, isSameDay, parseISO } from "date-fns";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "@/hooks/useLocalStorage";
import HabitCard from "./HabitCard";
import AddHabitForm from "./AddHabitForm";
import Header from "./Header";
import EmptyState from "./EmptyState";

const HabitList = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", []);
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState<Habit | undefined>(undefined);

  const handleAddHabit = (habitData: HabitFormData) => {
    if (habitToEdit) {
      // Edit existing habit
      setHabits((currentHabits) =>
        currentHabits.map((habit) =>
          habit.id === habitToEdit.id
            ? { ...habit, ...habitData }
            : habit
        )
      );
      toast.success(`"${habitData.name}" updated successfully!`);
    } else {
      // Add new habit
      const newHabit: Habit = {
        id: uuidv4(),
        name: habitData.name,
        description: habitData.description,
        created: new Date().toISOString(),
        streak: 0,
        completedDates: [],
      };
      setHabits((currentHabits) => [...currentHabits, newHabit]);
      toast.success(`"${habitData.name}" added successfully!`);
    }
  };

  const handleDeleteHabit = (id: string) => {
    const habitToDelete = habits.find(habit => habit.id === id);
    setHabits((currentHabits) => currentHabits.filter((habit) => habit.id !== id));
    if (habitToDelete) {
      toast.success(`"${habitToDelete.name}" deleted successfully!`);
    }
  };

  const handleEditHabit = (habit: Habit) => {
    setHabitToEdit(habit);
    setIsAddHabitOpen(true);
  };

  const closeHabitForm = () => {
    setIsAddHabitOpen(false);
    setHabitToEdit(undefined);
  };

  // Toggle date completion and update streaks
  const handleToggleDate = (habitId: string, dateStr: string) => {
    setHabits((currentHabits) =>
      currentHabits.map((habit) => {
        if (habit.id === habitId) {
          // Check if the date is already completed
          const isCompleted = habit.completedDates.includes(dateStr);
          let completedDates;
          
          if (isCompleted) {
            // Remove the date if it's already completed
            completedDates = habit.completedDates.filter((date) => date !== dateStr);
          } else {
            // Add the date if it's not completed
            completedDates = [...habit.completedDates, dateStr];
          }
          
          // Sort dates to ensure they are in chronological order
          completedDates.sort();
          
          // Calculate streak (consecutive days including today)
          let streak = 0;
          const today = startOfToday();
          
          // Check if today is completed
          const isTodayCompleted = completedDates.some(date => 
            isSameDay(parseISO(date), today)
          );
          
          if (isTodayCompleted) {
            streak = 1;
            
            // Look back at previous days
            let checkDate = today;
            let keepCounting = true;
            
            while (keepCounting) {
              checkDate = new Date(checkDate.setDate(checkDate.getDate() - 1));
              const checkDateStr = format(checkDate, "yyyy-MM-dd");
              
              if (completedDates.includes(checkDateStr)) {
                streak++;
              } else {
                keepCounting = false;
              }
            }
          }
          
          return {
            ...habit,
            completedDates,
            streak,
          };
        }
        return habit;
      })
    );
  };

  return (
    <div className="container max-w-3xl mx-auto py-4">
      <Header openAddHabitForm={() => setIsAddHabitOpen(true)} />
      
      <div className="mt-6">
        {habits.length === 0 ? (
          <EmptyState openAddHabitForm={() => setIsAddHabitOpen(true)} />
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onDelete={handleDeleteHabit}
              onEdit={handleEditHabit}
              onToggleDate={handleToggleDate}
            />
          ))
        )}
      </div>
      
      <AddHabitForm
        isOpen={isAddHabitOpen}
        onClose={closeHabitForm}
        onSave={handleAddHabit}
        existingHabit={habitToEdit}
      />
    </div>
  );
};

export default HabitList;
