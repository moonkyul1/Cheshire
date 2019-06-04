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
    
  con=Obj;
  var lnum=$(Obj).parent().children("div");
  var lnumber=lnum.text().slice(0,-7)*1;
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
  lnumber=lnumber+1;
  lnum.text(lnumber+" people");
  
      //del
  }
  else{
      img1=img1.replace('_selected.png','.png');
      $(Obj).attr("src",img1)
      firebase.database().ref('/user/' +user.uid+'/like/'+akey+'/').remove();
      var index=likelist.indexOf(akey);
      likelist.splice(index,1);
      //push
      lnumber=lnumber-1;
      lnum.text(lnumber+" people");
  }

  firebase.database().ref("/post/"+akey+"/").update({ likes: lnumber });
}
 
function makefeed(img,name,picture,altkey,like,archieve,likenum){
var feedstring="<div class=\"feed\">\
<div class=header>\
<div class=\"content\" id=cat"+name+" ><img class=\"img\" src="+img+" onclick=\"find(this); location.href=\'../../profile/cat/catprofile.html\';\"></div>\
<div class=\"name\">"+name+"</div>\
<div class=\"content\" id="+altkey+" ><img class=\"archive\" src=../../../image/icon/"+archieve+" onclick=\"picarchive(this);\"></div>\
</div>\
<div class=\"content\" id="+altkey+"><img id=\"contentid\" src="+picture+" onclick=\"save(this); location.href=\'../post/post.html\';\"></div>\
<div class=\"accessory\" id="+altkey+">\
<img id=\"comment\" src=../../../image/icon/message.png>\
<img id=\"like\" src=../../../image/icon/"+like+" onclick=\"like(this);\">\
<div id=\"likenum\">"+likenum+" people</div>\
<img id=\"feedgift\" src=../../../image/icon/cf.png onclick=\"modalTestFn();namemake(this);readfunding(catname);\">\
</div>\
</div>";
return feedstring;
}

  function readFromDatabase(){
    if(tab == 1){
      readFromDatabase1();
    }
    else if(tab==2){
      readFromDatabase2();
    }
    else if(tab==3){
      readFromDatabase3();
    }
    else{
      readFromDatabase1();
    }
  }

  function readFromDatabase1() {
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
        if(myValue[currentKey].name.toUpperCase() == inputValue.toUpperCase()){
          var likenumber=0
          if(myValue[currentKey].likes != undefined){
            likenumber=myValue[currentKey].likes;
          }
  
          if(likelist.indexOf(currentKey) != -1){
            if(archivelist.indexOf(currentKey)!= -1){
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart_selected.png","bookmark_selected.png", likenumber));
            }
            else{
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart_selected.png","bookmark.png", likenumber));
            }
            
          }
          else{
            if(archivelist.indexOf(currentKey)!= -1){
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart.png","bookmark_selected.png", likenumber));
            }
            else{
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart.png","bookmark.png", likenumber));
            }
          }
        }
      }
    });
  }

  function readFromDatabase2() {
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
        if(myValue[currentKey].place.toUpperCase().indexOf(inputValue.toUpperCase()) != -1){
          var likenumber=0
          if(myValue[currentKey].likes != undefined){
            likenumber=myValue[currentKey].likes;
          }
  
          if(likelist.indexOf(currentKey) != -1){
            if(archivelist.indexOf(currentKey)!= -1){
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart_selected.png","bookmark_selected.png", likenumber));
            }
            else{
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart_selected.png","bookmark.png", likenumber));
            }
            
          }
          else{
            if(archivelist.indexOf(currentKey)!= -1){
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart.png","bookmark_selected.png", likenumber));
            }
            else{
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart.png","bookmark.png", likenumber));
            }
          }
        }
      }
    });
  }

  function readFromDatabase3() {
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
        if(myValue[currentKey].tag.toUpperCase().indexOf(inputValue.toUpperCase()) != -1){
          var likenumber=0
          if(myValue[currentKey].likes != undefined){
            likenumber=myValue[currentKey].likes;
          }
  
          if(likelist.indexOf(currentKey) != -1){
            if(archivelist.indexOf(currentKey)!= -1){
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart_selected.png","bookmark_selected.png", likenumber));
            }
            else{
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart_selected.png","bookmark.png", likenumber));
            }
            
          }
          else{
            if(archivelist.indexOf(currentKey)!= -1){
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart.png","bookmark_selected.png", likenumber));
            }
            else{
              $('#container').append(makefeed(myValue[currentKey].img, myValue[currentKey].name, myValue[currentKey].picture,currentKey,"heart.png","bookmark.png", likenumber));
            }
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

  var archivelist=[]
  function readFromArchive(user,archivelist) {
    /*
      Read comments from the database
      Print all the comments to the table
    */
    return firebase.database().ref('/user/'+user.uid+'/archieve/').once('value',function(snapshot){
      var myValue = snapshot.val();
      if(myValue == null){

      }
      else{
        var keyList = Object.keys(myValue);
        for (var i=0;i<keyList.length;i++){
          var currentKey = keyList[i];
          archivelist.push(currentKey);
        }
      }
      
    });
  }


  function picarchive(Obj){
    var img1=$(Obj).attr("src")
    con=img1;
    var akey= $(Obj).parent().attr("id");
    var user = firebase.auth().currentUser;
    if(img1.indexOf('_selected')==-1){
        alertTestFn();
        img1=img1.replace('.png','_selected.png');
        $(Obj).attr("src",img1);
        
        var akey= $(Obj).parent().attr("id");
        //console.log(user.uid);
        var newKey = firebase.database().ref('/user/'+user.uid+'/archieve/'+akey+"/").push();
        newKey.set({
          postnum: akey
        });
        //del
    }
    else{
        console.log(akey)
        img1=img1.replace('_selected.png','.png');
        $(Obj).attr("src",img1)
        firebase.database().ref('/user/' +user.uid+'/archieve/'+akey+'/').remove();
        //push
    }
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
    readFromArchive(user,archivelist)
    readFromLike(user,likelist)
  } else {
    alert("no sing");
    // No user is signed in.
  }
});


function alertTestFn(){
  $('#to1').css("display","block")
  $('.toast').toast({delay: 700});
  $('.toast').toast('show');
  setTimeout("toast11()",1000)
}

function toast11(){
  $('#to1').css("display","none")
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
  if(usercredit <= 0){
    alert("now your credit is 0$!\n please charge for donation");
    return;
  }
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
              if(myValue[currentKey].by==undefined){
                myValue[currentKey].by='';
              }
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
                      sort: "CAT FOOD",
                      date:todaydate
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
                sort: "CAT FOOD",
                date:todaydate
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
  if(usercredit <= 0){
    alert("now your credit is 0$!\n please charge for donation");
    return;
  }
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
              if(myValue[currentKey].by==undefined){
                myValue[currentKey].by='';
              }
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
                      sort: "BLANKET",
                      date:todaydate
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
                sort: "BLANKET",
                date:todaydate
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
  if(usercredit <= 0){
    alert("now your credit is 0$!\n please charge for donation");
    return;
  }
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
              if(myValue[currentKey].by==undefined){
                myValue[currentKey].by='';
              }
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
                      sort: "CAT TOY",
                      date:todaydate
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
                sort: "CAT TOY",
                date:todaydate
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
  if(usercredit <= 0){
    alert("now your credit is 0$!\n please charge for donation");
    return;
  }
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
              if(myValue[currentKey].by==undefined){
                myValue[currentKey].by='';
              }
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
                      sort: "CAT HOUSE",
                      date:todaydate
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
                sort: "CAT HOUSE",
                date:todaydate
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
  $("#col1").css("visibility","hidden");
  $("#col2").css("visibility","hidden");
  $("#col3").css("visibility","hidden");
  $("#col4").css("visibility","hidden");
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
            if(current!=total){
              $("#col1").css("visibility","visible")
            }
            $('#prog1').attr('value',current);
            $('#prog1').attr('max',total);
            $('#cost1').text('$'+total);
            $('#pbutton1').attr('disabled', false);
          }
          else if(myValue[currentKey].item=="BLANKET"){
            //console.log("2");
            if(current!=total){
              $("#col2").css("visibility","visible")
            }
            $('#prog2').attr('value',current);
            $('#prog2').attr('max',total);
            $('#cost2').text('$'+total);
            $('#pbutton2').attr('disabled', false);
          }
          else if(myValue[currentKey].item=="CAT TOY"){
            //console.log("3");
            if(current!=total){
              $("#col3").css("visibility","visible")
            }
            $('#prog3').attr('value',current);
            $('#prog3').attr('max',total);
            $('#cost3').text('$'+total);
            $('#pbutton3').attr('disabled', false);
          }
          else if(myValue[currentKey].item=="CAT HOUSE"){
            //console.log("4");
            if(current!=total){
              $("#col4").css("visibility","visible")
            }
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

function datefind(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}
var todaydate=datefind();


var tab=1;
$('#tabnames').css('border-bottom', 'solid');
$('#tabnames').on('click',function(){
  tab=1
  $('#tabnames').css('border-bottom', 'solid');
  $('#tabplace').css('border-bottom', 0);
  $('#tabtag').css('border-bottom', 0);
});

$('#tabplace').on('click',function(){
  tab=2
  $('#tabnames').css('border-bottom', 0);
  $('#tabplace').css('border-bottom', 'solid');
  $('#tabtag').css('border-bottom', 0);
});

$('#tabtag').on('click',function(){
  tab=3
  $('#tabnames').css('border-bottom', 0);
  $('#tabplace').css('border-bottom', 0);
  $('#tabtag').css('border-bottom', 'solid');
});

if(sessionStorage.getItem('second') == null || sessionStorage.getItem('second') == "null" || sessionStorage.getItem('second') == undefined){

}
else{
  $('#searchInput').val(sessionStorage.getItem('second'));
  $('#tabtag').trigger('click');
  $('#searchBtn').trigger('click');
  sessionStorage.setItem('second',null);
}