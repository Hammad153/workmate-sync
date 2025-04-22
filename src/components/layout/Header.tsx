
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { signOut } from '@/store/slices/authSlice';
import WorkspaceSelector from '@/components/workspace/WorkspaceSelector';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  
  const handleSignOut = () => {
    dispatch(signOut());
  };
  
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 lg:px-6 gap-4">
        <div className="flex items-center gap-2 font-semibold">
          <span className="text-lg bg-gradient-to-r from-workmate-500 to-workmate-700 bg-clip-text text-transparent">
            WorkMate Sync
          </span>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <WorkspaceSelector />
          
          {user && (
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
