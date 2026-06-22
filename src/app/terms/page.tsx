'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { SITE_NAME } from '@/lib/constant'

export default function Terms() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content:
        'By accessing and using Finance Calc, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      title: '2. Use License',
      content:
        'Permission is granted to temporarily download one copy of the materials (information or software) on Finance Calc for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:',
      items: [
        'Modify or copy the materials',
        'Use the materials for any commercial purpose or for any public display',
        'Attempt to decompile or reverse engineer any software contained on Finance Calc',
        'Transfer the materials to another person or "mirror" the materials on any other server',
        'Attempt to gain unauthorized access to any portion or feature of the service',
      ],
    },
    {
      title: '3. Disclaimer',
      content:
        'The materials on Finance Calc are provided on an "as is" basis. Finance Calc makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    },
    {
      title: '4. Limitations',
      content:
        'In no event shall Finance Calc or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Finance Calc, even if Finance Calc or an authorized representative has been notified orally or in writing of the possibility of such damage.',
    },
    {
      title: '5. Accuracy of Materials',
      content:
        'The materials appearing on Finance Calc could include technical, typographical, or photographic errors. Finance Calc does not warrant that any of the materials on the website are accurate, complete, or current. Finance Calc may make changes to the materials contained on its website at any time without notice.',
    },
    {
      title: '6. Materials Copyright',
      content:
        'The materials on Finance Calc are copyrighted and any unauthorized use of them is prohibited without the express written consent of Finance Calc. You may use the calculators for personal, non-commercial use only.',
    },
    {
      title: '7. Limitations on Liability',
      content:
        'Finance Calc shall not be liable for any damages, losses, or costs arising from the use of our calculators. The calculations provided are for informational purposes only and should not be considered professional financial advice.',
    },
    {
      title: '8. User Conduct',
      content:
        'You agree not to access Finance Calc for any purpose other than that for which we make the website available. You further agree to use this website in a manner consistent with all applicable laws and regulations.',
    },
    {
      title: '9. Privacy Policy',
      content:
        'Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our privacy practices.',
    },
    {
      title: '10. Modification of Terms',
      content:
        'Finance Calc may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-6 md:p-8 border-border/50 bg-card/50">
            <p className="text-muted-foreground">
              Please read these terms of service carefully before using {SITE_NAME}. Your access to and use of {SITE_NAME} 
              is conditioned on your acceptance of and compliance with these terms. If you do not agree with these terms, please 
              do not use our website.
            </p>
          </Card>

          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
            >
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
              </Card>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 md:p-8 border-border/50 bg-primary/5">
              <h3 className="font-bold mb-4">Questions?</h3>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please{' '}
                <a href="/contact" className="text-primary hover:underline">
                  contact us
                </a>
                .
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
