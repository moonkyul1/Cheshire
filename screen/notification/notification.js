var config = {
    apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
    authDomain: "cs374-2e397.firebaseapp.com",
    databaseURL: "https://cs374-2e397.firebaseio.com",
    projectId: "cs374-2e397",
    storageBucket: "",
    messagingSenderId: "558070618198"
};
firebase.initializeApp(config);



  function readhistory(user) {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/user/'+user.uid+'/notification/').once('value',function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){
          console.log("hello");
       
      }
      else{
        var keyList = Object.keys(myValue);
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          
          var cn=myValue[currentKey].catname;
          var cs=myValue[currentKey].sort;
          $('#feedcontainer').append(makefeed(cn,cs));
        }
      }
      
      //imglist;
      //imglist=parseImage(imglist);
      //console.log("afterimglist is")
      //console.log(imglist);
      
    });
  }

function makefeed(catname,sort){
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
3rd April 2019.\
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
  window.open('', 'simpleLightbox').document.write('<html><head><meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, width=device-width" /></head><body bgcolor = "#000000" style="margin:0;  height:100%;" onclick="javascript:window.close(\'simpleLightbox\');"><table border="0" width="100%" height="100%"><tr><td valign="middle" align="center"><img style="position:relative;z-index:2;width:100%; object-fit: cover;" src="'+"../../image/assets/goldcat.png"+'"/></td></tr></table></body></html>');
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //var imglist=[];
      readhistory(user);
    } else {
      alert("login please");
      // No user is signed in.
    }
  });
  

  function accessn(){
      alert("You are not a catmom!");
  }