import app from './src';
import config from './src/config';
import logger from './src/util/logger';
import * as socketIo from 'socket.io';
import {createServer, Server} from "http";

let server: Server = createServer(app);
let io: socketIo.Server = socketIo(server);

server.listen(config.port, () => {
    logger.log(`server started at port ${config.port}`);
});

io.on('connect', (socket: any) => {
    console.log('Client connected ' + socket.id);
    socket.on('room', (data: any) => {
        if (data.priviledge >= 1) {
            console.log('join trade room');
            socket.join('trade');
        }
        if (data.priviledge >= 3) {
            console.log('join trade analysis');
            socket.join('analysis');
        }
    });
});

export default io;