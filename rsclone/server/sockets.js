const socketIO = require('socket.io');

module.exports = {
    init(server){
        this.sessions = [];
        this.io = socketIO(server);
        this.io.on('connection',(socket)=>{
            this.onConnection(socket);
            
        });
    },
    getPendingSession(){
        return this.sessions.find(session => session.playerSocket && !session.enemySocket);
    },
    createPendingSession(soc){
        const session = {playerSocket:soc,enemySocket:null};
        this.sessions.push(session);

    },
    startGame(session){
        session.playerSocket.emit('gameStart');
        session.enemySocket.emit('gameStart');
    },
    onConnection(soc){        
        console.log(`Подключился новый игрок ${soc.id}`);
        
        let session = this.getPendingSession();
        if (!session) {
            this.createPendingSession(soc);
        } else{
            session.enemySocket = soc;
            this.startGame(session);
        };
    }
}
