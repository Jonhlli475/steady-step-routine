
import { format, subDays, isBefore, isEqual, startOfDay } from "date-fns";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  completedDates: string[];
  habitId: string;
  onToggleDate: (habitId: string, dateStr: string) => void;
}

const Calendar = ({ completedDates, habitId, onToggleDate }: CalendarProps) => {
  const [days, setDays] = useState<{ date: Date; dateStr: string }[]>([]);

  useEffect(() => {
    // Generate last 7 days including today
    const generateDays = () => {
      const result = [];
      for (let i = 6; i >= 0; i--) {
        const date = startOfDay(subDays(new Date(), i));
        result.push({
          date,
          dateStr: format(date, "yyyy-MM-dd"),
        });
      }
      return result;
    };

    setDays(generateDays());
  }, []);

  const isDateCompleted = (dateStr: string) => {
    return completedDates.includes(dateStr);
  };

  // Check if date is in the future
  const isDateFuture = (date: Date) => {
    return isBefore(new Date(), date);
  };

  const handleDateClick = (dateStr: string) => {
    onToggleDate(habitId, dateStr);
  };

  return (
    <div className="flex justify-between my-2">
      {days.map(({ date, dateStr }) => {
        const isCompleted = isDateCompleted(dateStr);
        const isFuture = isDateFuture(date);
        const isToday = isEqual(startOfDay(date), startOfDay(new Date()));
        
        return (
          <div 
            key={dateStr} 
            className="flex flex-col items-center gap-1"
          >
            <span className="text-xs text-muted-foreground">
              {format(date, "EEE")}
            </span>
            <button
              disabled={isFuture}
              onClick={() => handleDateClick(dateStr)}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all",
                isToday ? "ring-2 ring-primary" : "",
                isFuture ? "bg-muted cursor-not-allowed opacity-50" : "",
                isCompleted ? "bg-habit-active text-white" : "bg-habit-incomplete hover:bg-habit-default hover:text-white"
              )}
            >
              {format(date, "dd")}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
