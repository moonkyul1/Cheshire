function alertTestFn(){
  $('.toast').toast({delay: 700});
  $('.toast').toast('show');
}

function modalTestFn(){
  $("#myModal").modal();
}

function simpleLightbox(imageUrl){
  window.open('', 'simpleLightbox').document.write('<html><head><meta name="viewport" content="user-scalable=yes, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0, width=device-width" /></head><body bgcolor = "#000000" style="margin:0;  height:100%;" onclick="javascript:window.close(\'simpleLightbox\');"><table border="0" width="100%" height="100%"><tr><td valign="middle" align="center"><img style="position:relative;z-index:2;width:100%; object-fit: cover;" src="'+imageUrl+'"/></td></tr></table></body></html>');
}


function check(Obj){
  console.log("helo");
  simpleLightbox($(Obj).attr('src'),'#FFF','300px');
}