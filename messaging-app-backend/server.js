import Express from "express";
import mongoose from "mongoose";
import Messages from './DB/dbMessages.js'
import Cors from 'cors'
import Pusher from 'pusher'

const app = Express();
const port = process.env.PORT || 9000;

const connection_url = 'mongodb+srv://DevilLP1634:Oz8i6kr2t9GYvfqm@cluster0.qxmehmq.mongodb.net/?retryWrites=true&w=majority';


const pusher = new Pusher({
    appId: "1506927",
    key: "7fcb95e8a5ab86c4f243",
    secret: "f2fc5db1fa2d76efe88e",
    cluster: "ap2",
    useTLS: true
})

// MiddleWare
app.use(Express.json());
app.use(Cors());
app.use(Express.urlencoded({ extended: true }));

// DB config
mongoose.connect(connection_url, err => {
    if (err) {
        throw err;
    }
    console.log('Connected to MongoDB');
})

// API Endpoints
app.get('/', (req, res) => res.status(200).send("Hello Lalit"));

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;
    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
})

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})

const db = mongoose.connection;
db.once("open", () => {
    console.log("DB Connected");
    const msgCollection = db.collection("messagingmessages");
    const changeStream = msgCollection.watch();
    changeStream.on('change', change => {
        console.log(change);
        if (change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log("Error trigerring Pusher");
        }
    })
})

// Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))