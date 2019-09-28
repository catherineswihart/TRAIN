var firebaseConfig = {
    apiKey: "AIzaSyB66XD8OKjSUOM_pDFPhxBhdx7VmWBLlCg",
    authDomain: "train-df879.firebaseapp.com",
    databaseURL: "https://train-df879.firebaseio.com",
    projectId: "train-df879",
    storageBucket: "",
    messagingSenderId: "828895012766",
    appId: "1:828895012766:web:662050a750f1569d91988f"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// variables
const data = firebase.database();

var name = '';
var dest = '';
var time = 0;
var freq = 0;


// // time variables
// var nextTrain = "";
// var away = "";


// add train func
$(document).on("click", "#add-train", function(event){
    event.preventDefault();

    name = $("#name-input").val().trim();
    dest = $("#destination-input").val().trim();
    time = $("#starttime-input").val().trim();
    freq = $("#frequency-input").val().trim();

    // send to firebase
    data.ref().push({
        name: name,
        destination: dest,
        time: time,
        frequency: freq,
    });

    $("#name-input").val('');
    $("#destination-input").val('');
    $("#starttime-input").val('');
    $("#frequency-input").val('');

});

data.ref().on("child_added", function(snapshot){

     var firstTime = snapshot.val().time;
     var each = snapshot.val().frequency;
     var currentTime = moment();
     var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
     var difftime = moment().diff(moment(firstTimeConverted), "minutes");
     var tRemainder = difftime % each;
     var tMinutesTillTrain = each - tRemainder;
     var nextTrain = moment().add(tMinutesTillTrain, "minutes");


     console.log(each);
     console.log(firstTimeConverted);
     

    $("#traintable").append(`
        <tr>
            <td>${snapshot.val().name}</td>
            <td>${snapshot.val().destination}</td>
            <td>${snapshot.val().frequency}</td>
            <td>${moment(nextTrain).format("LT")}</td>
            <td>${tMinutesTillTrain}</td>
        </tr>
    `);

});