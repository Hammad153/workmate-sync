
import React, { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Plus, ChevronDown } from 'lucide-react';
import { setCurrentWorkspace } from '@/store/slices/workspaceSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createWorkspace } from '@/store/slices/workspaceSlice';

const WorkspaceSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { workspaces, currentWorkspace } = useAppSelector(state => state.workspaces);
  const { user } = useAppSelector(state => state.auth);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');

  const handleSelectWorkspace = (workspaceId: string) => {
    const selected = workspaces.find(workspace => workspace.id === workspaceId);
    if (selected) {
      dispatch(setCurrentWorkspace(selected));
    }
  };

  const handleCreateWorkspace = () => {
    if (!user) return;
    
    dispatch(
      createWorkspace({
        name: newWorkspaceName,
        description: newWorkspaceDescription,
        createdBy: user.uid,
        members: [user.uid],
      })
    );
    
    setIsDialogOpen(false);
    setNewWorkspaceName('');
    setNewWorkspaceDescription('');
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center justify-between w-56">
              <span className="truncate">{currentWorkspace?.name || 'Select Workspace'}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Your Workspaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {workspaces.map(workspace => (
              <DropdownMenuItem 
                key={workspace.id} 
                onClick={() => handleSelectWorkspace(workspace.id)}
                className={workspace.id === currentWorkspace?.id ? 'bg-accent' : ''}
              >
                {workspace.name}
              </DropdownMenuItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Create New Workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Workspace</DialogTitle>
            <DialogDescription>Create a new workspace to organize your team's tasks.</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="workspace-name">Workspace Name</Label>
              <Input 
                id="workspace-name" 
                value={newWorkspaceName}
                onChange={(e) => setNewWorkspaceName(e.target.value)}
                placeholder="Marketing Team"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="workspace-description">Description</Label>
              <Textarea 
                id="workspace-description" 
                value={newWorkspaceDescription}
                onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                placeholder="A workspace for our marketing team to collaborate on campaigns."
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateWorkspace} disabled={!newWorkspaceName.trim()}>
              Create Workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkspaceSelector;
