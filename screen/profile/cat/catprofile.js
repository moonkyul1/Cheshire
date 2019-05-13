// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

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
  
  var mykey;

  function readFromSave(){
    return firebase.database().ref('/save/').once('value',function(snapshot){
        var myValue = snapshot.val();
        var keyList = Object.keys(myValue);
        var currentKey = keyList[0];
        mykey=(myValue[currentKey].key);
      });
  }

    function feedmake(imgsrc){

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
            
          }
          
        }
      });
    }

    
//readFromSave();
//readFromDatabase();

function JbFunc1() {
  var a = document.getElementById( 'prog1' ).value;
  document.getElementById( 'prog1' ).value = a*1 + 10;
}
function JbFunc2() {
  var a = document.getElementById( 'prog2' ).value;
  document.getElementById( 'prog2' ).value = a*1 + 10;
}
function JbFunc3() {
  var a = document.getElementById( 'prog3' ).value;
  document.getElementById( 'prog3' ).value = a*1 + 10;
}