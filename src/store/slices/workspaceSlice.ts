
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Workspace {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  members: string[];
}

interface WorkspacesState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  loading: boolean;
  error: string | null;
}

const initialState: WorkspacesState = {
  workspaces: [],
  currentWorkspace: null,
  loading: false,
  error: null,
};

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    fetchWorkspaces: (state, action: PayloadAction<string>) => {
      // No-op in frontend-only version
    },
    createWorkspace: (state, action: PayloadAction<Omit<Workspace, 'id'>>) => {
      const newWorkspace = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
      };
      state.workspaces.push(newWorkspace);
      state.currentWorkspace = newWorkspace;
    },
    setCurrentWorkspace: (state, action: PayloadAction<Workspace>) => {
      state.currentWorkspace = action.payload;
    },
  },
});

export const { fetchWorkspaces, createWorkspace, setCurrentWorkspace } = workspacesSlice.actions;
export default workspacesSlice.reducer;
