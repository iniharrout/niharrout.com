# Connect the Book a Call form to Google Calendar

Do this once, signed in as **nihar@creuto.com** (the account whose calendar should be blocked).

1. Go to https://script.google.com and create a **New project**. Name it "niharrout.com calendar".
2. Delete the sample code and paste in everything from `Code.gs` (this folder).
3. Change `TOKEN` on the first line to a long random string (for example 40 random letters and numbers). Keep a copy.
4. Optional, for Google Meet links in the invite: left sidebar, **Services** (+), choose **Google Calendar API**, **Add**.
5. **Deploy > New deployment > Web app**.
   - Execute as: **Me (nihar@creuto.com)**
   - Who has access: **Anyone**
   - Click **Deploy**, then **Authorize access** and allow calendar access (Google may show an "unverified app" warning: Advanced > Go to project).
6. Copy the **Web app URL** (it ends in `/exec`).
7. In Vercel, project niharrout.com, **Settings > Environment Variables**, add (Production):
   - `CALENDAR_SCRIPT_URL` = the Web app URL
   - `CALENDAR_SCRIPT_TOKEN` = the same random string you put in `Code.gs`
   Then redeploy (Deployments > the latest > Redeploy).

## Check it works
Open the site, click Book a Call, and book a slot with a different email address of yours. You should see the event on your calendar, an invite in that inbox, and a "Call booked on your calendar" message in Google Chat. The slot disappears for the next visitor.

## Notes
- The site only offers times that are free on your calendar and inside the standard hours (Monday to Friday, 10:00 to 18:00 IST, 45-minute calls, 24 hours notice, up to 14 days ahead). Change the hours in `api/_booking.js` and `assets/booking.js`.
- Any event on your calendar blocks the time, including all-day events, unless you have declined it. A 15-minute gap is kept before and after other events.
- If you change `Code.gs` later, use **Deploy > Manage deployments > Edit > New version** so the same URL keeps working.
- If the calendar cannot be reached, the form falls back to the old behaviour: a request in Google Chat that you confirm by hand.
