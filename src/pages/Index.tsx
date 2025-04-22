
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4 lg:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-lg bg-gradient-to-r from-workmate-500 to-workmate-700 bg-clip-text text-transparent">
              WorkMate Sync
            </span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-workmate-500 to-workmate-700 bg-clip-text text-transparent">
              Welcome to WorkMate Sync
            </h1>
            <p className="mt-2 text-muted-foreground">
              Collaborate with your team in real-time, manage tasks efficiently.
            </p>
          </div>
          
          <AuthForm />
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 WorkMate Sync. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
