
export interface Habit {
  id: string;
  name: string;
  description?: string;
  created: string;
  streak: number;
  completedDates: string[];
}

export type HabitFormData = {
  name: string;
  description?: string;
}

export interface HabitDay {
  date: string;
  isCompleted: boolean;
}
