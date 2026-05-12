import React from 'react';
import { cn } from '../lib/utils';

export function ItecLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center overflow-hidden", className)}>
      <img 
        src="/api/artifacts/45a32d27-2da9-4792-a016-db47d13993ff/bf7b750a-e39d-472d-8fdb-00f73c683b54" 
        alt="itec+ Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
