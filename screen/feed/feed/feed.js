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
  
  function like(){

  }

  function writeToDatabasewithoutundo(comment){
    var newKey = firebase.database().ref('/pr3/').push();
    var kk =String(newKey.key);
    var ch1= comment.substring(0,comment.indexOf('deleteBase'));
    var ch2=comment.substring(comment.indexOf("deleteLine"),);
    var com2=ch1+"deleteBase(\'"+kk+ "\');" +ch2;
    $("#here").prepend(com2);  
    newKey.set({
      //location of dictionary
      row: com2
    });
  
  }
  
  function makefeed(img,like,name,picture){
    var feedstring="<div class=\"feed\"><div </div>"
  }

  function readFromDatabase() {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/post/').once('value',function(snapshot){
      var myValue = snapshot.val();
      //console.log(myValue)
      var keyList = Object.keys(myValue);
      for (var i=0;i<keyList.length;i++){
        var currentKey = keyList[i];
        //console.log(keyList)
        
        console.log(myValue[currentKey].img);
        console.log(myValue[currentKey].like);
        console.log(myValue[currentKey].name);
        console.log(myValue[currentKey].picture);
        $('#container').prepend()
      }
    });
  }
  
  
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  function fillContent(divObj,content){
    divObj.innerHTML = content
  }
  
  
  function bindEvents(){
    
    btn.onclick = function(){
      if(checkAnswer(answer)){
        if($('#Wrong').prop("checked") == true){
          $('#All').prop('checked', true);
          handle1();
        }
        writeToDatabase('<tr class="cor_tr"> <td class="cor", id="country">' + pairs[a].country + '</td> <td class="cor", id="capital">' +pairs[a].capital + '</td> <td class="cor", id="capital">' +pairs[a].capital +'</td> <td><button id="check" onclick="deleteLine(this);">delete</button></td> </tr>');
      }
      else{
        if($('#Correct').prop("checked") == true){
          $('#All').prop('checked', true);
          handle1();
        }
        writeToDatabase('<tr class="incor_tr"><td class="incor", id="country">'+pairs[a].country+'</td> <td class="incor", id="line">'+answer.value+'</td><td class="incor", id="capital">'+pairs[a].capital+'<td><button id="check" onclick="deleteLine(this);">delete</button></td></tr>');
      }
      var save=answer.value;
      answer.value='';
      answer.focus();
      a = getRandomInt(0,pairs.length-1);
      fillContent(question,pairs[a].country);
      changeIframeUrl(window.pairs[a].country);
    }
  
    $('#pr3__clear').on("click",function(){
      deleteAll();
    });
  
    $('#pr3__undo').on("click",function(){
      undoFun();
    });
  
    $('#pr3__reset').on("click",function(){
      resetFun();
    });
  
    answer.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        btn.click();
        $('#pr2__answer').autocomplete('close');
      }
    });
  
    $('#here').on("mouseover","#country",function(){
      //map change
      var counter = 0;
      var a = $(this);
      setTimeout(function () {
            ++counter;
            if(counter >= 1){
              changeIframeUrl(a.text());
              changeIframeBorder("border:1px black solid");
            }
      }, 1000);
    }).on("mouseout","#country",function(){
      var a = $('#pr2__question').text();
      //console.log(a);
      changeIframeUrl(a);
      changeIframeBorder("border:0");
    });
    
    $('#here').on("mouseover","#capital",function(){
      //map change
      var counter = 0;
      var a = $(this);
      setTimeout(function () {
            ++counter;
            if(counter >= 1){
              changeIframeUrlWithZoom(a.text(),5);
              changeIframeBorder("border:1px black solid");
            }
      }, 1000);
    }).on("mouseout","#capital",function(){
      var a = $('#pr2__question').text();
      //console.log(a);
      changeIframeUrl(a);
      changeIframeBorder("border:0");
    });
    
  
  
  
  }
  
  function handle1(){
    $('tr.cor_tr').show();
    $('tr.incor_tr').show();
  }
  
  function handle2(){
    $('tr.cor_tr').show();
    $('tr.incor_tr').hide();
  }
  function handle3(){
    $('tr.cor_tr').hide();
    $('tr.incor_tr').show();
  }
  
  var pairs;
  
  $( document ).ready(function() {
  
    $.get("https://s3.ap-northeast-2.amazonaws.com/ec2-54-144-69-91.compute-1.amazonaws.com/country_capital_pairs_2019.csv",function(data){
      var colOb=[]
      var m0;
      m0=data;
      var m1 = m0.split('\r\n');
      for(var l = 1; l<m1.length ; l++){
        colOb.push({country:m1[l].split(',')[0], capital:m1[l].split(',')[1]});
      }
      pairs = colOb;
  
      a = getRandomInt(0,window.pairs.length-1);
      fillContent(question,window.pairs[a].country);
      changeIframeUrl(window.pairs[a].country);
      answer.focus();
      $('#pr3__clear').attr('disabled', true);
      $('#pr3__undo').attr('disabled', true);
      bindEvents();
      readFromDatabase();
      readFromUndoBase();
      var capList = []
      for(var i = 0; i<window.pairs.length ; i++){
        capList.push(window.pairs[i].capital);
      }
    
      $("#pr2__answer").autocomplete({
        source:capList,
        minLength:1,
        select:function(event,ui){
          event.preventDefault();
          if (event.keyCode != 13) {
            btn.click();
          }
        }
      });
  
  
    });
  
    
  
    
  });
  