'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { SITE_EMAIL } from '@/lib/constant'

export default function Privacy() {
  const sections = [
    {
      title: 'Introduction',
      content:
        'At Finance Calc, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you use our website and services.',
    },
    {
      title: '1. Information We Collect',
      subsections: [
        {
          title: 'Information You Provide',
          content:
            'When you use our contact form or send us inquiries, we collect information such as your name, email address, and message content. This information is used solely to respond to your inquiries.',
        },
        {
          title: 'Automatic Information',
          content:
            'When you visit Finance Calc, we automatically collect certain information about your device and how you interact with our website, including IP address, browser type, and pages visited. This information helps us understand how users interact with our platform.',
        },
        {
          title: 'Calculator Data',
          content:
            'All calculations are performed directly in your browser. We do not store, transmit, or process any financial data you enter into our calculators. Your financial information remains completely private and on your device only.',
        },
      ],
    },
    {
      title: '2. How We Use Your Information',
      content:
        'We use the information we collect to:',
      items: [
        'Improve and maintain our website and services',
        'Respond to your inquiries and requests',
        'Send you updates and newsletters (if you opt-in)',
        'Analyze usage patterns to enhance user experience',
        'Prevent fraud and ensure security',
        'Comply with legal obligations',
      ],
    },
    {
      title: '3. Data Security',
      content:
        'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is completely secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.',
    },
    {
      title: '4. Cookies and Tracking',
      content:
        'Finance Calc may use cookies and similar tracking technologies to enhance your experience. These help us remember your preferences and understand how you use our website. You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of our website.',
    },
    {
      title: '5. Third-Party Links',
      content:
        'Finance Calc may contain links to third-party websites. We are not responsible for the privacy practices or content of these external websites. Please review their privacy policies before sharing any personal information.',
    },
    {
      title: '6. Analytics',
      content:
        'We use analytics tools to understand how users interact with our website. These tools may collect information about your browsing behavior. All such data is anonymous and cannot be traced back to your personal identity.',
    },
    {
      title: '7. Children\'s Privacy',
      content:
        'Finance Calc is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will delete such information and terminate the child\'s account.',
    },
    {
      title: '8. Your Rights',
      content:
        'Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. To exercise these rights, please contact us at hello@financecalc.com.',
    },
    {
      title: '9. Changes to This Privacy Policy',
      content:
        'We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website with a new "last updated" date.',
    },
    {
      title: '10. Contact Us',
      content:
        'If you have any questions about this Privacy Policy or our privacy practices, please contact us at:',
      contact: true,
    },
  ]

  return (
    <div className="w-full bg-background">
      {/* Header Section */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
            >
              {section.subsections ? (
                <Card className="p-6 md:p-8 border-border/50 hover:bg-card/80 transition-colors">
                  <h2 className="text-xl font-bold mb-6 text-primary">{section.title}</h2>
                  <div className="space-y-6">
                    {section.subsections.map((subsection, i) => (
                      <div key={i}>
                        <h3 className="font-semibold mb-2">{subsection.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{subsection.content}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ) : (
                <Card className="p-6 md:p-8 border-border/50 hover:bg-card/80 transition-colors">
                  <h2 className="text-xl font-bold mb-4 text-primary">{section.title}</h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{section.content}</p>
                  {section.items && (
                    <ul className="space-y-2 ml-4">
                      {section.items.map((item, i) => (
                        <li key={i} className="text-muted-foreground text-sm flex items-start">
                          <span className="mr-3">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.contact && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <p className="text-muted-foreground text-sm">
                        Email:{' '}
                        <a href={`mailto:${SITE_EMAIL}`} className="text-primary hover:underline">
                         {SITE_EMAIL}
                        </a>
                      </p>
                    </div>
                  )}
                </Card>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
