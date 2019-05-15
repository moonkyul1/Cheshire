var config = {
    apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
    authDomain: "cs374-2e397.firebaseapp.com",
    databaseURL: "https://cs374-2e397.firebaseio.com",
    projectId: "cs374-2e397",
    storageBucket: "",
    messagingSenderId: "558070618198"
};
firebase.initializeApp(config);



function save(Obj){
  firebase.database().ref('/save/').remove();
  var newKey = firebase.database().ref('/save/').push();
  var akey= $(Obj).parent().attr("id");
  newKey.set({
    key: akey
  });
}

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

function feedmake(keylist,imglist){
    console.log(keylist);
    var a = parseInt(imglist.length/3);
    var b = imglist.length%3;

  var first="";
  var second="";
    for(var i=0;i<a;i++){
  var fs="\
  <div class=\"row no-gutters\">\
  <div class=\"col-sm\">\
  <a href=\"#\" >\
  <div id="+keylist[i]+" class=\"addhere\"><img src="+"../"+imglist[i] +" class=\"feedImg\" onclick=\"check(this)\"></div>\
  </a>\
  </div>\
  <div class=\"col-sm\">\
  <a href=\"#\" >\
  <div id="+keylist[i+1]+" class=\"addhere\"><img src="+"../"+imglist[i+1] +" class=\"feedImg\" onclick=\"check(this)\"></div>\
  </a>\
  </div>\
  <div class=\"col-sm\">\
  <a href=\"#\" >\
  <div id="+keylist[i+2]+" class=\"addhere\"><img src="+"../"+imglist[i+2] +" class=\"feedImg\" onclick=\"check(this)\"></div>\
  </a>\
  </div>\
  </div>\
  ";

      first=first+fs;
    }

    if(b==1){
  var fss="\
  <div class=\"row no-gutters\">\
  <div class=\"col-sm\">\
  <a href=\"#\" >\
  <div id="+keylist[a*3]+" class=\"addhere\"><img src="+"../"+imglist[a*3] +" class=\"feedImg\" onclick=\"check(this)\"></div>\
  </a>\
  </div>\
  <div class=\"col-sm\">\
  <a href=\"#\" >\
  </a>\
  <div class=\"col-sm\">\
  <a href=\"#\" >\
  </a>\
  </div>\
  ";
      second=second+fss;
    }
    if(b==2){
  var fss="\
  <div class=\"row no-gutters\">\
  <div class=\"col-sm\">\
  <a href=\"#\" >\
  <div id="+keylist[a*3]+" class=\"addhere\"><img src="+"../"+imglist[a*3] +" class=\"feedImg\" onclick=\"check(this)\"></div>\
  </a>\
  </div>\
  <div class=\"col-sm\">\
  <a href=\"#\" >\
  <div id="+keylist[a*3+1]+" class=\"addhere\"><img src="+"../"+imglist[a*3+1] +" class=\"feedImg\" onclick=\"check(this)\"></div>\
  </a>\
  </div>\
  <div class=\"col-sm\">\
  <a href=\"#\" >\
  </a>\
  </div>\
  ";
      second=second+fss
    }

    return first+second;
  }


  function parseImage(imglist){
    return firebase.database().ref('/post/').once('value',function(snapshot){
      var myValue = snapshot.val();
      var keyList = Object.keys(myValue);
      for(var j = 0;j<imglist.length;j++){
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          if(currentKey == imglist[j]){
            imglist[j]=myValue[currentKey].picture;
            break;
          }
        }
      }

    });
  }

  var imglist=[];
  var keylist=[];
  function readFromimg(user) {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/user/'+user.uid+'/archieve/').once('value',function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){

      }
      else{
        var keyList = Object.keys(myValue);
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          keylist.push(myValue[currentKey].postnum);
          imglist.push(myValue[currentKey].postnum);
        }
      }

      //imglist;
      //imglist=parseImage(imglist);
      //console.log("afterimglist is")
      //console.log(imglist);

    });
  }

  function readFromArchive(user,did) {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/user/'+user.uid+'/archieve/').once('value',function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){

      }
      else{
        var keyList = Object.keys(myValue);
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          if(myValue[currentKey].postnum == did){
            firebase.database().ref('/user/'+users.uid+'/archieve/'+currentKey).remove();
          }
        }
      }

      //imglist;
      //imglist=parseImage(imglist);
      //console.log("afterimglist is")
      //console.log(imglist);

    });
  }



//readFromSave();
var users;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    users=user;
    // User is signed in.
    //var imglist=[];
    readFromimg(user).then(
      function(){
        if(imglist.length!=0){
          parseImage(imglist).then(function(){
            $('#imgcontainer').append(feedmake(keylist,imglist));
          });
        }
      }

    );
  } else {
    alert("no sing");
    // No user is signed in.
  }
});

function simpleLightbox(imageUrl){
  window.open('', 'simpleLightbox').document.write('<html><head><meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, width=device-width" /></head><body bgcolor = "#000000" style="margin:0;  height:100%;" onclick="javascript:window.close(\'simpleLightbox\');"><table border="0" width="100%" height="100%"><tr><td valign="middle" align="center"><img style="position:relative;z-index:2;width:100%; object-fit: cover;" src="'+imageUrl+'"/></td></tr></table></body></html>');
}


function check(Obj){
  simpleLightbox($(Obj).attr('src'));
}
var c;
function deleteOverlay(){

  var x = document.querySelectorAll(".addhere");
  for(var i = 0; i < x.length; i++){
    var overlay = document.createElement("img");
    overlay.src = "../../../../image/assets/del_overlay.png";
    overlay.className = "overlay_transparent";
    overlay.onclick=function(){
      var did= this.parentElement.id;
      console.log('/user/'+users.uid+'/archieve/'+did);
      if(confirm('Do you want to delete this archive?')){
        readFromArchive(users,did).then(function(){
          location.href='./archive.html';
        });
      }
      else{

      }
      


    };
    x[i].appendChild(overlay);
    // x[i].
    // x[i].style.backgroundColor = "red";
  }

  document.getElementById("delBtn").style = "display:none";
  document.getElementById("canBtn").style = "display.block";
}


function cancelOverlay(){
  $('.overlay_transparent').remove();
  // var x = document.querySelectorAll(".overlay_transparent");
  // for(var i = 0; i < x.length; i++){
  //   x[i].style = "display:none";
  //   // x[i].
  //   // x[i].style.backgroundColor = "red";
  // }

  document.getElementById("canBtn").style = "display:none";
  document.getElementById("delBtn").style = "display.block";
}
