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

