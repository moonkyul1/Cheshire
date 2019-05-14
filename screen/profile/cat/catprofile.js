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


function writefunding(Obj){
  var newKey = firebase.database().ref('/save/').push();
  var akey= $(Obj).parent().attr("id");
  newKey.set({
    key: akey
  });
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