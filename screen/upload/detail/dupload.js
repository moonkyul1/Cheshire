var config = {
  apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
  authDomain: "cs374-2e397.firebaseapp.com",
  databaseURL: "https://cs374-2e397.firebaseio.com",
  projectId: "cs374-2e397",
  storageBucket: "",
  messagingSenderId: "558070618198"
};

firebase.initializeApp(config);

var tagname= document.getElementById("tagname");

tagname.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if(tagname.value!=''){
        $('#tags').append(tagmake(tagname.value,170+tagname.value.length*13));
        taginfo.push(tagname.value);
        tagname.value='';
      }
      
    }
  });

function tagmake(tag,width){
var tagstring="\
<span class=\"badge badge-pill badge-secondary tag\"\
<span id=\"taga\">\
<img id=\"tag1\" src=../../../image/icon/tag_small.png>\
<div id=\"tag2\">"+tag+"</div>\
<img id=\"tag3\" src=../../../image/icon/x_small.png onclick=deleteLine(this);>\
</span>\
</span>\
";
return tagstring;
}
var c;
function deleteLine(Obj){
    var tr= $(Obj).parent();
    var tagn=$(Obj).parent().children()[1].innerHTML;
    var nindex=taginfo.indexOf(tagn);
    taginfo.splice(nindex,1);
    tr.remove();
  }


var catinfo =sessionStorage.getItem('key');
var catinfo=catinfo.split('////')
var catname=catinfo[0];
if(catname==""){
  catname='noname';
}
var catplace=catinfo[1];
var catpicture=catinfo[2];
var taginfo=[];
var cattag="";

var users;
$('#nextbtn').on('click',function(){
  var user = firebase.auth().currentUser;
  users=user;
  var captioninfo = $('#captionname').val();
  for(var i=0;i<taginfo.length;i++){
    if(i==0){
      cattag=cattag+taginfo[i];
    }else{
      cattag=cattag+"////"+taginfo[i];
    }
  }
  //console.log(catinfo);
  //console.log(taginfo);
  //console.log(captioninfo);
  //console.log(user.uid);
  readprofile(catname).then(function(){
    readnickname(user).then(function(){
      writetopost(usernickname,catprofile,catname,catpicture,catplace,cattag)
      if(captioninfo != ''){
        writetopostcomment(usernickname,captioninfo,key.key);
      }
      writetocat(catname,catpicture,key.key);
      writetouser(user,key.key);
      }).then(function(){
        location.href='../../feed/feed/feed.html';
      });
  });
  
  
});

var catprofile;
function readprofile(catname) {
  /*
      Read comments from the database
      Print all the comments to the table
  */
  return firebase.database().ref('/cat/'+catname+'/').once('value',function(snapshot){
    var myValue = snapshot.val();
    if(myValue==null){
      catprofile="../../../image/assets/catg.png";
      firstcat(catname);
    }
    else{
      var keyList = Object.keys(myValue);
      for (var i=0;i<keyList.length;i++){
        var currentKey = keyList[i];
        if(currentKey == 'profile'){
          catprofile=myValue[currentKey];
        }
      }
    }
  });
}

var usernickname;
function readnickname(user) {
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
          usernickname=myValue[currentKey];
        }
      }
    }
  });
}
var key;
function writetopost(usernickname,catprofile,catname,catpicture,catplace,cattag){
  if(cattag==''){
    var newKey = firebase.database().ref('/post/').push();
    usernickname='@'+usernickname;
    key=newKey;
    newKey.set({
      by:usernickname,
      byuid:users.uid,
      likes:0,
      img:catprofile,
      name:catname,
      picture:catpicture,
      place:catplace,
    });
  }
  else{
    var newKey = firebase.database().ref('/post/').push();
    usernickname='@'+usernickname;
    key=newKey;
    newKey.set({
      by:usernickname,
      byuid:users.uid,
      likes:0,
      img:catprofile,
      name:catname,
      picture:catpicture,
      place:catplace,
      tag:cattag
    });
  }
  

}

function writetopostcomment(usernickname,captioncomment,key){
  var newKey = firebase.database().ref('/post/'+key+'/comment').push();
  usernickname='@'+usernickname;
  newKey.set({
    comment:captioncomment,
    name:usernickname,
    byuid:users.uid
  });
}

function writetocat(catname,catpicture,key){
  
  var data={
    picture:catpicture
  }
  var updates={};
  updates['/cat/'+catname+'/post/'+key]=data;
  return firebase.database().ref().update(updates);
  
}

function writetouser(user,key){
  var newKey = firebase.database().ref('/user/'+user.uid+'/post').push();
  newKey.set({
    postnum:key,
  });
}

function firstcat(catname){
  firebase.database().ref('/cat/'+catname).set({
    profile:"../../../image/assets/catg.png"
  });  
}

$('#tagname').on("blur",function(){
  if($('#tagname').val()==''){
  }
  else{
    $('#tags').append(tagmake(tagname.value,170+tagname.value.length*13));
    taginfo.push(tagname.value);
    tagname.value='';
  }
})