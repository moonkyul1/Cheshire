
$(function() {
    $("#filename").on('change', function(){
        readURL(this);
    });
});
function readURL(input) {
    if (input.files && input.files[0]) {
       var reader = new FileReader();
       reader.onload = function (e) {
          $('#test1').attr('src', e.target.result);
       }
       reader.readAsDataURL(input.files[0]);
    }
}

