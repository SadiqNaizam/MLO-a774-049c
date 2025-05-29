import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, pageTitle }) => {
  return (
    // h-screen and overflow-hidden on the root div prevent the entire page from scrolling,
    // allowing the main content area to handle its own scroll.
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <Sidebar /> {/* Sidebar is fixed positioned and manages its own state */}
      <Header title={pageTitle || "Leads Dashboard"} /> {/* Header is fixed positioned */}
      
      {/* Main content area starts here. It needs padding to clear fixed Sidebar and Header. */}
      {/* `md:pl-64`: padding-left for sidebar width on medium screens and up. */}
      {/* `pt-[70px]`: padding-top for header height. */}
      {/* `h-full`: takes full height of its parent (which is h-screen). */}
      {/* `overflow-y-auto`: makes this area scrollable if content exceeds its bounds. */}
      <main className="md:pl-64 pt-[70px] h-full overflow-y-auto">
        {/* `p-6`: standard padding for the content within the scrollable area. */}
        {/* `min-w-0`: ensures that flex/grid children within this container can shrink properly. */}
        <div className="p-6 min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
