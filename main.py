from fastapi import FastAPI

from sockets import sio_app

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}


# must setup the socketio app bottom of the app
app.mount("/",app=sio_app)
