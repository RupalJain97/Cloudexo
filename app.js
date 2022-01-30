var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const port = process.env.PORT || 5500;
server.listen(port, () => {
    console.log("Listening server at port: " + port);
    console.log("open : http://localhost:" + port);
});

app.use(express.static("."));
app.get("/", function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

// To recieve events on server side
io.on('connection', function(socket) {
    console.log('Socket connected...');

    // Connection for MonoDB
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://dbUser:userPassword@cluster0.1hkgl.mongodb.net/userData?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log(client);
    // The database to use
    const dbName = "userData";

    socket.on('upload', async function(file) {
        var res = run(client, dbName, file).catch(console.dir);
        console.log("uploaded successfully...")
            // console.log("Response: " + JSON.stringify(reply));

        // var response = {
        //     // message: reply.fulfillmentText
        //     message: JSON.stringify(reply)
        // }
        socket.emit('display', res);

        /// create function for retreiving image here and pass hat image to index.js
        // https://stackoverflow.com/questions/31245140/using-binary-data-from-mongo-collection-as-image-source

        // https://medium.com/@colinrlly/send-store-and-show-images-with-react-express-and-mongodb-592bc38a9ed

        // https://www.google.com/search?sxsrf=ALeKk01hGIpYEEDF-PqBW8ixrXDGBQ4zGA%3A1608145527687&ei=d1raX7i_KbLE4-EPs5ysiAc&q=convert+image+from+Binary+to+actual+image+using+mongodb+and+node+js&oq=convert+image+from+Binary+to+actual+image+using+mongodb+and+node+js&gs_lcp=CgZwc3ktYWIQAzoECAAQR1C2qQFY-fkBYMH7AWgAcAJ4AIABuwGIAewjkgEEMC4zMJgBAKABAaoBB2d3cy13aXrIAQjAAQE&sclient=psy-ab&ved=0ahUKEwj41rL3mNPtAhUy4jgGHTMOC3EQ4dUDCA0&uact=5

    });

    // client.connect(err => {
    //     const collection = client.db("userData").collection("images");
    //     // perform actions on the collection object
    //     client.close();
    // });
});


// Function to add file to DB
async function run(client, dbName, file) {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "images"
        const col = db.collection("images");

        // Insert a single document, wait for promise so we can read it back
        const p = await col.insertOne(file);
        var id = p.insertedId;
        console.log(p);
        // Find one document
        // const myDoc = await col.findOne(id);
        // Print to the console
        // console.log(myDoc);

    } catch (err) {
        s
        console.log(err.stack);
    } finally {
        await client.close();
    }

    return id;
}