prediction1 = ""
prediction2 = ""
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="capturedImage" src="' + data_uri + '">';
    });
}
console.log('ml5.version', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LnRvb_rVD/model.json', modelLoaded);

function modelLoaded() {
    console.log("modelLoaded");
}

function speak() {
    synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction1;
    speak_data2 = "The second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('capturedImage');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "yoda") {
            document.getElementById("update_emoji1").innerHTML = "&#128406;";
        }
        if (results[0].label == "peace") {
            document.getElementById("update_emoji1").innerHTML = "&#129304;";
        }
        if (results[0].label == "victory") {
            document.getElementById("update_emoji1").innerHTML = "&#9996;";
        }
        if (results[0].label == "heart") {
            document.getElementById("update_emoji1").innerHTML = "&#128156;";
        }
        if (results[1].label == "yoda") {
            document.getElementById("update_emoji2").innerHTML = "&#128406;";
        }
        if (results[1].label == "peace") {
            document.getElementById("update_emoji2").innerHTML = "&#129304;";
        }
        if (results[1].label == "victory") {
            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        if (results[1].label == "heart") {
            document.getElementById("update_emoji2").innerHTML = "&#128156;";
        }
    }
}