export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, project } = req.body;
    // In a real project this data would be sent via email and stored in a database.
    console.log('Nuova richiesta di contatto:', { name, email, project });
    return res.status(200).json({ message: 'ok' });
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
