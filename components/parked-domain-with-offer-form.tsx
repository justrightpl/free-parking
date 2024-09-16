"use client"

import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Tag, ArrowRight, Github } from "lucide-react"
import { SiteConfig } from "@/config/site"
import { OfferForm } from '@/components/offer-form'

interface ParkedDomainWithOfferFieldProps {
  config: SiteConfig
}

import { Toaster } from "@/components/ui/toaster"

export function ParkedDomainWithOfferField({ config }: ParkedDomainWithOfferFieldProps) {
  const { toast } = useToast()

  return (
    <div className="min-h-screen flex flex-col bg-gray-100/80 text-gray-900">
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24 max-w-2xl">
        <h1 className="md:text-5xl text-3xl  font-bold mb-2 tracking-tight">{config.domain}</h1>
        <p className="md:text-xl text-lg  text-gray-500 mb-12">{config.description}</p>
        
        <div className="bg-white p-8 rounded-lg shadow-sm mb-12 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Tag className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <span className="text-sm text-gray-500 block">List Price</span>
                <span className="md:text-3xl text-2xl font-medium text-green-600">
                  {new Intl.NumberFormat(undefined, { style: 'currency', currency: config.currency }).format(config.listPrice)}
                </span>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm">{config.metaDescription}</p>
        </div>

        {config.isSubmitOfferEnabled ? (
          <OfferForm config={config} onSuccess={() => {
            toast({
              title: "Offer Sent",
              description: "Thank you for your offer! We'll get back to you soon via email.",
              variant: "default",
            })
          }} />
        ) : (
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600">
              Please contact us directly at{' '}
              <a href={`mailto:${config.contactEmail}`} className="text-green-600 hover:underline">
                {config.contactEmail}
              </a>
              {' '}for inquiries.
            </p>
          </div>
        )}

        {config.links.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-6">Looking for something else?</h2>
            <div className="grid grid-cols-2 gap-4">
              {config.links.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.url}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-gray-600 hover:text-gray-900"
                >
                  <span className="text-lg">{link.name}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="py-6 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          <p className="mt-2 flex items-center justify-center">
            <span>Built with</span>
            <Link 
              href={config.githubRepo.url}
              className="inline-flex items-center ml-1 text-gray-700 hover:text-gray-900 transition-colors duration-300"
            >
              <Github className="w-4 h-4 mr-1" />
              <span>{config.githubRepo.name}</span>
            </Link>
          </p>
        </div>
      </footer>

      <Toaster />
    </div>
  )
}