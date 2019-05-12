var config = {
    apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
    authDomain: "cs374-2e397.firebaseapp.com",
    databaseURL: "https://cs374-2e397.firebaseio.com",
    projectId: "cs374-2e397",
    storageBucket: "",
    messagingSenderId: "558070618198"
};

firebase.initializeApp(config);

function writeToDatabase(catfile,profilefile,name,by,likes,place,tag){
  var newKey = firebase.database().ref('/post/').push();
  var imgc="../../../image/picture/"+profilefile;
  var picture="../../../image/picture/"+catfile;
  newKey.set({
    //location of dictionary
    img: imgc,
    name: name,
    picture: picture,
    by: by,
    likes: likes,
    place: place,
    tag: tag
  });
}

function buttonclick(){
  var catfile = document.getElementById("filename").value;
  var profilefile = document.getElementById("profilefilename").value;
  var name = document.getElementById("name").value;
  var by = document.getElementById("by").value;
  var likes = document.getElementById("likes").value;
  var place = document.getElementById("places").value;
  var tag = document.getElementById("tags").value;

  writeToDatabase(catfile,profilefile,name,by,likes,place,tag);

  document.getElementById("filename").value = "";
  document.getElementById("by").value = "";
  document.getElementById("likes").value = "";
  document.getElementById("places").value = "";
  document.getElementById("tags").value = "";

}

function clearcat(){
  document.getElementById("profilefilename").value="";
  document.getElementById("name").value="";
}
