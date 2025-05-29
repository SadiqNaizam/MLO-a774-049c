import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import FunnelCountSection from '@/components/Dashboard/FunnelCountSection';
import SourcesBreakdown from '@/components/Dashboard/SourcesBreakdown';
import LeadsTracking from '@/components/Dashboard/LeadsTracking';
import ReasonsLostSection from '@/components/Dashboard/ReasonsLostSection';
import OtherDataSection from '@/components/Dashboard/OtherDataSection';

/**
 * LeadsDashboardPage
 * 
 * This page serves as the main dashboard for viewing leads-related metrics and visualizations.
 * It uses the MainAppLayout to provide the overall site structure (sidebar and header)
 * and arranges various dashboard components in a grid layout for the main content area.
 */
const LeadsDashboardPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Leads Dashboard">
      {/* 
        The main content area of the dashboard is structured as a grid.
        Layout Requirements for mainContent: container: "grid grid-cols-2 gap-6"
        - On medium screens and above (md:), it's a 2-column grid.
        - On smaller screens, it defaults to a single column (grid-cols-1).
        - A gap of 6 units (Tailwind's default spacing scale, typically 1.5rem or 24px) is applied between grid items.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First row of dashboard widgets */}
        <FunnelCountSection />
        <SourcesBreakdown />

        {/* 
          Second row: LeadsTracking component.
          This component is designed to span two columns on medium screens and wider.
          The col-span-1 md:col-span-2 class is typically applied within the LeadsTracking component itself on its root Card element.
        */}
        <LeadsTracking />

        {/* Third row of dashboard widgets */}
        <ReasonsLostSection />
        <OtherDataSection />
      </div>
    </MainAppLayout>
  );
};

export default LeadsDashboardPage;
