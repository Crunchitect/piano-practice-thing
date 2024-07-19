import { WebSocketServer } from 'ws';

const PORT = process.env.PORT;
const wss = new WebSocketServer({ port: +PORT });

wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
        wss.broadcast(data.toString());
    });
});
console.log(`server running at port ${PORT}`);
