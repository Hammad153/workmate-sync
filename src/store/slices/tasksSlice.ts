
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
  assignedTo: string[];
  workspaceId: string;
  createdBy: string;
}

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasks: (state, action: PayloadAction<string>) => {
      // No-op in frontend-only version
    },
    createTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
      };
      state.tasks.push(newTask);
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<{ taskId: string; updates: Partial<Task> }>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.taskId);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload.updates };
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const { fetchTasks, createTask, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
