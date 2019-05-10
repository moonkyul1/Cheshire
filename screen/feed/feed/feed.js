// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

var config = {
    apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
    authDomain: "cs374-2e397.firebaseapp.com",
    databaseURL: "https://cs374-2e397.firebaseio.com",
    projectId: "cs374-2e397",
    storageBucket: "",
    messagingSenderId: "558070618198"
};

firebase.initializeApp(config);
var con;

function like(Obj){
    var img1=$(Obj).attr("src")
    con=img1;
    if(img1.indexOf('_selected')==-1){
        img1=img1.replace('.png','_selected.png');
        $(Obj).attr("src",img1)
        console.log(img1)
    }
    else{
        img1=img1.replace('_selected.png','.png');
        $(Obj).attr("src",img1)
        console.log(img1)
    }
}

  function writeToDatabasewithoutundo(comment){
    var newKey = firebase.database().ref('/pr3/').push();
    var kk =String(newKey.key);
    var ch1= comment.substring(0,comment.indexOf('deleteBase'));
    var ch2=comment.substring(comment.indexOf("deleteLine"),);
    var com2=ch1+"deleteBase(\'"+kk+ "\');" +ch2;
    $("#here").prepend(com2);  
    newKey.set({
      //location of dictionary
      row: com2
    });
  
  }


 
function makefeed(img,name,picture){
var feedstring="<div class=\"feed\">\
<div class=header>\
<img class=\"img\" src="+img+">\
<div class=\"name\">"+name+"</div>\
<img class=\"more\" src=../../../image/icon/menu.png>\
<img class=\"archive\" src=../../../image/icon/bookmark.png>\
</div>\
<div class=\"content\" ><img id=\"contentid\" src="+picture+"></div>\
<div class=\"accessory\">\
<img id=\"comment\" src=../../../image/icon/message.png>\
<img id=\"like\" src=../../../image/icon/heart.png onclick=like(this)>\
<img id=\"feedgift\" src=../../../image/icon/cf.png>\
</div>\
</div>";
return feedstring;
}

  function readFromDatabase() {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/post/').once('value',function(snapshot){
      var myValue = snapshot.val();
      //console.log(myValue)
      var keyList = Object.keys(myValue);
      for (var i=0;i<keyList.length;i++){
        var currentKey = keyList[i];
        //console.log(keyList)
        
        console.log(myValue[currentKey].img);
        //console.log(myValue[currentKey].like);
        console.log(myValue[currentKey].name);
        console.log(myValue[currentKey].picture);
        $('#container').prepend(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture))
      }
    });
  }
  
readFromDatabase()
  