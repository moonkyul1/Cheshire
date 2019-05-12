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
<span class=\"badge badge-pill badge-secondary tag\"\
<span id=\"taga\">\
<img id=\"tag1\" src=../../../image/icon/tag_small.png>\
<div id=\"tag2\">"+tag+"</div>\
<img id=\"tag3\" src=../../../image/icon/x_small.png onclick=deleteLine(this);>\
</span>\
</span>\
";
return tagstring;
}

function deleteLine(Obj){
    var tr= $(Obj).parent();
    tr.remove();
  }
