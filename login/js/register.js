$(function() {
	(function register() {
		//a ccount
		$(".box2 #phone").blur(function() {
			phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
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
 
		// 注册界面验证码栏失去焦点
		$(".box2 .phonekey").blur(function() {
			reg = /^[A-Za-z0-9]{6}$/;
			if($(this).val() == "") {
				$(this).addClass("errorInput");
				$(this).next().next().css("display", "block").html("Verification code cannot be NULL！");
				return;
			} else if(!reg.test($(this).val())) {
				$(this).addClass("errorInput");
				$(this).next().next().css("display", "block").html("Verification code is wrong,input 6 character！");
			} else {
				$(this).next().next().empty();
				$(this).addClass("correctInput");
			}
		});
 
		// pass
		$(".box2 .password").blur(function() {
			reg = /^[A-Za-z0-9]{6}$/
			if(reg.test($(this).val())==""){
				$(this).addClass("errorInput");
				$(this).next().css("display", "block").html("Password cannot be NULL,please enter a 6-bit password ！");
			}else if(!reg.test($(this).val())) {
				$(this).addClass("errorInput");
				$(this).next().css("display", "block").html("Please enter a 6-bit password containing numbers or letters！");
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
				$(this).next().html("Confirm password cannot be NULL！");
				$(this).addClass("errorInput");
				return;
			} else if(pwd1 != pwd2) {
				$(this).addClass("errorInput");
				$(this).removeClass("correctInput");
				$(this).next().css("display", "block").html("Inconsistent passwords！");
			} else {
				$(this).removeClass("errorInput");
				$(this).addClass("correctInput");
				$(this).next().empty();
			}
		});
	})();
});