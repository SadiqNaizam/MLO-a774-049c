import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  User,
  FileText,
  FileDigit,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
  isGroupLabel?: boolean;
}

const mainNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid, href: '#', isActive: true },
  { id: 'leads', label: 'Leads', icon: Users, href: '#' },
  { id: 'customers', label: 'Customers', icon: User, href: '#' },
  { id: 'proposals', label: 'Proposals', icon: FileText, href: '#', isGroupLabel: true },
  { id: 'invoices', label: 'Invoices', icon: FileDigit, href: '#' },
  { id: 'items', label: 'Items', icon: ShoppingCart, href: '#' },
  { id: 'mail', label: 'Mail', icon: Mail, href: '#', isGroupLabel: true },
  { id: 'shoebox', label: 'Shoebox', icon: Archive, href: '#' },
  { id: 'calendar', label: 'Calendar', icon: CalendarDays, href: '#' },
];

const footerNavItems: NavItem[] = [
  { id: 'helpOld', label: 'Help', icon: HelpCircle, href: '#' }, // Renamed to avoid duplicate id with main 'Help' if any
  { id: 'settings', label: 'Settings', icon: Settings, href: '#' },
  { id: 'help', label: 'Help', icon: HelpCircle, href: '#' }, // This is a separate help as per image
];

const SidebarNav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Menu Button - shown only on small screens, assuming sidebar itself is hidden and this button is placed in TopHeader or similar */}
      <button 
        className="fixed top-4 left-4 z-30 p-2 rounded-md text-gray-700 bg-card md:hidden" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile menu */} 
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black/30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */} 
      <aside 
        className={cn(
          "fixed top-0 left-0 z-20 h-screen w-64 bg-secondary text-secondary-foreground flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
              B
            </div>
            <span className="font-semibold text-xl text-foreground">Logo</span>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {mainNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 rounded-md text-sm font-medium',
                item.isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-background hover:text-foreground',
                item.isGroupLabel && 'mt-4 pt-4 border-t border-border first:mt-0 first:border-t-0'
              )}
            >
              <item.icon className={cn('mr-3 h-5 w-5', item.isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground')} />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          {footerNavItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-background hover:text-foreground'
              )}
            >
              <item.icon className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground" />
              {item.label}
            </a>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SidebarNav;
