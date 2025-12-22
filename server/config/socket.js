let ioInstance = null;

export default function initSocket(io) {
    ioInstance = io;

    io.on('connection', socket => {
        socket.on('disconnect', () => { });
    });
}

export function emitNewAssessment(payload) {
    if (ioInstance) {
        ioInstance.emit('new-assessment', payload);
    }
}
