import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Initialize Google Calendar API
function getCalendarClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

// Helper function to parse duration string (e.g., "60 mins" -> 60)
function parseDuration(duration: string): number {
  const match = duration.match(/(\d+)\s*mins?/i);
  return match ? parseInt(match[1], 10) : 60; // Default to 60 minutes if parsing fails
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, treatment, duration, datetime, notes } = body;

    // Validate required fields
    if (!name || !email || !phone || !treatment || !duration || !datetime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if Google Calendar credentials are configured
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error("Google Calendar credentials not configured");
      // Return success but log that calendar integration is not set up
      return NextResponse.json({
        success: true,
        message: "Booking request received. Calendar integration pending setup.",
        booking: {
          name,
          email,
          phone,
          treatment,
          duration,
          datetime,
          notes,
        },
      });
    }

    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

    // Parse the datetime and duration
    const startDateTime = new Date(datetime);
    const durationMinutes = parseDuration(duration);
    const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60 * 1000);

    // Create calendar event
    const event = {
      summary: `Massage Booking: ${treatment} (${duration})`,
      description: `
Client: ${name}
Email: ${email}
Phone: ${phone}
Treatment: ${treatment}
Duration: ${duration}
${notes ? `Notes: ${notes}` : ""}

Booking created from Two Sisters website.
      `.trim(),
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Australia/Sydney",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Australia/Sydney",
      },
      location: "6a/211 Ben Boyd Rd, Neutral Bay NSW 2089",
      // Note: Service accounts cannot send email invitations to attendees
      // Client email is included in the description instead
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 60 }, // 1 hour before
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: "none", // Service accounts can't send invites without domain-wide delegation
    });

    return NextResponse.json({
      success: true,
      message: "Appointment booked successfully!",
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
      booking: {
        name,
        email,
        phone,
        treatment,
        duration,
        datetime,
        notes,
      },
    });
  } catch (error: any) {
    console.error("Error creating calendar event:", error);
    return NextResponse.json(
      {
        error: "Failed to create calendar event",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

