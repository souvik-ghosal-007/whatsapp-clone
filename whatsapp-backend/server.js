// importing
import express from "express";
import mongoose from "mongoose";
import Messages from './dbMessages.js'
import Pusher from "pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1438987",
    key: "02c7c271d494bfc8cec5",
    secret: "f7da5755a7ffc8afc1bd",
    cluster: "ap2",
    useTLS: true
  });
  

// middleware
app.use(express.json())
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     next();
// })

// DB config
const connection_url = 'mongodb+srv://sghosal:XbQvFGuSlmIEjaZN@cluster0.2j3bmcv.mongodb.net/whatsappDB?retryWrites=true&w=majority'

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//change stream
const db = mongoose.connection
db.once('open', () => {
    console.log("DB Connected");

    const msgConnection = db.collection("messagecontents");
    const changeStream = msgConnection.watch();

    changeStream.on('change', (change) => {
        console.log(change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('message', 'inserted', 
                {
                    name: messageDetails.name,
                    message: messageDetails.message
                }
            );
        }else {
            console.log("Erorr in pusher");
        }
    });
});


// api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})


// listen
app.listen(port, ()=>console.log(`Listening on localhost:${port}`));