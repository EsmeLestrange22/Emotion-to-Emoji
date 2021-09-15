//https://teachablemachine.withgoogle.com/models/Al56HQVvH/
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera= document.getElementById("cam");
Webcam.attach("#cam");

function capture() {
    Webcam.snap(
function(data_uri) {
    document.getElementById("pic").innerHTML= "<img id= 'picture' src='"+data_uri+"'>" 
}


    )
};
 //model loading starts 
 classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Al56HQVvH/model.json", model_ready);
 function model_ready() {
     console.log("Done");
 }
 prediction1= "";
 prediction2= "";

 function speak() {
     var synth= window.speechSynthesis;
     speak_data1= "The first prediction is "+ prediction1;
     speak_data2= "And, the second prediction is "+ prediction2;
     var utterthis= new SpeechSynthesisUtterance(speak_data1+speak_data2);
     synth.speak(utterthis);
 }
  function compare() {
      img= document.getElementById("picture");
      classifier.classify(img, gotResults);
  }

  function gotResults(error, results) {
      if(error) {
          console.error(error);
      }
      else{
          console.log(results);
          prediction1= results[0].label;
          prediction2= results[1].label;
          document.getElementById("e1").innerHTML= prediction1;
          document.getElementById("e2").innerHTML= prediction2;

        speak();

        if(prediction1=="Quiet") {
            document.getElementById("ej1").innerHTML= "&#129323";
        }
        if(prediction1=="Facepalm") {
            document.getElementById("ej1").innerHTML= "&#129318";
        }
        if(prediction1=="Mute") {
            document.getElementById("ej1").innerHTML= "&#128586";
        }
        
        
        if(prediction2=="Quiet") {
            document.getElementById("ej2").innerHTML= "&#129323";
        }
        if(prediction2=="Facepalm") {
            document.getElementById("ej2").innerHTML= "&#129318";
        }
        if(prediction2=="Mute") {
            document.getElementById("ej2").innerHTML= "&#128586";
        }
      }
  }
