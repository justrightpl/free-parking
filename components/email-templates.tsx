import * as React from 'react';
import { Html, Head, Body, Container, Text } from '@react-email/components';

interface OfferEmailProps {
    firstName: string;
    lastName: string;
    email: string;
    offerAmount: string;
    message: string;
    domain: string;
    currencySymbol: string;
  }

export const OwnerNotificationEmail: React.FC<Readonly<OfferEmailProps>> = ({
    firstName, lastName, email, offerAmount, message, domain, currencySymbol
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Text style={heading}>New Offer Received for {domain}</Text>
        <Text style={paragraph}>
          Name: {firstName} {lastName}<br />
          Email: {email}<br />
          Offer Amount: {currencySymbol}{offerAmount}<br />
          Message: {message}
        </Text>
      </Container>
    </Body>
  </Html>
);

export const SubmitterConfirmationEmail: React.FC<Readonly<OfferEmailProps>> = ({
    firstName, offerAmount, domain, currencySymbol
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Text style={heading}>Thank you for your offer on {domain}</Text>
        <Text style={paragraph}>
          Dear {firstName},
        </Text>
        <Text style={paragraph}>
          Your offer of {currencySymbol}{offerAmount} for {domain} has been received. We appreciate your interest.
        </Text>
        <Text style={paragraph}>
          We will contact you soon with further information or to discuss your offer.
        </Text>
        <Text style={paragraph}>
          Best regards,<br />
          - {domain}
        </Text>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
};

const paragraph = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
};