import React from 'react';

const Header = () => {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-athletic-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/assets/images/logo.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
            <div className="text-right">
              <h1 className="text-2xl font-bold text-foreground">12-Minute Run Pace Calculator</h1>
              <p className="text-sm text-muted-foreground">Enter your max distance in meters. See HYROX pace, training zones, and interval times.</p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;