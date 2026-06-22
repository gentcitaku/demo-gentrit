'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SITE_NAME } from '@/lib/constant'

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Security', href: '#security' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Resources: [
    { label: 'Documentation', href: '#docs' },
    { label: 'Guides', href: '#guides' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/10">
      {/* Newsletter Section */}
      <div className="border-b border-border/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Subscribe to our newsletter</h3>
              <p className="text-muted-foreground">
                Get the latest financial tips and calculator updates delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-12 bg-muted border-muted-foreground/20"
              />
              <Button className="h-12 px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
             {SITE_NAME}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              The all-in-one financial calculator suite for smarter financial decisions.
            </p>
          </motion.div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-border/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
