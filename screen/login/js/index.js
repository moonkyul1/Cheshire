

// ??ą?»ćœ?
function goLogin() {
	$(".loginForm").css("display", "block");
	$(".registerForm").css("display", "none");
	$(".login").addClass("colorRed");
	$(".register").removeClass("colorRed");
}
// ??ąæłšć

function goRegister() {
	$(".registerForm").css("display", "block");
	$(".loginForm").css("display", "none");
	$(".register").addClass("colorRed");
	$(".login").removeClass("colorRed");
}
