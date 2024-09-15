"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SiteConfig } from "@/config/site"
import { CheckCircle2 } from "lucide-react"

interface OfferFormProps {
  config: SiteConfig
  onSuccess: () => void
}

export function OfferForm({ config, onSuccess }: OfferFormProps) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [offerAmount, setOfferAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOfferAmountBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      const roundedValue = Math.round(value * 100) / 100;
      setOfferAmount(roundedValue.toFixed(2));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      console.log('Submitting offer:', { firstName, lastName, email, offerAmount, message });
      const response = await fetch('/api/submit-offer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, offerAmount, message }),
      });

      const data = await response.json();
      console.log('Full API Response:', data);

      if (data.success) {
        setIsSubmitted(true);
        onSuccess();
        setFirstName("");
        setLastName("");
        setEmail("");
        setOfferAmount("");
        setMessage("");
      } else {
        throw new Error(data.error || 'Failed to send offer');
      }
    } catch (error) {
      console.error('Error submitting offer:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!isSubmitted ? (
        <motion.form 
          key="form"
          initial={false}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit} 
          onKeyDown={handleKeyDown}
          className="space-y-4 mb-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="bg-white border-gray-200 focus:border-gray-500 transition-colors duration-300"
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="bg-white border-gray-200 focus:border-gray-500 transition-colors duration-300"
            />
          </div>
          <Input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white border-gray-200 focus:border-gray-500 transition-colors duration-300"
          />
          <Input
            type="number"
            placeholder={`Your Offer Amount (${config.currency})`}
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            onBlur={handleOfferAmountBlur}
            required
            min="0.01"
            step="0.01"
            className="bg-white border-gray-200 focus:border-gray-500 transition-colors duration-300"
          />
          <Textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="bg-white border-gray-200 focus:border-gray-500 transition-colors duration-300"
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button 
            type="submit" 
            className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Offer"}
          </Button>
        </motion.form>
      ) : (
        <motion.div 
          key="thank-you"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-center space-y-3 pb-12"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl"
          >
            Thank You!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500"
          >
            Your offer has been successfully submitted. We&apos;ll be in touch soon.
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}