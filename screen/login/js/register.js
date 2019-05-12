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
			phoneReg = /^[[0-9][0-9][0-9]{9}$/;
			if($(this).val() == "") {
				$(this).addClass("errorInput");
				$(this).next().css("display", "block").html("Phone number cannot be NULL!");
				return;
			} else if(!phoneReg.test($(this).val())) {
				$(this).addClass("errorInput");
				$(this).next().css("display", "block").html("Please input right phone number!");
			} else {
				$(this).addClass("correctInput");
				$(this).next().empty();
			}
		});
 
		// Ê≥®ÂÜå?ïå?ù¢È™åËØÅ?†Å?†èÂ§±Âéª?Ñ¶?Çπ
		$(".box2 .phonekey").blur(function() {
			
			$(this).next().next().empty();
			$(this).addClass("correctInput");
			
		});
 
		// pass
		$(".box2 .password").blur(function() {
			reg = /^[A-Za-z0-9]{6}$/
			if(reg.test($(this).val())==""){
				$(this).addClass("errorInput");
				$(this).next().css("display", "block").html("Password cannot be NULL,please enter a 6-bit password Ôº?");
			}else if(!reg.test($(this).val())) {
				$(this).addClass("errorInput");
				$(this).next().css("display", "block").html("Please enter a 6-bit password containing numbers or lettersÔº?");
			} else {
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
				$(this).next().html("Confirm password cannot be NULLÔº?");
				$(this).addClass("errorInput");
				return;
			} else if(pwd1 != pwd2) {
				$(this).addClass("errorInput");
				$(this).removeClass("correctInput");
				$(this).next().css("display", "block").html("Inconsistent passwordsÔº?");
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
		writeToDatabase(id,nickname,passwd);
		goLoginafterRegister();	
	}
	
});

function goLoginafterRegister(){
	
	//$(".box2 #phone").val('');
	//$(".box2 .phonekey").val('');
	//$(".box2 .password").val('');
	//$(".box2 .email").val('');

	$(".loginForm").css("display", "block");
	$(".registerForm").css("display", "none");
	$(".login").addClass("colorRed");
	$(".register").removeClass("colorRed");
}