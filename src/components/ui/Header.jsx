import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-athletic-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="Timer" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">Pace Calculator</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button
            variant="ghost"
            className="text-foreground hover:text-primary hover:bg-muted"
            onClick={() => window.location.href = '/running-pace-calculator'}
          >
            Pace Calculator
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary hover:bg-muted"
          >
            Training Zones
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary hover:bg-muted"
          >
            Race Predictor
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary hover:bg-muted"
          >
            Analytics
          </Button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            className="text-muted-foreground hover:text-primary"
          >
            Settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="User"
            iconPosition="left"
          >
            Profile
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            onClick={toggleMobileMenu}
            className="text-foreground"
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-athletic-md animate-slide-down">
          <nav className="px-4 py-3 space-y-1">
            <Button
              variant="ghost"
              fullWidth
              className="justify-start text-foreground hover:text-primary hover:bg-muted"
              onClick={() => {
                window.location.href = '/running-pace-calculator';
                setIsMobileMenuOpen(false);
              }}
            >
              Pace Calculator
            </Button>
            <Button
              variant="ghost"
              fullWidth
              className="justify-start text-muted-foreground hover:text-primary hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Training Zones
            </Button>
            <Button
              variant="ghost"
              fullWidth
              className="justify-start text-muted-foreground hover:text-primary hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Race Predictor
            </Button>
            <Button
              variant="ghost"
              fullWidth
              className="justify-start text-muted-foreground hover:text-primary hover:bg-muted"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Analytics
            </Button>
            <div className="pt-2 mt-2 border-t border-border">
              <Button
                variant="ghost"
                fullWidth
                iconName="Settings"
                iconPosition="left"
                className="justify-start text-muted-foreground hover:text-primary hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Button>
              <Button
                variant="ghost"
                fullWidth
                iconName="User"
                iconPosition="left"
                className="justify-start text-muted-foreground hover:text-primary hover:bg-muted"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;