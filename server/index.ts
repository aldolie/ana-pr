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
    socket.on('room', (data: any) => {
        if (data.priviledge >= 1) {
            socket.join('trade');
        }
        if (data.priviledge >= 3) {
            socket.join('analysis');
        }
    });
});

export default io;