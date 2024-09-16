import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { OwnerNotificationEmail, SubmitterConfirmationEmail } from '@/components/email-templates'
import { siteConfig } from '@/config/site'

const resend = new Resend(process.env.RESEND_API_KEY)
const resendDomain = process.env.RESEND_DOMAIN

export async function POST(request: Request) {
  try {
    if (!resendDomain) {
      throw new Error('RESEND_DOMAIN environment variable is not set')
    }

    const { firstName, lastName, email, offerAmount, message } = await request.json()
    console.log('Received offer:', { firstName, lastName, email, offerAmount, message });

    // Send email to site owner
    console.log('Sending email to site owner...');
    const ownerEmailResult = await resend.emails.send({
      from: `Offer Notification <offers@${resendDomain}>`,
      to: siteConfig.contactEmail,
      subject: `New Offer for ${siteConfig.domain}`,
      react: OwnerNotificationEmail({ 
        firstName, 
        lastName, 
        email, 
        offerAmount, 
        message, 
        domain: siteConfig.domain,
        currencySymbol: siteConfig.currencySymbol // Add this line
      }),
    })
    console.log('Owner email result:', ownerEmailResult);

    // Send confirmation email to submitter
    console.log('Sending confirmation email to submitter...');
    const submitterEmailResult = await resend.emails.send({
      from: `${siteConfig.domain} <noreply@${resendDomain}>`,
      to: email,
      subject: `Your offer for ${siteConfig.domain} has been received`,
      react: SubmitterConfirmationEmail({ 
        firstName, 
        lastName, 
        email, 
        offerAmount, 
        message, 
        domain: siteConfig.domain,
        currencySymbol: siteConfig.currencySymbol // Add this line
      }),
    })
    console.log('Submitter email result:', submitterEmailResult);

    return NextResponse.json({ success: true, ownerEmailResult, submitterEmailResult })
  } catch (error) {
    console.error('Error in submit-offer route:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      details: error
    }, { status: 500 })
  }
}