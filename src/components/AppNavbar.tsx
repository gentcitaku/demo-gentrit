'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, Calculator, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SITE_NAME } from '@/lib/constant'

export function AppNavbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto h-20 px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity flex-shrink-0"
        >
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:inline">
            {SITE_NAME}
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 flex-1 mx-8">
          <Link href="/" className="text-sm hover:text-primary transition-colors">
            Calculators
          </Link>
          <Link href="/about" className="text-sm hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm hover:text-primary transition-colors">
            Contact
          </Link>
          <div className="flex-1 max-w-xs">
            <Input
              placeholder="Search calculators..."
              className="h-9 bg-muted border-muted-foreground/20 text-sm"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          )}
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-full"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-3">
            <Link href="/" className="block text-sm hover:text-primary transition-colors py-2">
              Calculators
            </Link>
            <Link href="/about" className="block text-sm hover:text-primary transition-colors py-2">
              About
            </Link>
            <Link href="/contact" className="block text-sm hover:text-primary transition-colors py-2">
              Contact
            </Link>
            <div className="py-2">
              <Input
                placeholder="Search calculators..."
                className="h-10 bg-muted border-muted-foreground/20 text-sm"
              />
            </div>
            <Link href="#docs" className="block text-sm hover:text-primary transition-colors py-2">
              Documentation
            </Link>
            <a href="#support" className="block text-sm hover:text-primary transition-colors py-2">
              Support
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
