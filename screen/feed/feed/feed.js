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
    con=Obj;
    var img1=$(Obj).attr("src")
    var akey= $(Obj).parent().attr("id");
    var user = firebase.auth().currentUser;
    if(img1.indexOf('_selected')==-1){
        img1=img1.replace('.png','_selected.png');
        $(Obj).attr("src",img1);
        
        var akey= $(Obj).parent().attr("id");
        likelist.push(akey);
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
        var index=likelist.indexOf(akey);
        likelist.splice(index,1);
        //push
    }
}
var catname="";

function namemake(Obj){
  catname=$(Obj).parent().parent().children().children()[1].innerHTML;
}
 
function makefeed(img,name,picture,altkey){
var feedstring="<div class=\"feed\">\
<div class=header>\
<div class=\"content\" id=cat"+name+" ><img class=\"img\" src="+img+" onclick=\"find(this); location.href=\'../../profile/cat/catprofile.html\';\"></div>\
<div class=\"name\">"+name+"</div>\
<div class=\"content\" id="+altkey+" ><img class=\"archive\" src=../../../image/icon/bookmark.png onclick=\"picarchive(this);alertTestFn();\"></div>\
</div>\
<div class=\"content\" id="+altkey+" ><img id=\"contentid\" src="+picture+" onclick=\"save(this); location.href=\'../post/post.html\';\"></div>\
<div class=\"accessory\" id="+altkey+">\
<img id=\"comment\" src=../../../image/icon/message.png  onclick=\"save(this); location.href=\'../post/post.html\';\">\
<img id=\"like\" src=../../../image/icon/heart.png onclick=\"like(this);\">\
<img id=\"feedgift\" src=../../../image/icon/cf.png onclick=\"modalTestFn();namemake(this);readfunding(catname);\">\
</div>\
</div>";
return feedstring;
}

function makelikefeed(img,name,picture,altkey){
var feedstring="<div class=\"feed\">\
<div class=header>\
<div class=\"content\" id=cat"+name+" ><img class=\"img\" src="+img+" onclick=\"find(this); location.href=\'../../profile/cat/catprofile.html\';\"></div>\
<div class=\"name\">"+name+"</div>\
<div class=\"content\" id="+altkey+" ><img class=\"archive\" src=../../../image/icon/bookmark.png onclick=\"picarchive(this);alertTestFn();\"></div>\
</div>\
<div class=\"content\" id="+altkey+" ><img id=\"contentid\" src="+picture+" onclick=\"save(this); location.href=\'../post/post.html\';\"></div>\
<div class=\"accessory\" id="+altkey+">\
<img id=\"comment\" src=../../../image/icon/message.png  onclick=\"save(this); location.href=\'../post/post.html\';\">\
<img id=\"like\" src=../../../image/icon/heart_selected.png onclick=\"like(this);\">\
<img id=\"feedgift\" src=../../../image/icon/cf.png onclick=\"modalTestFn();namemake(this);readfunding(catname);\">\
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

function find(Obj){
  firebase.database().ref('/find/').remove();
  var newKey = firebase.database().ref('/find/').push();
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







function clickFunding1(catname) {
  
  var a = document.getElementById( 'prog1' ).value;
  document.getElementById( 'prog1' ).value = a*1 + 1;

  var now= $('#prog1').attr('value');
  var end=$('#prog1').attr('max');
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
        if(myValue[currentKey].item=="CAT FOOD"){
          if(myValue[currentKey].done==false){
            var refDir='/cat/'+catname+'/project/'+currentKey+'/';
            console.log(firebase.database().ref(refDir));
            if(now==end){
              firebase.database().ref(refDir).set({
                item: "CAT FOOD",
                total: end,
                current: now,
                done: true
              });
              $('#pbutton1').attr('disabled', true);
            } 
            else{
              firebase.database().ref(refDir).set({
                item: "CAT FOOD",
                total: end,
                current: now,
                done: false
              });
            }
          }
        }
      }
    }
  });
}

function clickFunding2(catname) {
  
  var a = document.getElementById( 'prog2' ).value;
  document.getElementById( 'prog2' ).value = a*1 + 1;

  var now= $('#prog2').attr('value');
  var end=$('#prog2').attr('max');
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
        if(myValue[currentKey].item=="BLANKET"){
          if(myValue[currentKey].done==false){
            var refDir='/cat/'+catname+'/project/'+currentKey+'/';
            console.log(firebase.database().ref(refDir));
            if(now==end){
              firebase.database().ref(refDir).set({
                item: "BLANKET",
                total: end,
                current: now,
                done: true
              });
              $('#pbutton2').attr('disabled', true);
            } 
            else{
              firebase.database().ref(refDir).set({
                item: "BLANKET",
                total: end,
                current: now,
                done: false
              });
            }
          }
        }
      }
    }
  });
}

function clickFunding3(catname) {
  
  var a = document.getElementById( 'prog3' ).value;
  document.getElementById( 'prog3' ).value = a*1 + 1;

  var now= $('#prog3').attr('value');
  var end=$('#prog3').attr('max');
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
        if(myValue[currentKey].item=="CAT TOY"){
          if(myValue[currentKey].done==false){
            var refDir='/cat/'+catname+'/project/'+currentKey+'/';
            console.log(firebase.database().ref(refDir));
            if(now==end){
              firebase.database().ref(refDir).set({
                item: "CAT TOY",
                total: end,
                current: now,
                done: true
              });
              $('#pbutton3').attr('disabled', true);
            } 
            else{
              firebase.database().ref(refDir).set({
                item: "CAT TOY",
                total: end,
                current: now,
                done: false
              });
            }
          }
        }
      }
    }
  });
}

function clickFunding4(catname) {
  
  var a = document.getElementById( 'prog4' ).value;
  document.getElementById( 'prog4' ).value = a*1 + 1;

  var now= $('#prog4').attr('value');
  var end=$('#prog4').attr('max');
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
        if(myValue[currentKey].item=="CAT HOUSE"){
          if(myValue[currentKey].done==false){
            var refDir='/cat/'+catname+'/project/'+currentKey+'/';
            console.log(firebase.database().ref(refDir));
            if(now==end){
              firebase.database().ref(refDir).set({
                item: "CAT HOUSE",
                total: end,
                current: now,
                done: true
              });
              $('#pbutton4').attr('disabled', true);
            } 
            else{
              firebase.database().ref(refDir).set({
                item: "CAT HOUSE",
                total: end,
                current: now,
                done: false
              });
            }
          }
        }
      }
    }
  });
}

function readfunding(catname) {
  console.log("hello");
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
            $('#cost1').text('$'+total);
            $('#pbutton1').attr('disabled', false);
          }
          else if(myValue[currentKey].item=="BLANKET"){
            //console.log("2");
            $('#prog2').attr('value',current);
            $('#prog2').attr('max',total);
            $('#cost2').text('$'+total);
            $('#pbutton2').attr('disabled', false);
          }
          else if(myValue[currentKey].item=="CAT TOY"){
            //console.log("3");
            $('#prog3').attr('value',current);
            $('#prog3').attr('max',total);
            $('#cost3').text('$'+total);
            $('#pbutton3').attr('disabled', false);
          }
          else if(myValue[currentKey].item=="CAT HOUSE"){
            //console.log("4");
            $('#prog4').attr('value',current);
            $('#prog4').attr('max',total);
            $('#cost4').text('$'+total);
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

function JbFunc1() {
  clickFunding1(catname);
}

function JbFunc2() {
  clickFunding2(catname);
}

function JbFunc3() {
  clickFunding3(catname);
}

function JbFunc4() {
  clickFunding4(catname);
}