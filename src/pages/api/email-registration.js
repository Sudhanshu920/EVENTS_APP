import path from 'path';
import fs from 'fs';

function buildPath() {
  return path.join(process.cwd(), 'src', 'data', 'data.json');
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export default function emailRegistration(req, res) {
  const { method } = req;

  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);

  if (!allEvents) {
    return res.status(404).json({
      status: 404,
      message: 'Events data not found!',
    });
  }

  if (method === 'POST') {
    const { email, eventID } = req.body;

    if (!email | !email.includes('@')) {
      return res.status(422).json({ message: 'Invalid email address' });
    }

    const newAllEvents = allEvents.map((ev) => {
      if (ev.id === eventID) {
        if (ev.emails_registered.includes(email)) {
          res.status(409).json({ message: 'this email is already registered' });
          return ev;
        }
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      }
      return ev;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(200).json({
      message: `you have been registered with email : ${email} for event : ${eventID}`,
    });
  }
}
