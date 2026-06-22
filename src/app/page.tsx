'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CalculatorCard } from '@/components/CalculatorCard'
import { calculators, categories } from '@/lib/calculatorData'
import { SectionDivider } from '@/components/SectionDivider'
import { FeatureCard } from '@/components/FeatureCard'
import { Testimonial } from '@/components/Testimonial'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X, ArrowRight, TrendingUp, Zap, Shield, BarChart3, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/constant'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCalculators = useMemo(() => {
    return calculators.filter(calc => {
      const matchesSearch =
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || calc.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  return (
    <div className="w-full bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 py-16 md:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-semibold text-primary">18 Financial Tools at Your Fingertips</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
              Master Your Finances
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              The all-in-one financial calculator suite designed to help you make smarter financial decisions. 
              From loans and investments to retirement planning and tax calculations.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="#calculators">
                <Button className="px-8 h-12 text-base bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 group">
                  Explore Calculators <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" className="px-8 h-12 text-base">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { number: '18+', label: 'Financial Tools' },
              { number: '10K+', label: 'Active Users' },
              { number: '100%', label: 'Free Access' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center p-6 rounded-lg bg-card border border-border/50"
                whileHover={{ y: -4 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Calculators Section - NOW ON TOP */}
      <div id="calculators" className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Financial Calculators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our complete suite of 18+ financial tools
            </p>
          </motion.div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Input
              placeholder="Search calculators by name or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-4 text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 p-1 hover:bg-muted rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Calculators Grid */}
        {filteredCalculators.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredCalculators.map((calculator, index) => (
              <CalculatorCard key={calculator.id} calculator={calculator} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-2">No calculators found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
        </div>
      </div>

      <SectionDivider />

      {/* Features Section */}
      <div className="px-4 py-16 md:py-24 bg-gradient-to-b from-transparent to-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose {SITE_NAME}?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed financial decisions in one place
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={TrendingUp}
              title="Accurate Calculations"
              description="Real-time calculations with industry-standard financial formulas"
              index={0}
            />
            <FeatureCard
              icon={Zap}
              title="Instant Results"
              description="Get results instantly as you type without any delays"
              index={1}
            />
            <FeatureCard
              icon={Shield}
              title="100% Private"
              description="Your financial data stays private and is never stored"
              index={2}
            />
            <FeatureCard
              icon={BarChart3}
              title="Visual Reports"
              description="Interactive charts and graphs to visualize your calculations"
              index={3}
            />
            <FeatureCard
              icon={CheckCircle}
              title="Easy to Use"
              description="Intuitive interface designed for everyone, no financial expertise needed"
              index={4}
            />
            <FeatureCard
              icon={ArrowRight}
              title="Mobile Friendly"
              description="Access all tools seamlessly on desktop, tablet, or mobile"
              index={5}
            />
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* How It Works Section */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: 1, title: 'Choose', description: 'Select the calculator that matches your financial need' },
              { step: 2, title: 'Input', description: 'Enter your financial details and parameters' },
              { step: 3, title: 'Analyze', description: 'Get instant results and visual reports' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-6 -right-4 text-primary">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Testimonials Section */}
      <div className="px-4 py-16 md:py-24 bg-gradient-to-b from-transparent to-card/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Users</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our users have to say
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial
              quote="Finance Calc made it so easy to calculate my EMI. The interface is clean and the results are accurate. Highly recommended!"
              author="Rajesh Kumar"
              role="Software Engineer"
              index={0}
            />
            <Testimonial
              quote="I used the SIP calculator to plan my investment strategy. Great tool for making informed financial decisions."
              author="Priya Sharma"
              role="Financial Consultant"
              index={1}
            />
            <Testimonial
              quote="The retirement calculator helped me understand my financial goals better. Simple yet powerful!"
              author="Amit Patel"
              role="Business Owner"
              index={2}
            />
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* CTA Section */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make Better Financial Decisions?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start using our financial calculators today. No signup required, completely free, and 100% private.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#calculators">
                <Button className="px-8 h-12 text-base bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 group">
                  Start Calculating <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="px-8 h-12 text-base">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
