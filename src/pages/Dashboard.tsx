
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import TaskBoard from '@/components/tasks/TaskBoard';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { fetchWorkspaces } from '@/store/slices/workspaceSlice';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  
  useEffect(() => {
    if (user) {
      dispatch(fetchWorkspaces(user.uid));
    }
  }, [dispatch, user]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 lg:p-6 flex flex-col">
        <TaskBoard />
      </main>
    </div>
  );
};

export default Dashboard;
