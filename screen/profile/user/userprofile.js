var config = {
    apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
    authDomain: "cs374-2e397.firebaseapp.com",
    databaseURL: "https://cs374-2e397.firebaseio.com",
    projectId: "cs374-2e397",
    storageBucket: "",
    messagingSenderId: "558070618198"
};

firebase.initializeApp(config);

$("#logout").click(function() {
    firebase.auth().signOut().then(function() {
        alert("logout!");
        location.href='../../login/login.html';
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        document.getElementById("checkerror").innerHTML = errorMessage;
    });

});

