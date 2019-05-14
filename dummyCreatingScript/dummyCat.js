var config = {
    apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
    authDomain: "cs374-2e397.firebaseapp.com",
    databaseURL: "https://cs374-2e397.firebaseio.com",
    projectId: "cs374-2e397",
    storageBucket: "",
    messagingSenderId: "558070618198"
};

firebase.initializeApp(config);

function writeToDatabase(name,project,total,current){
  var refDir = '/cat/' + name + '/project/';
  var newKey = firebase.database().ref(refDir).push();

  newKey.set({
    //location of dictionary
      current: current,
      total: total,
      item: project,
      done: false
  });
}

function transferPosts(){
  var pwd = document.getElementById("pwd").value;

  if (pwd == "myReallyComplicatedPassword") {
    console.log("PASS");
      return firebase.database().ref('/post/').once('value', function(snapshot) {

        var myValue = snapshot.val();
        var keyList = Object.keys(myValue);

        for(var i=0;i<keyList.length;i++) {
          var myKey = keyList[i];
          // console.log(myValue[myKey].picture);
          var catName = myValue[myKey].name;
          var refDir = '/cat/' + catName + '/post/' + myKey + '/';
          // console.log(firebase.database().ref(refDir));

          firebase.database().ref(refDir).set({
            picture: myValue[myKey].picture
          });
        }
    });
  }
  else {
    console.log("FAIL");
    return;
  }

}

function buttonclick(){
  var name = document.getElementById("name").value;
  var project = document.getElementById("project").value;
  var total = document.getElementById("total").value;
  var current = document.getElementById("current").value;

  writeToDatabase(name,project,total,current);

}

function clearcat(){
  document.getElementById("project").value = "";
  document.getElementById("total").value = "";
  document.getElementById("current").value = "";

}
