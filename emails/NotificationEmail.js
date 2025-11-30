import React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components';

export default function NotificationEmail({
  title = 'Important Notification',
  message = 'This is a notification message.',
  actionUrl = 'https://example.com',
  actionText = 'View Details'
}) {
  return React.createElement(
    Html,
    null,
    React.createElement(Head, null),
    React.createElement(Preview, null, title),
    React.createElement(
      Body,
      { style: main },
      React.createElement(
        Container,
        { style: container },
        React.createElement(
          Section,
          { style: alertBox },
          React.createElement(Text, { style: alertIcon }, '🔔'),
          React.createElement(Text, { style: heading }, title),
          React.createElement(Text, { style: paragraph }, message),
          actionUrl && actionText && React.createElement(Link, { href: actionUrl, style: link }, `${actionText} →`),
          React.createElement(Hr, { style: hr }),
          React.createElement(
            Text,
            { style: footer },
            'You received this notification because you are subscribed to updates.'
          )
        )
      )
    )
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0',
};

const alertBox = {
  backgroundColor: '#ffffff',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
  padding: '32px',
  maxWidth: '600px',
  margin: '0 auto',
};

const alertIcon = {
  fontSize: '48px',
  textAlign: 'center',
  margin: '0 0 16px 0',
};

const heading = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
  margin: '0 0 16px 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#484848',
  margin: '0 0 24px 0',
};

const link = {
  color: '#5469d4',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '24px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 0 0 0',
};
