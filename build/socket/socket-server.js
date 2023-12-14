"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const SocketServer = (socket) => {
    socket.on("joinUser", (user) => {
        console.log("1212121");
    });
};
exports.SocketServer = SocketServer;
//# sourceMappingURL=socket-server.js.map