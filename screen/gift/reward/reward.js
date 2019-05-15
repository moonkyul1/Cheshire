var config = {
    apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
    authDomain: "cs374-2e397.firebaseapp.com",
    databaseURL: "https://cs374-2e397.firebaseio.com",
    projectId: "cs374-2e397",
    storageBucket: "",
    messagingSenderId: "558070618198"
};
firebase.initializeApp(config);


function readFromfunding(user) {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/user/'+user.uid+'/funding/').once('value',function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){
        $('#num').text('0');
        $('#cost').text('0$');
      }
      else{
        var keyList = Object.keys(myValue);
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          console.log(currentKey+myValue[currentKey]);
          if(currentKey=='num'){
            
            $('#num').text(myValue[currentKey]);
          }
          if(currentKey=='cost'){
            $('#cost').text(myValue[currentKey]+"$");
          }
            
        }
      }
      
      //imglist;
      //imglist=parseImage(imglist);
      //console.log("afterimglist is")
      //console.log(imglist);
      
    });
  }

  function readhistory(user) {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/user/'+user.uid+'/history/').once('value',function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){
       
      }
      else{
        var keyList = Object.keys(myValue);
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          
          var cn=myValue[currentKey].catname;
          var cs=myValue[currentKey].sort;
          var cd=myValue[currentKey].date;
          var ci=ourimage.indexOf(cn)+1;
          if(cd!=undefined){
            $('#feedcontainer').append(makefeed(cn,cs,cd,ourimage[ci]));
          }
          
        }
      }
      
      //imglist;
      //imglist=parseImage(imglist);
      //console.log("afterimglist is")
      //console.log(imglist);
      
    });
  }
  var ourimage=[];
  function readsumnail(){
    return firebase.database().ref('/cat/').once('value',function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){
          console.log("hello");
       
      }
      else{
        var keyList = Object.keys(myValue);
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          
            ourimage.push(currentKey);
            ourimage.push(myValue[currentKey].profile);
          
          
        }
      }
      
      //imglist;
      //imglist=parseImage(imglist);
      //console.log("afterimglist is")
      //console.log(imglist);
      
    });
  }


function makefeed(catname,sort,date,simage){
var fs="\
<div class=\"history_box shadow-sm\">\
<div class=\"history_title\">\
<div class=\"title_left\">\
You bought\
</div>\
<div class=\"title_content\">\
<div class=\"content_text\">\
"+sort+"\
</div>\
</div>\
<div class=\"title_right\">\
for\
</div>\
</div>\
\
<div class=\"history_cat\">\
<div class=\"profile\">\
<img class=\"profile\" src="+simage+">\
</div>\
<div class=\"catName\">\
"+catname+"\
</div>\
</div>\
\
<div class=\"history_date\">\
<div class=\"date_left\">\
on&nbsp\
</div>\
<div class=\"date_content\">\
"+date+"\
</div>\
</div>\
\
<div class=\"history_button\">\
<button type=\"button\" class=\"btn btn-primary\" onclick=simpleLightbox();>VIEW REWARD</button>\
</div>\
</div>\
"  
return fs;
}




function simpleLightbox(){
  window.open('', 'simpleLightbox').document.write('<html><head><meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, width=device-width" /></head><body bgcolor = "#000000" style="margin:0;  height:100%;" onclick="javascript:window.close(\'simpleLightbox\');"><table border="0" width="100%" height="100%"><tr><td valign="middle" align="center"><img style="position:relative;z-index:2;width:100%; object-fit: cover;" src="'+"../../../image/assets/goldcat.png"+'"/></td></tr></table></body></html>');
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //var imglist=[];
      readFromfunding(user);
      readsumnail().then(function(){
        readhistory(user);
      });
      
    } else {
      alert("login please");
      // No user is signed in.
    }
  });
  

  function accessn(){
      alert("You are not a catmom!");
  }