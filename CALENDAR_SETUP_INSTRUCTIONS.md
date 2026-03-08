# Quick Calendar Setup Instructions

Your Google Calendar credentials have been configured! Now you just need to share your calendar with the service account.

## Final Step: Share Your Calendar

1. **Open Google Calendar**: Go to [calendar.google.com](https://calendar.google.com)

2. **Create or Select a Calendar**:

   - Option A: Use your primary calendar (already shared)
   - Option B: Create a dedicated calendar for bookings:
     - Click the "+" next to "Other calendars"
     - Click "Create new calendar"
     - Name it "Two Sisters Bookings"
     - Click "Create calendar"

3. **Share with Service Account**:

   - Click the three dots (⋮) next to your calendar name
   - Click "Settings and sharing"
   - Scroll down to "Share with specific people"
   - Click "Add people"
   - Enter this email: **twosister-booking@twosisters-301125.iam.gserviceaccount.com**
   - Select permission: **"Make changes to events"**
   - Click "Send"

4. **Get Calendar ID** (if using a specific calendar):
   - In calendar settings, scroll to "Integrate calendar"
   - Copy the "Calendar ID"
   - Update `.env.local` with: `GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com`

## Test It!

1. Restart your dev server: `npm run dev`
2. Go to your website
3. Click "Book Appointment"
4. Fill out the form and submit
5. Check your Google Calendar - the appointment should appear!

## Troubleshooting

**Events not appearing?**

- Make sure you shared the calendar with the service account email
- Verify the service account has "Make changes to events" permission
- Check the browser console for any errors

**Getting errors?**

- Make sure Google Calendar API is enabled in your Google Cloud project
- Verify the credentials in `.env.local` are correct
- Restart your dev server after changing `.env.local`

## For Production Deployment

When deploying to production (Vercel, Netlify, etc.), add these environment variables in your hosting platform's settings:

- `GOOGLE_CLIENT_EMAIL`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_CALENDAR_ID`

Do NOT commit `.env.local` to git (it's already in `.gitignore`).

