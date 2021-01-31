const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true; //video tag / turn off the sound

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListner("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};
let myVideoStream;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);
  })
  .catch((error) => {
    console.log(error);
    videoGrid.append(error);
  });
