import socketio

# create a Socket.IO server
sio_server = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins=['*'],
)

sio_app = socketio.ASGIApp(
    socketio_server=sio_server,
    socketio_path='/socket.io',
)

@sio_server.event
async def connect(sid, environ):
    print('Client connected:', sid)


@sio_server.event
async def disconnect(sid):
    print('Client disconnected:', sid)


@sio_server.event
async def message(sid, data):
    print(data)
    await sio_server.emit("message", 'Hi Client')