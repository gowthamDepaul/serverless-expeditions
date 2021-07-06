const express = require('express');
const Firestore = require('@google-cloud/firestore')
const db = new Firestore();
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Hospital Rest API listening on port ${port}`);
});

app.get('/', async (req, res) => {
    res.json({status: 'Hospital info ready to be read'});
})

app.get('/:breed', async (req, res) => {
    const breed = req.params.breed;
    const query = db.collection('hospitals').where('name', '==', breed);
    const querySnapshot = await query.get();
    if (querySnapshot.size > 0) {
        res.json(querySnapshot.docs[0].data());
    }
    else {
        res.json({status: 'Not found'});
    }
})

app.post('/', async (req, res) => {
    const data = {
        name: req.body.name,
        origin: req.body.origin,
        lifeExpectancy: req.body.lifeExpectancy,
        type: req.body.type
    }
    await db.collection('hospitals').doc().set(data);
    res.json({ status: 'success', data: { dog: data } });
})