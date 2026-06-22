'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SectionDivider } from '@/components/SectionDivider'
import { FeatureCard } from '@/components/FeatureCard'
import { Target, Users, Zap, Globe } from 'lucide-react'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/constant'

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Accuracy',
      description: 'We use industry-standard formulas to ensure every calculation is precise and reliable.',
    },
    {
      icon: Users,
      title: 'Accessibility',
      description: 'Financial tools should be available to everyone, regardless of expertise level.',
    },
    {
      icon: Zap,
      title: 'Simplicity',
      description: 'We believe complex financial concepts can be simplified without losing accuracy.',
    },
    {
      icon: Globe,
      title: 'Privacy',
      description: 'Your financial data is yours alone. We never store or share any information.',
    },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      description: 'Financial tech enthusiast with 10+ years in fintech',
    },
    {
      name: 'Michael Chen',
      role: 'Head of Product',
      description: 'Product design expert focused on user experience',
    },
    {
      name: 'Priya Desai',
      role: 'Finance Advisor',
      description: 'Certified financial planner and investment advisor',
    },
    {
      name: 'James Wilson',
      role: 'Lead Developer',
      description: 'Full-stack developer with expertise in financial systems',
    },
  ]

  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About {SITE_NAME}</h1>
            <p className="text-xl text-muted-foreground">
              We&apos;re on a mission to democratize financial literacy and empower people to make smarter financial decisions.
            </p>
          </motion.div>
        </div>
      </div>

      <SectionDivider />

      {/* Mission & Vision */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              {SITE_NAME} was created with a simple mission: to make financial calculations accessible to everyone.
            </p>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              We believe that everyone deserves access to accurate financial tools without complexity, jargon, or cost barriers.
              Our calculators are designed to be intuitive, reliable, and helpful for anyone planning their financial future.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you&apos;re calculating your first loan EMI or planning retirement, {SITE_NAME} is here to support your financial journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              We envision a world where financial literacy is universal and financial anxiety is minimal.
            </p>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              By providing free, accurate, and easy-to-use financial calculators, we&apos;re taking a step towards this vision.
            </p>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              We plan to expand our tool suite continuously, adding more calculators, features, and educational content to help users make informed financial decisions.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join us in making financial management simple, accessible, and stress-free for everyone.
            </p>
          </motion.div>
        </div>
      </div>

      <SectionDivider />

      {/* Core Values */}
      <div className="px-4 py-16 md:py-24 bg-gradient-to-b from-transparent to-card/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <FeatureCard
                key={i}
                icon={value.icon}
                title={value.title}
                description={value.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Team Section */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate individuals dedicated to financial empowerment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center h-full border-border/50">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Story Section */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                {SITE_NAME} started as a personal project when our founder, Sarah Johnson, struggled to find simple, 
                accurate financial calculators during her personal financial planning.
              </p>
              <p>
                After hours of searching, she decided to build her own calculators and share them with others. 
                The response was overwhelming, with thousands of people finding value in these simple, straightforward tools.
              </p>
              <p>
                What began as a side project has grown into a full-fledged platform dedicated to making financial management 
                accessible and stress-free for everyone.
              </p>
              <p>
                Today, {SITE_NAME} is trusted by thousands of users worldwide who use our calculators to make informed 
                financial decisions, plan their futures, and achieve their financial goals.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <SectionDivider />

      {/* CTA Section */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start using our financial calculators today and take the first step towards financial empowerment.
            </p>
            <Link href="/#calculators">
              <Button className="px-8 h-12 text-base bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                Explore Our Calculators
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
