# Google Calendar Integration Setup Guide

This guide will help you set up Google Calendar integration for booking appointments.

## Prerequisites

- A Google account
- Access to Google Cloud Console

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click "New Project"
4. Enter project name: "Two Sisters Massage" (or your preferred name)
5. Click "Create"

### 2. Enable Google Calendar API

1. In your project, go to "APIs & Services" > "Library"
2. Search for "Google Calendar API"
3. Click on it and click "Enable"

### 3. Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Enter a name: "calendar-booking-service"
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 4. Generate Service Account Key

1. Click on the service account you just created
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Click "Create" - this will download a JSON file

### 5. Extract Credentials from JSON

Open the downloaded JSON file. You'll need:

- `client_email`: The email address (looks like `xxx@xxx.iam.gserviceaccount.com`)
- `private_key`: The private key (starts with `-----BEGIN PRIVATE KEY-----`)

### 6. Share Calendar with Service Account

1. Open [Google Calendar](https://calendar.google.com/)
2. Click the "+" next to "Other calendars" on the left
3. Click "Create new calendar"
4. Name it "Two Sisters Bookings" (or your preferred name)
5. Click "Create calendar"
6. Go to calendar settings (click the three dots next to your calendar)
7. Scroll down to "Share with specific people"
8. Click "Add people"
9. Enter the service account email (the `client_email` from step 5)
10. Give it "Make changes to events" permission
11. Click "Send"

### 7. Get Calendar ID

1. Still in calendar settings
2. Scroll down to "Integrate calendar"
3. Copy the "Calendar ID" (it will look like `xxxxx@group.calendar.google.com` or just an email-like string)

### 8. Set Environment Variables

Create a `.env.local` file in your project root (or add to your hosting platform's environment variables):

```env
GOOGLE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----"
GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
```

**Important Notes:**

- Keep the `private_key` in quotes and include the `\n` characters
- Never commit `.env.local` to git (it's already in `.gitignore`)
- For production, set these in your hosting platform's environment variables

### 9. Test the Integration

1. Start your development server: `npm run dev`
2. Click "Book Appointment" on your website
3. Fill out the booking form
4. Submit the booking
5. Check your Google Calendar - you should see the appointment!

## Troubleshooting

### Events not appearing in calendar?

- Make sure you shared the calendar with the service account email
- Verify the calendar ID is correct
- Check that the service account has "Make changes to events" permission

### Getting authentication errors?

- Verify the `GOOGLE_CLIENT_EMAIL` matches the service account email
- Check that the `GOOGLE_PRIVATE_KEY` includes the full key with `\n` characters
- Ensure the Calendar API is enabled in your Google Cloud project

### Private key format issues?

- The private key should be a single string with `\n` characters
- Keep it in quotes in your `.env.local` file
- Make sure there are no extra spaces or line breaks

## Security Best Practices

1. **Never commit credentials to git** - Use `.env.local` for local development
2. **Use environment variables** - Set them in your hosting platform (Vercel, Netlify, etc.)
3. **Restrict service account permissions** - Only give it access to the specific calendar
4. **Rotate keys regularly** - Generate new keys if compromised

## Alternative: Using OAuth2 (For User's Own Calendar)

If you want clients to add events to their own calendars instead, you would need:

- OAuth2 flow for user authentication
- Different API implementation
- User consent for calendar access

The current implementation uses a service account, which creates events in YOUR calendar (the business calendar).

