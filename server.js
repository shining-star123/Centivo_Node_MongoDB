const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const User = require('./models/User');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.post('/users', (req, res) => {
    const newUser = new User(req.body);

    newUser.save()
        .then(user => {
            res.send('success');
        }).catch(err => {
            res.status(404).send(err);
        })
})

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ _id: id, age: { $gt: 21 } });

        if (!user) {
            return res.status(404).json({ message: 'User not found or age is 21 or below' });
        }

        res.json(user);
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});