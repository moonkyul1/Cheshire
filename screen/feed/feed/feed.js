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
 
function makefeed(img,name,picture){
var feedstring="<div class=\"feed\">\
<div class=header>\
<img class=\"img\" src="+img+">\
<div class=\"name\">"+name+"</div>\
<img class=\"more\" src=../../../image/icon/menu.png>\
<img class=\"archive\" src=../../../image/icon/bookmark.png onclick=\"location.href=\'../../profile/user/archive/archive.html\'\">\
</div>\
<div class=\"content\" ><img id=\"contentid\" src="+picture+" onclick=\"location.href=\'../post/post.html\'\"></div>\
<div class=\"accessory\">\
<img id=\"comment\" src=../../../image/icon/message.png>\
<img id=\"like\" src=../../../image/icon/heart.png onclick=like(this)>\
<img id=\"feedgift\" src=../../../image/icon/cf.png onclick=\"location.href=\'../../gift/reward/reward.html\'\">\
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
      //console.log(myValue)
      var keyList = Object.keys(myValue);
      for (var i=num;i<num+1;i++){
        var currentKey = keyList[i];
        //console.log(keyList)
        $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture))
      }
    });
  }

  function feedgo(num){
    for(var i = 0 ; i<num; i++){
      var a= getRandomInt(0,20);
      readFromDatabase(a);
    }
  }


feedgo(10);

function writeToDatabase(catfile,name){
  var newKey = firebase.database().ref('/post/').push();
  var imgc="../../../image/picture/"+catfile;
  var picture=imgc;
  newKey.set({
    //location of dictionary
    img: imgc,
    name: name,
    picture: picture
  });

}


$(document.body).on('touchmove', onScroll); // for mobile
$(window).on('scroll', onScroll); 

function onScroll(){
  if($(window).scrollTop() == 0){
    //hearder seen
  }  

  if (Math.round( $(window).scrollTop()) == $(document).height() - $(window).height()) {
    feedgo(10);
  } 
}



$(document).on("scrollstop", function (e) {

  /* active page */
var activePage = $.mobile.pageContainer.pagecontainer("getActivePage"),

  /* window's scrollTop() */
  scrolled = $(window).scrollTop(),

  /* viewport */
  screenHeight = $.mobile.getScreenHeight(),

  /* content div height within active page */
  contentHeight = $(".ui-content", activePage).outerHeight(),

  /* header's height within active page (remove -1 for unfixed) */
  header = $(".ui-header", activePage).outerHeight() - 1,

  /* footer's height within active page (remove -1 for unfixed) */
  footer = $(".ui-footer", activePage).outerHeight() - 1,

  /* total height to scroll */
  scrollEnd = contentHeight - screenHeight + header + footer;

/* if total scrolled value is equal or greater
 than total height of content div (total scroll)
 and active page is the target page (pageX not any other page)
 call addMore() function */
if (activePage[0].id == "pageX" && scrolled+10 >= scrollEnd) {
  feedgo(10);
}
});



function scrollUp()
{
  window.scrollTo(0,0)
}