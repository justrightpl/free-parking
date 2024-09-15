import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { OwnerNotificationEmail, SubmitterConfirmationEmail } from '@/components/email-templates'
import { siteConfig } from '@/config/site'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, offerAmount, message } = await request.json()
    console.log('Received offer:', { firstName, lastName, email, offerAmount, message });

    // Send email to site owner
    console.log('Sending email to site owner...');
    const ownerEmailResult = await resend.emails.send({
      from: `Offer Notification <offers@${siteConfig.emailFromDomain}>`,
      to: siteConfig.contactEmail,
      subject: `New Offer for ${siteConfig.domain}`,
      react: OwnerNotificationEmail({ firstName, lastName, email, offerAmount, message, domain: siteConfig.domain }),
    })
    console.log('Owner email result:', ownerEmailResult);

    // Send confirmation email to submitter
    console.log('Sending confirmation email to submitter...');
    const submitterEmailResult = await resend.emails.send({
      from: `${siteConfig.domain} <noreply@${siteConfig.emailFromDomain}>`,
      to: email,
      subject: `Your offer for ${siteConfig.domain} has been received`,
      react: SubmitterConfirmationEmail({ firstName, lastName, email, offerAmount, message, domain: siteConfig.domain }),
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