// calendarService.js
// Note: This expects gapi to be loaded and initialized. 
// In a real app, you'd handle gapi initialization and token management.

export function createCalendarEvent(title, date, description) {
  const event = {
    summary: title,
    description: description,
    start: { date: date }, // Format: YYYY-MM-DD
    end: { date: date },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 * 7 }, // 1 week before
        { method: 'popup', minutes: 24 * 60 }      // 1 day before
      ]
    }
  };
  
  // For demo/simplicity, if gapi is not available, we open a standard Google Calendar URL
  if (typeof window.gapi !== 'undefined' && window.gapi.client && window.gapi.client.calendar) {
    return window.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: event
    });
  } else {
    // Fallback: Generate a deep link to Google Calendar
    const startStr = date.replace(/-/g, '');
    const endStr = date.replace(/-/g, '');
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(description)}`;
    window.open(url, '_blank');
    return Promise.resolve({ status: 'opened_link' });
  }
}
