const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/dota', {
    useNewUrlParser: true
});

const multer = require('multer')
const upload = multer({
    dest: '/var/www/web_development_cs260/creative_project/images/',
    limits: {
        fileSize: 10000000
    }
});

const matchSchema = new mongoose.Schema({
    matchID: String,
    match: Object
});

const profileSchema = new mongoose.Schema({
    name: String,
    nickName: String,
    positions: Array,
    hero: String,
    bio: String,
    path: String
});

const Match = mongoose.model('Match', matchSchema);

const Profile = mongoose.model("Profile", profileSchema);


app.post('/api/photos', upload.single('photo'), async (req, res) => {
    // Just a safety check
    if (!req.file) {
        return res.sendStatus(400);
    }
    res.send({
        path: "/images/" + req.file.filename
    });
});

// Add dota match info to the db.
app.post('/api/items', async (req, res) => {
    const item = new Match({
        matchID: req.body.matchID,
        match: req.body.match
    });
    try {
        await item.save();
        res.send(item);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/profiles', async (req, res) => {
    const profile = new Profile({
        name: req.body.name,
        nickName: req.body.nickName,
        positions: req.body.positions,
        hero: req.body.hero,
        bio: req.body.bio,
        path: req.body.path
    });

    try {
        await profile.save();
        res.send(profile);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/items', async (req, res) => {
    try {
        let items = await Match.find();
        res.send(items);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/profiles', async (req, res) => {
    try {
        let profiles = await Profile.find();
        res.send(profiles);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/profiles/:id', async (req, res) => {
    try {
        await Profile.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/profiles/:id', async (req, res) => {
    try {
        let item = await Profile.findOne({
            _id: req.params.id
        });

        item.name = req.body.name;
        item.save();
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

app.delete('/api/items/:id', async (req, res) => {
    try {
        await Match.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


app.listen(3002, () => console.log('Server listening on port 3002!'));