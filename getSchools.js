import { connect } from '../../mysql';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const db = await connect();

            const results = await db.query('SELECT id, name, address, city, image FROM schools');
            const schools = results[0];

            db.end();

            res.status(200).json(schools);
        } catch (error) {
            console.error('Error fetching schools:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}