var config = {
    apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
    authDomain: "cs374-2e397.firebaseapp.com",
    databaseURL: "https://cs374-2e397.firebaseio.com",
    projectId: "cs374-2e397",
    storageBucket: "",
    messagingSenderId: "558070618198"
};

firebase.initializeApp(config);

var catName = "";


$(function() {

    $(".image-upload").on('click', function(){
        $("#footer").show();
        // location.href='./selectImage/selectImage.html';
    });

    $(".cat-box").on('click', function(){
        catName = this.id;
        $("#footer").hide();
        $('#test1').attr('src', "../../../image/picture/"+catName+".png");
        $( "#nextbtn" ).prop( "disabled", false );
    });
    // $("#filename").on('change', function(){
    //     console.log($("#filename").val());
    //     readURL(this);
    // });
});
// function readURL(input) {
//     if (input.files && input.files[0]) {
//        var reader = new FileReader();
//        reader.onload = function (e) {
//           $('#test1').attr('src', e.target.result);
//        }
//        reader.readAsDataURL(input.files[0]);
//     }
// }
var homelist=[];
function locac(Obj){
    var a=$('#homename').val();
    if(homelist.indexOf($(Obj).text())==-1){
        homelist.push($(Obj).text());
        if(homelist.length==1){
            $('#homename').val(homelist[0]);
        }
        else if(homelist.length==2){
            $('#homename').val(homelist[0]+", "+homelist[1]);
        }
        else if(homelist.length==3){
            $('#homename').val(homelist[0]+", "+homelist[1]+", "+homelist[2]);
        }       
    }
    else{
        var rn=homelist.indexOf($(Obj).text());
        homelist.splice(rn,1);
        if(homelist.length==0){
            $('#homename').val('');
        }
        else if(homelist.length==1){
            $('#homename').val(homelist[0]);
        }
        else if(homelist.length==2){
            $('#homename').val(homelist[0]+", "+homelist[1]);
        }
        //$('#homename').val();
    }
    
}

var catlist=[];
function readcatname() {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/cat/').once('value',function(snapshot){
      var myValue = snapshot.val();
      var keyList = Object.keys(myValue);
      for (var i=0;i<keyList.length;i++){
        var currentKey = keyList[i];
        catlist.push(currentKey);
      }
    });
}

  readcatname();

  $("#catname").autocomplete({
    source:catlist,
    minLength:1,
    select:function(event,ui){
      event.preventDefault();
      if(event.type=='click'){
          console.log("!@#");
        document.getElementById('catname').value = ui.item.value;
      }
      
    }
  });