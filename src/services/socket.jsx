import socketIOClient from 'socket.io-client';

const apiTokenLocalStorage = localStorage.getItem('apiToken') || '{}';

const socket = socketIOClient(process.env.REACT_APP_API_V2_URL, {
    query: { token: JSON.parse(apiTokenLocalStorage) },
    reconnectionDelay: 2000,
    reconnectionDelayMax: 30000,
    timeout: 360000
});

const connectoToSocket = () => {
    socket.on('connect', function(){
        console.log('Connected');
    });

    socket.on('disconnect', function () {
    console.log('Disconnected');
    });

    return socket;
}

export default connectoToSocket;
