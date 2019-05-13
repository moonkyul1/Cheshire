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






firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //var imglist=[];
      readFromfunding(user)
    } else {
      alert("no sing");
      // No user is signed in.
    }
  });
  

  function accessn(){
      alert("will update soon :)");
  }