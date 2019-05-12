var config = {
    apiKey: "AIzaSyAqBEOGJ6QCmFO7ff6sP0pVmpJoWgYnl1U",
    authDomain: "cs374-2e397.firebaseapp.com",
    databaseURL: "https://cs374-2e397.firebaseio.com",
    projectId: "cs374-2e397",
    storageBucket: "",
    messagingSenderId: "558070618198"
};

firebase.initializeApp(config);

$(function() {
	(function register() {
		//a ccount
		$(".box2 #phone").blur(function() {
			if($(this).val() == "") {
				$(this).addClass("errorInput");
				$(this).next().css("display", "block").html("Email ID  cannot be NULL!");
				return;
			}else {
				$(this).addClass("correctInput");
				$(this).next().empty();
			}
		});

		// 注册?��?��验证?��?��失去?��?��
		$(".box2 .phonekey").blur(function() {

			$(this).next().next().empty();
			$(this).addClass("correctInput");

		});

		// pass
		$(".box2 .password").blur(function() {

			if($(this).val()==""){
				$(this).addClass("errorInput");
				$(this).next().css("display", "block").html("Password cannot be NULL,please enter an at least 6-digit password");
			}else {
				$(this).removeClass("errorInput");
				$(this).next().empty();
				$(this).addClass("correctInput");
			}
		});


		// confirm
		$(".box2 .email").blur(function() {
			var pwd1 = $('.box2 .password').val();
			var pwd2 = $(this).val();
			if(pwd1 == "") {
				$(this).removeClass("errorInput");
				$(this).next().html("Confirm password cannot be NULL");
				$(this).addClass("errorInput");
				return;
			} else if(pwd1 != pwd2) {
				$(this).addClass("errorInput");
				$(this).removeClass("correctInput");
				$(this).next().css("display", "block").html("Inconsistent passwords");
			} else {
				$(this).removeClass("errorInput");
				$(this).addClass("correctInput");
				$(this).next().empty();
			}
		});
	})();
});


function writeToDatabase(id,nickname,passwd){
	var newKey = firebase.database().ref('/user/').push();
	newKey.set({
	  //location of dictionary
	  id: id,
	  nickname: nickname,
	  passwd: passwd
	});
  }



$('#finalSubmit').bind("click",function(){

	var id=$(".box2 #phone").val();
	var nickname=$(".box2 .phonekey").val();
	var passwd= $(".box2 .password").val();
	var confirm=$(".box2 .email").val();
	if(id=="" || nickname=="" || passwd=="" || passwd!=confirm){
	}
	else{
		firebase.auth().createUserWithEmailAndPassword(id, passwd).then(function(user) {
			var user = firebase.auth().currentUser;
			//console.log(user.uid)
			var db = firebase.database().ref('/user/').child(user.uid);
			db.set({
			   nickname:nickname,
			}).then(function(){
				alert("register complete!");
				location.href='./login.html';
			});
			//
			//
		}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			document.getElementById("checkerror").innerHTML = errorMessage;
		 });



	}
});
