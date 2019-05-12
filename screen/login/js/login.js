

//
// $(function() {
// 	//  create_code
// 	(function create_code() {
// 		function shuffle() {
// 			var code = ['1', '2', '3', '4', 'S', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', '0', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// 			return code.sort(function() {
// 				return(Math.random() - .5);
// 			});
// 		};
// 		shuffle();
//
// 		function showAuthCode() {
// 			var co = '';
// 			var code = shuffle();
// 			for(var i = 0; i < 6; i++) {
// 				co += code[i];
// 			};
// 			$(".box1 .authCode").text(co);
// 		};
// 		showAuthCode();
// 		$(".box1 .authCode").click(function() {
// 			showAuthCode();
// 		});
// 	})();
//
//
//
//
// 	(function login_validate() {
// 		$(".box1 .account").blur(function() {
// 			/*judge account number*/
// 			account_validate = /^[[0-9][0-9][0-9]{9}$/;
// 			if($(this).val() == "" || $(this).val() == "Please input account(phone number)!") {
// 				$(this).addClass("errorInput");
// 				$(this).next().css("display", "block").html("Account cannot be NULL!");
// 				/*console.log("Account cannot be NULL!");*/
// 				return;
// 			} else if(!account_validate.test($(".box1 .account").val())) {
// 				$(this).addClass("errorInput");
// 				$(this).next().css("display", "block").html("Account does't exit!");
// 			} else {
// 				$(this).addClass("correctInput");
// 				$(this).removeClass("errorInput");
// 				$(this).next().empty();
// 			}
// 		});
//
//
// 		//
// 		$(".box1 .password").blur(function() {
// 			reg = /^[A-Za-z0-9]{6}$/
// 			if($(this).val() == "") {
// 				$(this).addClass("errorInput");
// 				$(this).next().css("display", "block").html("Password cannot be NULL��?");
// 			} else if(!reg.test($(".password").val())) {
// 				$(this).addClass("errorInput");
// 				$(this).next().css("display", "block").html("\n" +
// 					"Please enter a 6-bit password containing numbers or letters��?");
// 			} else {
// 				$(this).addClass("correctInput");
// 				$(this).removeClass("errorInput");
// 				$(this).next().empty();
// 			}
// 		});
//
// 		// 验证?��输入框失?��?��?��
// 		$(".box1 .photokey").blur(function() {
// 			var code1 = $('.box1 .photokey').val().toLowerCase();
// 			var code2 = $(".box1 .authCode").text().toLowerCase();
// 			if($('.box1 .photokey').val() == "") {
// 				$('.box1 .photokey').addClass("errorInput");
// 				$(this).next().next().html("Verification code cannot be NULL��?");
// 				return;
// 			} else if(code1 != code2) {
// 				$(this).addClass("errorInput");
// 				$(this).next().next().css("display", "block").html("Verification code is wrong��?");
// 			} else {
// 				$(this).removeClass("errorInput");
// 				$(this).next().next().empty();
// 				$(this).addClass("correctInput");
// 			}
// 		})
// 	})();
// })



function readFromDatabase() {
    /*
       Read comments from the database
       Print all the comments to the table
    */
    return firebase.database().ref('/user/').once('value',function(snapshot){
      var myValue = snapshot.val();
	  var keyList = Object.keys(myValue);

	  var id=$(".box1 .account").val();
	  var passwd=$(".box1 .password").val();
	  var check=0;

		firebase.auth().signInWithEmailAndPassword(id, passwd).then(function(user) {
			alert("login");
			location.href='../feed/feed/feed.html';
	 	}).catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;

			console.log(errorCode);

			if(errorCode == "auth/wrong-password"){
				document.getElementById("account").classList.remove("errorInput");
				document.getElementById("accountError").innerHTML = "";
				document.getElementById("password").classList.add("errorInput");
				document.getElementById("passwordError").innerHTML = errorMessage;
			}
			else{
				document.getElementById("password").classList.remove("errorInput");
				document.getElementById("passwordError").innerHTML = "";
				document.getElementById("account").classList.add("errorInput");
				document.getElementById("accountError").innerHTML = errorMessage;
			}

	 	});
	  });
  }
