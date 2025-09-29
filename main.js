let eyeX = 0;
let eyeY = 0;
let glasses;
let canvas;
let video;
let poseNet;

function preLoad() {
    glasses = loadImage("images-removebg-preview.png");
}

function setup() {
    canvas = createCanvas(800, 600);
    canvas.parent("canvas-container");
    
    video = createCapture(VIDEO);
    video.size(800,600)
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
   console.log("PoseNet is initializated!");
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        eyeX = results[0].pose.leftEye.x;
        eyeY = results[0].pose.leftEye.y;
        console.log("eye x = " + results[0].pose.leftEye.x)
        console.log("eye y = " + results[0].pose.leftEye.y)
    }
}

function draw() {
    background(0);
    image(video, 0, 0, width, height);
    image(glasses, eyeX - 200, eyeY - 140, 400, 400);
}

function takeSnapshot() {
    save('myFilterImage.png');
}
