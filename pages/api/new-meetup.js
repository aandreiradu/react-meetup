import { MongoClient } from 'mongodb'

// /api/new-meetup
// POST /api/new-meetup
const handler = async (req, res) => {
    const { method } = req;

    if (method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(`mongodb+srv://${process.env.mongo_username}:${process.env.mongo_password}@cluster0.yyoyp.mongodb.net/meetups?retryWrites=true&w=majority`)
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);

        client.close();
        res.status(201).json({ message: 'Meetup inserted' });

    }
};



export default handler;