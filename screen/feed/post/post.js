// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var tagname= document.getElementById("newComment");  

var usernickname="";

tagname.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      console.log(tagname.value);
      if(tagname.value!=''){

  var second="";

var tp="\
<div class=\"row comment\">\
<div class=\"col-sm-3 username\">\
@"+usernickname+"\
</div>\
<div class=\"col-sm-9\" style=\"width:100px;word-break:break-all;word-wrap:break-word;\">\
"+tagname.value+"\
</div>\
</div>\
"
second=second+tp;
        
        
    
          $('#container').append(second);
          writeToDatabase('@'+usernickname,tagname.value)
          tagname.value='';
      }      

    }
  });

  $("#commentsubmit").click(function(){
    if(tagname.value!=''){

      var second="";
    
var tp="\
<div class=\"row comment\">\
<div class=\"col-sm-3 username\">\
@"+usernickname+"\
</div>\
<div class=\"col-sm-9\" style=\"width:100px;word-break:break-all;word-wrap:break-word;\">\
"+tagname.value+"\
</div>\
</div>\
"
    second=second+tp;
            
            
        
              $('#container').append(second);
              writeToDatabase('@'+usernickname,tagname.value)
              tagname.value='';
          }
  })


var namelist=[];
var commentlist=[];

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
      }
      else{
          img1=img1.replace('_selected.png','.png');
          $(Obj).attr("src",img1)
      }
  }
  
  var mykey;

  function readFromSave(){
    return firebase.database().ref('/save/').once('value',function(snapshot){
        var myValue = snapshot.val();
        var keyList = Object.keys(myValue);
        var currentKey = keyList[0];
        mykey=(myValue[currentKey].key);
      });
  }

function feedmake(imgsrc,name,contentsrc){
var fs="\
<div class=\"feed\">\
<div class=header>\
<img class=\"img\" src="+imgsrc+">\
<div class=\"name\">"+name+"</div>\
<img class=\"more\" src=../../../image/icon/menu.png>\
<img class=\"archive\" src=../../../image/icon/bookmark.png>\
</div>\
<div class=\"content\" ><img id=\"contentid\" src="+contentsrc+"></div>\
<div class=\"accessory\">\
<img id=\"commentIcon\" src=../../../image/icon/message_selected.png>\
<img id=\"like\" src=../../../image/icon/heart.png onclick=like(this)>\
<img id=\"feedgift\" src=../../../image/icon/cf.png>\
</div>\
</div>\
"
return fs;
}

function makemid(photoby,tag){
var first="\
<div class=\"tabtitle\">\
PHOTOGRAPHED BY: <span class=\"username\">"+photoby+"</span>\
</div>\
";
var second="\
<div class=\"tagslist tabtitle\">\
";
var third="";

var fourth="\
</div>\
"
var li=tag.split("////");
if(li[0]=="" && li.length==1){

}
else{
    for(var i = 0 ; i<li.length;i++){
var tp="\
<span class=\"badge badge-pill badge-secondary tag\">\
<img src=../../../image/icon/tag_small.png>\
<div class=\"tagname\">"+li[i]+"</div>\
</span>\
"
    third=third+tp;       

    }
}

var fs=first+second+third+fourth;

return fs;
}

function makecomment(){

var second="";

if(commentlist.length==0){

}
else{
    for(var i = 0 ; i<commentlist.length;i++){
var tp="\
<div class=\"row comment\">\
<div class=\"col-sm-3 username\">\
"+namelist[i]+"\
</div>\
<div class=\"col-sm-9\" style=\"width:100px;word-break:break-all;word-wrap:break-word;\">\
"+commentlist[i]+"\
</div>\
</div>\
"
        second=second+tp;
    }
}





var fs=second;
return fs;
}



    function readFromDatabase() {
      /*
         Read comments from the database
         Print all the comments to the table
      */
      return firebase.database().ref('/post/').once('value',function(snapshot){
        var myValue = snapshot.val();
        var keyList = Object.keys(myValue);
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          if(currentKey == mykey){
            console.log("find!" + " " +myValue[currentKey].name);
            $('#feedcontainer').prepend(makemid(myValue[currentKey].by, myValue[currentKey].tag));
            $('#feedcontainer').prepend(feedmake(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture));
            readFromComment();
            
          }
          
        }
      });
    }

    function readFromComment() {
        /*
           Read comments from the database
           Print all the comments to the table
        */
        return firebase.database().ref('/post/'+mykey+'/comment').once('value',function(snapshot){
          var myValue = snapshot.val();
          if(myValue==null){

          }
          else{
            var keyList = Object.keys(myValue);
            for (var i=0;i<keyList.length;i++){
              var currentKey = keyList[i];
              namelist.push(myValue[currentKey].name);
              commentlist.push(myValue[currentKey].comment);
            }
          $('#container').append(makecomment());
          }
          
        });
      }

      function writeToDatabase(name,comment){
        var newKey = firebase.database().ref('/post/'+mykey+'/comment').push();
        if(comment != ""){
          newKey.set({
            //location of dictionary
            name: name,
            comment: comment
          });
        }
      }
    
  
readFromSave();
readFromDatabase();



function readnickname(user) {
  /*
     Read comments from the database
     Print all the comments to the table
  */
  return firebase.database().ref('/user/'+user.uid+'/').once('value',function(snapshot){
    var myValue = snapshot.val();
    var keyList = Object.keys(myValue);
    for (var i=0;i<keyList.length;i++){
      var currentKey = keyList[i];
      if(currentKey == 'nickname'){
        usernickname=myValue[currentKey];
      }
    }
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    readnickname(user);
  } else {
    usernickname="(imsi)";
  }
});