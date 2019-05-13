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
<a href=\"#\">\
<div id="+keylist[i]+"><img src="+imglist[i] +" class=\"feedImg\" onclick=\"save(this); location.href=\'../../feed/post/post.html\';\"></div>\
</a>\
</div>\
<div class=\"col-sm\">\
<a href=\"#\">\
<div id="+keylist[i+1]+"><img src="+imglist[i+1] +" class=\"feedImg\" onclick=\"save(this); location.href=\'../../feed/post/post.html\';\"></div>\
</a>\
</div>\
<div class=\"col-sm\">\
<a href=\"#\">\
<div id="+keylist[i+2]+"><img src="+imglist[i+2] +" class=\"feedImg\" onclick=\"save(this); location.href=\'../../feed/post/post.html\';\"></div>\
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
<a href=\"#\">\
<div id="+keylist[a*3]+"><img src="+imglist[a*3] +" class=\"feedImg\" onclick=\"save(this); location.href=\'../../feed/post/post.html\';\"></div>\
</a>\
</div>\
<div class=\"col-sm\">\
<a href=\"#\">\
</a>\
<div class=\"col-sm\">\
<a href=\"#\">\
</a>\
</div>\
";
    second=second+fss;
  }
  if(b==2){
var fss="\
<div class=\"row no-gutters\">\
<div class=\"col-sm\">\
<a href=\"#\">\
<div id="+keylist[a*3]+"><img src="+imglist[a*3] +" class=\"feedImg\" onclick=\"save(this); location.href=\'../../feed/post/post.html\';\"></div>\
</a>\
</div>\
<div class=\"col-sm\">\
<a href=\"#\">\
<div id="+keylist[a*3+1]+"><img src="+imglist[a*3+1] +" class=\"feedImg\" onclick=\"save(this); location.href=\'../../feed/post/post.html\';\"></div>\
</a>\
</div>\
<div class=\"col-sm\">\
<a href=\"#\">\
</a>\
</div>\
";
    second=second+fss
  }

  return first+second;  
}

  function readFromDatabase(user) {
    /*
        Read comments from the database
        Print all the comments to the table
    */
    return firebase.database().ref('/user/'+user.uid+'/').once('value',function(snapshot){
      var myValue = snapshot.val();
      if(myValue==null){

      }
      else{
        var keyList = Object.keys(myValue);
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          if(currentKey == 'nickname'){
            var nickname=myValue[currentKey];
            $('#username').text(nickname);
          }
            //$('#feedcontainer').prepend(makemid(myValue[currentKey].by, myValue[currentKey].tag));
            //$('#feedcontainer').prepend(feedmake(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture));
        }
      }
      
    });
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
    return firebase.database().ref('/user/'+user.uid+'/post/').once('value',function(snapshot){
      var myValue = snapshot.val();
      if(myValue==null){
        
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
  

    
//readFromSave();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //var imglist=[];
    readFromDatabase(user);
    readFromimg(user).then(
      function(){
        if(imglist.length != 0){
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

