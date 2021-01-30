const socketIO = require('socket.io');

module.exports = {
    init(server){
        this.sessions = [];
        this.io = socketIO(server);
        this.io.on('connection',(socket)=>{
            socket.on('playerMove', data => {
                this.onPlayerMove(socket,data);
            })
            this.onConnection(socket);
            
        });
    },
    onPlayerMove(socket,data){
        const session = this.sessions.find(session => session.playerSocket === socket || session.enemySocket === socket );

        if(session){
            let opponentSocket;
            if(session.playerSocket === socket){
                opponentSocket = session.enemySocket;
            } else{
                opponentSocket = session.playerSocket;
            }
            opponentSocket.emit('enemyMove',data)
        }
    },
    getPendingSession(){
        return this.sessions.find(session => session.playerSocket && !session.enemySocket);
    },
    createPendingSession(soc){
        const session = {playerSocket:soc,enemySocket:null};
        this.sessions.push(session);

    },
    startGame(session){
        session.playerSocket.emit('gameStart',{master:true});
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
