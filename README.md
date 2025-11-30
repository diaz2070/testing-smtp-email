# SMTP Test with Nodemailer & React Email

A Node.js application to test SMTP server connectivity using nodemailer with support for beautiful email templates using React Email.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from the example:

```bash
cp .env.example .env
```

3. Configure your SMTP settings in the `.env` file:
   - `SMTP_HOST`: Your SMTP server host
   - `SMTP_PORT`: Port number (587 for TLS, 465 for SSL, 25 for non-secure)
   - `SMTP_SECURE`: Set to `true` for port 465, `false` for others
   - `SMTP_USER`: Your email address
   - `SMTP_PASS`: Your email password or app password

4. Update the email details in `.env`:
   - `EMAIL_FROM`: Sender address
   - `EMAIL_TO`: Recipient address
   - `EMAIL_SUBJECT`: Email subject line
   - `EMAIL_TEXT`: Plain text body
   - `EMAIL_HTML`: HTML body

## Running the Test

### Basic SMTP Test (Plain HTML)

```bash
npm test
# or
node test-smtp.js
```

### React Email Test (Beautiful Templates)

```bash
npm run test:react
# or
node test-smtp-react.js
```

### Preview Email Templates

Preview and develop your React Email templates in the browser:

```bash
npm run preview
```

This will open a development server at `http://localhost:3000` where you can preview and edit your email templates in real-time.

## Common SMTP Providers

### Gmail

- Host: `smtp.gmail.com`
- Port: `587` (TLS) or `465` (SSL)
- Note: Use an App Password, not your regular password

### Outlook/Hotmail

- Host: `smtp-mail.outlook.com`
- Port: `587`
- Secure: `false`

### Yahoo

- Host: `smtp.mail.yahoo.com`
- Port: `465` or `587`

### Custom SMTP Server

- Use your provider's SMTP settings

## Troubleshooting

- **Authentication failed**: Check your username and password
- **Connection refused**: Verify host and port are correct
- **SSL/TLS errors**: Try changing the `secure` setting
- **Gmail "less secure app"**: Enable 2FA and use an App Password

## React Email Templates

This project includes two example React Email templates in the [emails](emails/) folder:

1. **[WelcomeEmail.jsx](emails/WelcomeEmail.jsx)** - A welcome email template with customizable user name and company name
2. **[NotificationEmail.jsx](emails/NotificationEmail.jsx)** - A notification email template with title, message, and action button

### Creating Your Own Templates

Create new email templates in the `emails` folder using React components and the `@react-email/components` library. Example:

```jsx
import { Html, Button, Text } from '@react-email/components';

export default function MyTemplate({ name }) {
  return (
    <Html>
      <Text>Hello {name}!</Text>
      <Button href="https://example.com">Click me</Button>
    </Html>
  );
}
```

Then import and use it in [test-smtp-react.js](test-smtp-react.js):

```javascript
const MyTemplate = require('./emails/MyTemplate.jsx').default;

sendReactEmail(MyTemplate, { name: 'John' });
```

## Features

- SMTP email sending with nodemailer
- Beautiful email templates with React Email
- Environment variable configuration
- IMAP integration to save sent emails to your Sent folder
- Live preview of email templates in browser
- Full customization of email content and styling
