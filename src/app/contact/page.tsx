'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SectionDivider } from '@/components/SectionDivider'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { SITE_EMAIL, SITE_NAME } from '@/lib/constant'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      info: SITE_EMAIL,
      description: 'We reply within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      description: 'Mon-Fri, 9am-5pm EST',
    },
    {
      icon: MapPin,
      title: 'Office',
      info: 'San Francisco, CA',
      description: 'Remote-first team',
    },
    {
      icon: Clock,
      title: 'Response Time',
      info: '24 hours',
      description: 'Average response time',
    },
  ]

  const faqs = [
    {
      q: 'Are the calculators accurate?',
      a: 'Yes! All our calculators use industry-standard financial formulas and are regularly updated to ensure accuracy.',
    },
    {
      q: 'Is my data safe?',
      a: 'Absolutely. We do not store any of your financial data. All calculations happen in your browser.',
    },
    {
      q: 'Can I use calculators offline?',
      a: 'Currently, you need an internet connection. We are working on offline functionality.',
    },
    {
      q: 'Do you offer custom calculator development?',
      a: 'Yes! Contact us for custom calculator development for your specific needs.',
    },
    {
      q: 'What browsers are supported?',
      a: 'Finance Calc works on all modern browsers including Chrome, Firefox, Safari, and Edge.',
    },
    {
      q: 'How often are calculators updated?',
      a: 'We update our calculators regularly to reflect changes in tax laws and financial regulations.',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">
              Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </div>

      <SectionDivider />

      {/* Contact Info Cards */}
      <div className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center h-full">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="font-bold text-primary mb-1">{item.info}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Contact Form */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 md:p-12 border-border/50">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium block mb-2">Name</label>
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Subject</label>
                  <Input
                    type="text"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="h-11"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Message</label>
                  <textarea
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full p-3 rounded-lg bg-muted border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary min-h-32 resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  {submitted ? 'Message Sent! Thank you' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>

      <SectionDivider />

      {/* FAQ Section */}
      <div className="px-4 py-16 md:py-24 bg-gradient-to-b from-transparent to-card/20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Answers to common questions about {SITE_NAME}
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 cursor-pointer hover:bg-card/80 transition-colors border-border/50">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
