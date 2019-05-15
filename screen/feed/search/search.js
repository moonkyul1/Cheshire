var tagname= document.getElementById("searchInput");

tagname.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $('#container').empty();
      readFromDatabase();
    }
  });

  function delinput(){
    tagname.value='';
    
  }

  function searchbtn(){
    $('#container').empty();
    readFromDatabase();
  };

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
  console.log(akey);
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

  function readFromDatabase() {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/post/').once('value',function(snapshot){
      var myValue = snapshot.val();
      var keyList = Object.keys(myValue);
      var inputValue = $('#searchInput').val();
      for (var i=0;i<keyList.length;i++){
        var currentKey = keyList[i];
        if(myValue[currentKey].name == inputValue){
          if(likelist.indexOf(currentKey) != -1){
            console.log("1");
            $('#container').append(makelikefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture, currentKey));
          }
          else{
            console.log("2");
            $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture, currentKey));
          }
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


function save(Obj){
  firebase.database().ref('/save/').remove();
  var newKey = firebase.database().ref('/save/').push();
  var akey= $(Obj).parent().attr("id");
  newKey.set({
    key: akey
  });
}

var likelist=[]
var users;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    users=user;
    // User is signed in.
    //var imglist=[];
    readcredit(user);
    readFromLike(user,likelist)
  } else {
    alert("no sing");
    // No user is signed in.
  }
});


function alertTestFn(){
  $('.toast').toast({delay: 700});
  $('.toast').toast('show');
}

function modalTestFn(){
  $("#myModal").modal();
}

function writefunding(Obj){
  var newKey = firebase.database().ref('/save/').push();
  var akey= $(Obj).parent().attr("id");
  newKey.set({
    key: akey
  });
}

function clickFunding1(catname) {
  var now1= $('#prog1').attr('value')*1;
  var end1=$('#prog1').attr('max')*1;
  var le=end1-now1;
  if(confirm("Funding 1$ for "+catname+"\'s "+"CAT FOOD?\n"+le+"$ left for reaching goal.\n"+"now your credit is "+usercredit+"$")){
    usercredit=usercredit-1;
    usercost=usercost+1;
    
    if(userlist.includes(catname)){
    }
    else{
      userlist=userlist+"////"+catname;
      usernum=usernum+1;
      
    }
    alert("Confirmed.\nleft credit:" +usercredit);
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
              var saves=myValue[currentKey].by;
              if(myValue[currentKey].by.includes(users.uid)){
                
              }
              else{
                var saves=myValue[currentKey].by+"////"+users.uid;
              }
              
              
              var refDir='/cat/'+catname+'/project/'+currentKey+'/';
              
              if(now==end){
                firebase.database().ref(refDir).set({
                  item: "CAT FOOD",
                  total: end,
                  current: now,
                  done: true,
                  by:saves
                });
                $('#pbutton1').attr('disabled', true);

                var um=saves.split('////');
                for(var i = 0 ; i<um.length;i++){
                  if(um[i] != ""){
                    var newKey = firebase.database().ref('/user/'+um[i]+'/notification/').push();              
                    newKey.set({
                      catname: catname,
                      sort: "CAT FOOD"
                    });
                  }
                }
                

              } 
              else{
                firebase.database().ref(refDir).set({
                  item: "CAT FOOD",
                  total: end,
                  current: now,
                  done: false,
                  by:saves
                });
              }
              var userrefDir='/user/'+users.uid+'/funding/';
              firebase.database().ref(userrefDir).set({
                cost:usercost,
                credit:usercredit,
                num:usernum,
                list:userlist
              });

              //var userrefDir2='/user/'+users.uid+'/funding/history/';
              var newKey = firebase.database().ref('/user/'+users.uid+'/history/').push();
              
              newKey.set({
                catname: catname,
                sort: "CAT FOOD"
              });
              
            }
          }
        }
      }
    });
  }
  else{
    
  }
  
}

function clickFunding2(catname) {
  var now1= $('#prog2').attr('value')*1;
  var end1=$('#prog2').attr('max')*1;
  var le=end1-now1;
  if(confirm("Funding 1$ for "+catname+"\'s "+"BLANKET?\n"+le+"$ left for reaching goal.\n"+"now your credit is "+usercredit+"$")){
    usercredit=usercredit-1;
    usercost=usercost+1;
    
    if(userlist.includes(catname)){
    }
    else{
      userlist=userlist+"////"+catname;
      usernum=usernum+1;
      
    }
    alert("Confirmed.\nleft credit:" +usercredit);
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
              var saves=myValue[currentKey].by;
              if(myValue[currentKey].by.includes(users.uid)){
                
              }
              else{
                var saves=myValue[currentKey].by+"////"+users.uid;
              }
              
              
              var refDir='/cat/'+catname+'/project/'+currentKey+'/';
              
              if(now==end){
                firebase.database().ref(refDir).set({
                  item: "BLANKET",
                  total: end,
                  current: now,
                  done: true,
                  by:saves
                });
                $('#pbutton2').attr('disabled', true);

                var um=saves.split('////');
                for(var i = 0 ; i<um.length;i++){
                  if(um[i] != ""){
                    var newKey = firebase.database().ref('/user/'+um[i]+'/notification/').push();              
                    newKey.set({
                      catname: catname,
                      sort: "BLANKET"
                    });
                  }
                }
                

              } 
              else{
                firebase.database().ref(refDir).set({
                  item: "BLANKET",
                  total: end,
                  current: now,
                  done: false,
                  by:saves
                });
              }
              var userrefDir='/user/'+users.uid+'/funding/';
              firebase.database().ref(userrefDir).set({
                cost:usercost,
                credit:usercredit,
                num:usernum,
                list:userlist
              });

              //var userrefDir2='/user/'+users.uid+'/funding/history/';
              var newKey = firebase.database().ref('/user/'+users.uid+'/history/').push();
              
              newKey.set({
                catname: catname,
                sort: "BLANKET"
              });
              
            }
          }
        }
      }
    });
  }
  else{
    
  }
  
}

function clickFunding3(catname) {
  var now1= $('#prog3').attr('value')*1;
  var end1=$('#prog3').attr('max')*1;
  var le=end1-now1;
  if(confirm("Funding 1$ for "+catname+"\'s "+"CAT TOY?\n"+le+"$ left for reaching goal.\n"+"now your credit is "+usercredit+"$")){
    usercredit=usercredit-1;
    usercost=usercost+1;
    
    if(userlist.includes(catname)){
    }
    else{
      userlist=userlist+"////"+catname;
      usernum=usernum+1;
      
    }
    alert("Confirmed.\nleft credit:" +usercredit);
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
              var saves=myValue[currentKey].by;
              if(myValue[currentKey].by.includes(users.uid)){
                
              }
              else{
                var saves=myValue[currentKey].by+"////"+users.uid;
              }
              
              
              var refDir='/cat/'+catname+'/project/'+currentKey+'/';
              
              if(now==end){
                firebase.database().ref(refDir).set({
                  item: "CAT TOY",
                  total: end,
                  current: now,
                  done: true,
                  by:saves
                });
                $('#pbutton3').attr('disabled', true);

                var um=saves.split('////');
                for(var i = 0 ; i<um.length;i++){
                  if(um[i] != ""){
                    var newKey = firebase.database().ref('/user/'+um[i]+'/notification/').push();              
                    newKey.set({
                      catname: catname,
                      sort: "CAT TOY"
                    });
                  }
                }
                

              } 
              else{
                firebase.database().ref(refDir).set({
                  item: "CAT TOY",
                  total: end,
                  current: now,
                  done: false,
                  by:saves
                });
              }
              var userrefDir='/user/'+users.uid+'/funding/';
              firebase.database().ref(userrefDir).set({
                cost:usercost,
                credit:usercredit,
                num:usernum,
                list:userlist
              });

              //var userrefDir2='/user/'+users.uid+'/funding/history/';
              var newKey = firebase.database().ref('/user/'+users.uid+'/history/').push();
              
              newKey.set({
                catname: catname,
                sort: "CAT TOY"
              });
              
            }
          }
        }
      }
    });
  }
  else{
    
  }
  
}

function clickFunding4(catname) {
  var now1= $('#prog4').attr('value')*1;
  var end1=$('#prog4').attr('max')*1;
  var le=end1-now1;
  if(confirm("Funding 1$ for "+catname+"\'s "+"CAT HOUSE?\n"+le+"$ left for reaching goal.\n"+"now your credit is "+usercredit+"$")){
    usercredit=usercredit-1;
    usercost=usercost+1;
    
    if(userlist.includes(catname)){
    }
    else{
      userlist=userlist+"////"+catname;
      usernum=usernum+1;
      
    }
    alert("Confirmed.\nleft credit:" +usercredit);
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
              var saves=myValue[currentKey].by;
              if(myValue[currentKey].by.includes(users.uid)){
                
              }
              else{
                var saves=myValue[currentKey].by+"////"+users.uid;
              }
              
              
              var refDir='/cat/'+catname+'/project/'+currentKey+'/';
              
              if(now==end){
                firebase.database().ref(refDir).set({
                  item: "CAT HOUSE",
                  total: end,
                  current: now,
                  done: true,
                  by:saves
                });
                $('#pbutton4').attr('disabled', true);

                var um=saves.split('////');
                for(var i = 0 ; i<um.length;i++){
                  if(um[i] != ""){
                    var newKey = firebase.database().ref('/user/'+um[i]+'/notification/').push();              
                    newKey.set({
                      catname: catname,
                      sort: "CAT HOUSE"
                    });
                  }
                }
                

              } 
              else{
                firebase.database().ref(refDir).set({
                  item: "CAT HOUSE",
                  total: end,
                  current: now,
                  done: false,
                  by:saves
                });
              }
              var userrefDir='/user/'+users.uid+'/funding/';
              firebase.database().ref(userrefDir).set({
                cost:usercost,
                credit:usercredit,
                num:usernum,
                list:userlist
              });

              //var userrefDir2='/user/'+users.uid+'/funding/history/';
              var newKey = firebase.database().ref('/user/'+users.uid+'/history/').push();
              
              newKey.set({
                catname: catname,
                sort: "CAT HOUSE"
              });
              
            }
          }
        }
      }
    });
  }
  else{
    
  }
  
}

var usercredit;
var usernum;
var usercost;
var userlist;
function readcredit(user) {
  /*
      Read comments from the database
      Print all the comments to the table
  */
  return firebase.database().ref('/user/'+user.uid+'/funding/').once('value',function(snapshot){
    var myValue = snapshot.val();
    if(myValue==null){

    }
    else{
      var keyList = Object.keys(myValue);
      for (var i=0;i<keyList.length;i++){
        console.log(currentKey);
        var currentKey = keyList[i];
        if(currentKey == 'credit'){
          usercredit=myValue[currentKey]*1;
        }
        else if(currentKey == 'cost'){
          usercost=myValue[currentKey]*1;
        }
        else if(currentKey == 'num'){
          usernum=myValue[currentKey]*1;
        }
        else if(currentKey=='list'){
          userlist=myValue[currentKey];
        }

      }
    }
    
  });
}


var catname="";

function namemake(Obj){
  catname=$(Obj).parent().parent().children().children()[1].innerHTML;
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

function find(Obj){
  firebase.database().ref('/find/').remove();
  var newKey = firebase.database().ref('/find/').push();
  var akey= $(Obj).parent().attr("id");
  newKey.set({
    key: akey
  });  
}