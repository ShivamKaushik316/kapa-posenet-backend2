let capture; // for video capture
let posenet;  // variable for pose detection

let singlePose,skeleton; // to detect poses and to make skeleton by joining the points


function setup() {  // initalising the canvas for video capture
    createCanvas(800, 500);
    capture = createCapture(VIDEO)
    capture.hide();  // in order to hide multiple outputs

    posenet = ml5.poseNet(capture, modelLoaded);  // passing the video capture in posenet
    posenet.on('pose',receivedPoses);  

   

}

function receivedPoses(poses){
    console.log(poses); // these are the coordinates

    if(poses.length > 0){
        singlePose = poses[0].pose;  // to target a single body part pose only
        skeleton = poses[0].skeleton;  // for skeleton
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function draw() { // to make everything visible

    // images and videos(webcam)
    image(capture, 0, 0); // passing the video capture in canvas in order to make it visble
    fill(255,0,0); // colour for points

    if(singlePose){
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,10); // making all the points visible in form of ellipse
        }
        stroke(255,255,255); // color for lines between the points
        strokeWeight(2); // thickness for lines
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y) // creation of lines
        }

        

        
    }

    

}
