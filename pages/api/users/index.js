import db from '../../../lib/db';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const users = await db.getUsers();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
      break;

    case 'POST':
      try {
        const { name, email } = req.body;
        await db.createUser(name, email);
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}