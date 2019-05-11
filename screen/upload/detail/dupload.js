var tagname= document.getElementById("tagname");

tagname.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $('#tags').append(tagmake(tagname.value,170+tagname.value.length*13));
      
      tagname.value='';
      
    }
  });

function tagmake(tag,width){
var tagstring="\
<div id=\"taga\" style=\"width:"+width+";\">\
<img id=\"tag1\" src=../../../image/icon/tag_small.png>\
<div id=\"tag2\">"+tag+"</div>\
<img id=\"tag3\" src=../../../image/icon/x_small.png onclick=deleteLine(this);>\
</div>\
";
return tagstring;
}

function deleteLine(Obj){
    var tr= $(Obj).parent();
    tr.remove();
  }