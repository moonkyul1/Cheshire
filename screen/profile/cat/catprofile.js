var config = {
  apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
  authDomain: "cs374-2e397.firebaseapp.com",
  databaseURL: "https://cs374-2e397.firebaseio.com",
  projectId: "cs374-2e397",
  storageBucket: "",
  messagingSenderId: "558070618198"
};

var catname;

firebase.initializeApp(config);

function readFromFind(){
  return firebase.database().ref('/find/').once('value',function(snapshot){
      var myValue = snapshot.val();
      var keyList = Object.keys(myValue);
      var currentKey = keyList[0];
      catname=(myValue[currentKey].key).slice(3);
      $('#name').text(catname);
    });
}

function save(Obj){
  firebase.database().ref('/save/').remove();
  var newKey = firebase.database().ref('/save/').push();
  var akey= $(Obj).parent().attr("id");
  newKey.set({
    key: akey
  });
}


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

function readFromDatabase(catname) {
  /*
      Read comments from the database
      Print all the comments to the table
  */
  return firebase.database().ref('/cat/'+catname+'/').once('value',function(snapshot){
    var myValue = snapshot.val();
    if(myValue==null){

    }
    else{
      var keyList = Object.keys(myValue);
      for (var i=0;i<keyList.length;i++){
        var currentKey = keyList[i];
        if(currentKey == 'profile'){
         
          $('#profile').attr('src',myValue[currentKey]);
        }

      }
    }
    
  });
}


var imglist=[];
var keylist=[];
function readFromimg(catname) {
  /*
     Read comments from the database
     Print all the comments to the table
  */
  return firebase.database().ref('/cat/'+catname+'/post/').once('value',function(snapshot){
    var myValue = snapshot.val();
    if(myValue==null){
      $('#postnum').text('0');
    }
    else{
      var keyList = Object.keys(myValue);
      for (var i=0;i<keyList.length;i++){
        var currentKey = keyList[i];
        keylist.push(currentKey);
        imglist.push(myValue[currentKey].picture);
      }
      $('#postnum').text(keyList.length);
    }
    
    //imglist;
    //imglist=parseImage(imglist);
    //console.log("afterimglist is")
    //console.log(imglist);
    
  });
}


function readFunding(catname) {
  /*
     Read comments from the database
     Print all the comments to the table
  */
  return firebase.database().ref('/cat/'+catname+'/project').once('value',function(snapshot){
    var myValue = snapshot.val();
    if(myValue==null){
    
    }
    else{
      var keyList = Object.keys(myValue);
      for (var i=0;i<keyList.length;i++){
        var currentKey = keyList[i];
        if(myValue[currentKey].done==false){
          var current=myValue[currentKey].current;
          var total=myValue[currentKey].total;
          if(myValue[currentKey].item=="CAT FOOD"){
            //console.log("1");
            $('#prog1').attr('value',current);
            $('#prog1').attr('max',total);
            $('#pbutton1').attr('disabled', false);
          }
          else if(myValue[currentKey].item=="BLANKET"){
            //console.log("2");
            $('#prog2').attr('value',current);
            $('#prog2').attr('max',total);
            $('#pbutton2').attr('disabled', false);
          }
          else if(myValue[currentKey].item=="CAT TOY"){
            //console.log("3");
            $('#prog3').attr('value',current);
            $('#prog3').attr('max',total);
            $('#pbutton3').attr('disabled', false);
          }
          else if(myValue[currentKey].item=="CAT HOUSE"){
            //console.log("4");
            $('#prog4').attr('value',current);
            $('#prog4').attr('max',total);
            $('#pbutton4').attr('disabled', false);
          }
        }
        

      }
    }
    
    //imglist;
    //imglist=parseImage(imglist);
    //console.log("afterimglist is")
    //console.log(imglist);
    
  });
}


function writefunding(Obj){
  var newKey = firebase.database().ref('/save/').push();
  var akey= $(Obj).parent().attr("id");
  newKey.set({
    key: akey
  });
}


  
//readFromSave();




firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  // User is signed in.
  //var imglist=[];
  readFromFind().then(function(){
    readFromDatabase(catname);
    readFunding(catname);
    readFromimg(catname).then(function(){
      if(imglist.length != 0){
          $('#container').append(feedmake(keylist,imglist));
      }
    })
  });
} else {
  alert("no sing");
  // No user is signed in.
}
});

function JbFunc1() {
  var a = document.getElementById( 'prog1' ).value;
  document.getElementById( 'prog1' ).value = a*1 + 10;
}

function JbFunc2() {
  var a = document.getElementById( 'prog2' ).value;
  document.getElementById( 'prog2' ).value = a*1 + 10;
}

function JbFunc3() {
  var a = document.getElementById( 'prog3' ).value;
  document.getElementById( 'prog3' ).value = a*1 + 10;
}

function JbFunc4() {
  var a = document.getElementById( 'prog4' ).value;
  document.getElementById( 'prog4' ).value = a*1 + 10;
}