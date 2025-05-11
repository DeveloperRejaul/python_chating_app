from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from sockets import sio_app

app = FastAPI()


# CORS setup
origins = [
    "http://localhost",
    "http://localhost:8081",
    "http://192.168.1.71",
    "http://192.168.1.71:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows your specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


# must setup the socketio app bottom of the app
app.mount("/",app=sio_app)
