var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    //res.send('<h1>Hello world</h1>');
    //res.send(__dirname);
    res.sendFile(__dirname + '/public/index.html');
});


//io监听连接事件, 连接之后 监听chat message事件
// io.on('connection', function(socket){
//     socket.on('chat message', function(msg){
//         console.log('message: ' + msg);
//     });
// });

//io监听连接事件, 连接之后 监听disconnect事件
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

//广播
io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
    console.log('检测到连接: ');
    socket.broadcast.emit('hi');

    console.log('广播: 欢迎');
});

io.on('connection', function(socket){
    console.log('检测到连接: ');
    // socket.broadcast.emit('hi');
    // console.log('广播: 欢迎');

    socket.on('chat message', function(msg){
        console.log('检测到聊天消息: ' + msg);
        io.emit('chat message', msg);

        console.log('广播: 聊天消息');
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});

