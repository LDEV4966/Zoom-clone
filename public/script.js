/*
const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true; //video tag / turn off the sound
var myPeer = new Peer(undefined, {
  host: "/",
  port: "3030",
});
let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
    myPeer.on("call", (call) => {
      console.log(call);
      //peer.call이 호출됬을시.(peer.on 파트는 New USER를 위한 코드이다.)
      call.answer(stream); //call에 대한 answer로 myStream을 건내준다.(New USER만 기존 USER들에게 보내주면 된다)
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        ////peer.call이 호출됬을시 받은 상대 user의 stream이다.
        addVideoStream(video, userVideoStream);
      });
    });
    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  })
  .catch((error) => {
    console.log(error);
    videoGrid.append(error);
  });
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
myPeer.on("open", (id) => {
  //peer에서 id를 자동적으로 형성함.
  socket.emit("join-room", ROOM_ID, id);
});
const connectToNewUser = (userId, stream) => {
  const call = myPeer.call(userId, stream); // connected 된 상대 NEW userID에게 myStream을 보내기 위한 calls
  console.log(userId);
  console.log(call);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    // When i receive some of the answer of peer.call
    console.log("answer back");
    addVideoStream(video, userVideoStream); // i'm going to add that users video
  });
};
*/
const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myPeer = new Peer(undefined, {
  host: "/",
  port: "3001",
});
const myVideo = document.createElement("video");
myVideo.muted = true;
const peers = {};
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    addVideoStream(myVideo, stream);

    myPeer.on("call", (call) => {
      console.log("hi");
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

socket.on("user-disconnected", (userId) => {
  if (peers[userId]) peers[userId].close();
});

myPeer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  call.on("close", () => {
    video.remove();
  });

  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
}
