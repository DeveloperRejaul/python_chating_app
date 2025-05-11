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



# -----------------------------
# EVENT: Client connected
# -----------------------------
@sio_server.event
async def connect(sid, environ):
    print('Client connected:', sid)

# -----------------------------
# EVENT: Client disconnected
# -----------------------------
@sio_server.event
async def disconnect(sid):
    print('Client disconnected:', sid)


# -----------------------------
# For all connected user
# -----------------------------
@sio_server.event
async def message(sid, data):
    await sio_server.emit("message", data)



# -----------------------------
# For specific user
# -----------------------------
@sio_server.event
async def send(sid, data):
    target_sid = data.get('target_sid')
    message = data.get('message')
    if target_sid and message:
        await sio_server.emit("message", message, to=target_sid)
    else:
        await sio_server.emit("error", "Missing target_sid or message", to=sid)


# -----------------------------
# Create/Add User to Room
# -----------------------------
@sio_server.event
async def join_room(sid, data):
    room = data.get('room')
    if room:
        await sio_server.enter_room(sid, room)
        await sio_server.emit("info", f"Joined room {room}", to=sid)
        print(f"{sid} joined room {room}")


# -----------------------------
# Remove User from Room
# -----------------------------
@sio_server.event
async def leave_room(sid, data):
    room = data.get('room')
    if room:
        await sio_server.leave_room(sid, room)
        await sio_server.emit("info", f"Left room {room}", to=sid)
        print(f"{sid} left room {room}")


# -----------------------------
# Send Message to Room
# -----------------------------
@sio_server.event
async def message_to_room(sid, data):
    room = data.get('room')
    message = data.get('message')
    if room and message:
        await sio_server.emit("message", message, room=room)
        print(f"Message to room {room}: {message}")


# -----------------------------
# "Delete" a Room (custom logic)
# -----------------------------
# Note: Socket.IO doesn't natively support deleting rooms.
# Instead, you remove all users from the room and stop using it.
room_members = {}

@sio_server.event
async def delete_room(sid, data):
    room = data.get('room')
    if not room:
        return

    # Leave all members from the room (if tracked manually)
    if room in room_members:
        for member_sid in room_members[room]:
            await sio_server.leave_room(member_sid, room)
            await sio_server.emit("info", f"Room {room} deleted", to=member_sid)
        del room_members[room]
    print(f"Room {room} deleted")