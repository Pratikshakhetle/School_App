import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { query } from '../../../lib/db';

// Multer for handling image uploads
const upload = multer({ dest: 'public/schoolImages/' });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const imageFileName = `${uuidv4()}_${req.file.originalname}`;
            const imagePath = `schoolImages/${imageFileName}`;

            // Perform the API call to store data in the MySQL database
            const { name, address, city, state, contact, email_id } = req.body;
            const result = await query(
                'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [name, address, city, state, contact, email_id, imageFileName]
            );

            if (result.affectedRows > 0) {
                res.status(200).json({ message: 'School added successfully' });
            } else {
                res.status(500).json({ message: 'Failed to add school' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}