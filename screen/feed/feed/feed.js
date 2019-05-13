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
    var akey= $(Obj).parent().attr("id");
    var user = firebase.auth().currentUser;
    if(img1.indexOf('_selected')==-1){
        img1=img1.replace('.png','_selected.png');
        $(Obj).attr("src",img1);
        
        var akey= $(Obj).parent().attr("id");
        //console.log(user.uid);
        var newKey = firebase.database().ref('/user/'+user.uid+'/like/'+akey+"/").push();
        newKey.set({
          postnum: akey
        });
        //del
    }
    else{
        img1=img1.replace('_selected.png','.png');
        $(Obj).attr("src",img1)
        firebase.database().ref('/user/' +user.uid+'/like/'+akey+'/').remove();
        //push
    }
}
 
function makefeed(img,name,picture,altkey){
var feedstring="<div class=\"feed\">\
<div class=header>\
<div class=\"content\" id="+altkey+" ><img class=\"img\" src="+img+" onclick=\"save(this); location.href=\'../../profile/cat/catprofile.html\';\"></div>\
<div class=\"name\">"+name+"</div>\
<div class=\"content\" id="+altkey+" ><img class=\"archive\" src=../../../image/icon/bookmark.png onclick=\"picarchive(this);alertTestFn();\"></div>\
</div>\
<div class=\"content\" id="+altkey+" ><img id=\"contentid\" src="+picture+" onclick=\"save(this); location.href=\'../post/post.html\';\"></div>\
<div class=\"accessory\" id="+altkey+">\
<img id=\"comment\" src=../../../image/icon/message.png  onclick=\"save(this); location.href=\'../post/post.html\';\">\
<img id=\"like\" src=../../../image/icon/heart.png onclick=\"like(this);piclike(this);\">\
<img id=\"feedgift\" src=../../../image/icon/cf.png onclick=\"location.href=\'../../gift/reward/reward.html\'\">\
</div>\
</div>";
return feedstring;
}

function makelikefeed(img,name,picture,altkey){
var feedstring="<div class=\"feed\">\
<div class=header>\
<div class=\"content\" id="+altkey+" ><img class=\"img\" src="+img+" onclick=\"save(this); location.href=\'../../profile/cat/catprofile.html\';\"></div>\
<div class=\"name\">"+name+"</div>\
<div class=\"content\" id="+altkey+" ><img class=\"archive\" src=../../../image/icon/bookmark.png onclick=\"picarchive(this);alertTestFn();\"></div>\
</div>\
<div class=\"content\" id="+altkey+" ><img id=\"contentid\" src="+picture+" onclick=\"save(this); location.href=\'../post/post.html\';\"></div>\
<div class=\"accessory\" id="+altkey+">\
<img id=\"comment\" src=../../../image/icon/message.png  onclick=\"save(this); location.href=\'../post/post.html\';\">\
<img id=\"like\" src=../../../image/icon/heart_selected.png onclick=\"like(this);piclike(this);\">\
<img id=\"feedgift\" src=../../../image/icon/cf.png onclick=\"modalTestFn()\">\
</div>\
</div>";
return feedstring;
}


  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function readFromDatabase(num) {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/post/').once('value',function(snapshot){
      var myValue = snapshot.val();
      var keyList = Object.keys(myValue);
      for (var i=num;i<num+1;i++){
        var currentKey = keyList[i];
        if(likelist.indexOf(currentKey) != -1){
          $('#container').append(makelikefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture, currentKey));
        }
        else{
          $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture, currentKey));
        }
        
      }
    });
  }

  function readFromLike(user,likelist) {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/user/'+user.uid+'/like/').once('value',function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){

      }
      else{
        var keyList = Object.keys(myValue);
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          likelist.push(currentKey);
        }
      }
      
    });
  }



  function feedgo(num){
    for(var i = 0 ; i<num; i++){
      var a= getRandomInt(0,20);
      readFromDatabase(a);
    }
  }

  var likelist=[]

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //var imglist=[];
      readFromLike(user,likelist).then(
        function(){
          feedgo(10);  
        }
  
      );
    } else {
      alert("no sing");
      // No user is signed in.
    }
  });


function writeToDatabase(catfile,contentfile,name,by,likes,place,tag){
  var newKey = firebase.database().ref('/post/').push();
  var imgc="../../../image/picture/"+catfile;
  var imga="../../../image/picture/"+contentfile;
  var picture=imga;
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

function save(Obj){
  firebase.database().ref('/save/').remove();
  var newKey = firebase.database().ref('/save/').push();
  var akey= $(Obj).parent().attr("id");
  newKey.set({
    key: akey
  });
}

function picarchive(Obj){
  var user = firebase.auth().currentUser;
  var akey= $(Obj).parent().attr("id");
  //console.log(user.uid);
  var newKey = firebase.database().ref('/user/'+user.uid+'/archieve/').push();
  var akey= $(Obj).parent().attr("id");
  newKey.set({
    postnum: akey
  });
}

function piclike(Obj){
  
}

function modalTestFn(){
  $("#myModal").modal();
}

$(document.body).on('touchstop', onScroll); // for mobile
$(window).on('scroll', onScroll); 

function onScroll(){
  var b = $(document).height() - $(window).height();
  var a = ("st=" + $(window).scrollTop() + " he="+$(document).height()+ " wd="+ $(window).height() + " re="+b) ;
  var tagname= document.getElementById("searchInput");
  tagname.value=a;

  if($(window).scrollTop() == 0){
    //hearder seen
  }  
  
  if (Math.round( b-$(window).scrollTop()) <= 400) {
    feedgo(10);
  } 
}


function scrollUp()
{
  window.scrollTo(0,0)
}


function profiletest(){
  var user = firebase.auth().currentUser;
  if (user) {
    location.href='../../profile/user/userprofile.html';
  } else {
    alert("Please Login first");
  }
}

function alertTestFn(){
  $('.toast').toast({delay: 700});
  $('.toast').toast('show');
}
