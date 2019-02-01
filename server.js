import express from 'express';
import bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as socket from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';


const app = express();
const PORT = 3000;

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: "*/*" }));

const server = app.listen(PORT);

const io = socket.listen(server);

io.on('connection', client => {
	console.log('a user connected', client.id);
	client.on('disconnect', () => {
		console.log('user disconnected');
	})

	client.on('chat message', (msg) => {
		client.broadcast.emit('chat message', msg);
	});
});

app.get("/", function(req, res){
	res.send('<h1>Encrypt Chat for profit</h1>');
});

console.log(`Server running on port: ${PORT}`)

