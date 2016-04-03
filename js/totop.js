$(window).scroll(function() {
    $(window).scrollTop() > 500 ? $("#rocket").addClass("show") : $("#rocket").removeClass("show");
});
$("#rocket").click(function() {
    $("#rocket").addClass("launch");
    $("html, body").animate({
        scrollTop: 0
    }, 500, function() {
        $("#rocket").removeClass("show launch");
    });
    return false;
});

jQuery(document).ready(function($) {
 
    $(".scroll").click(function(event){     
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });
});

function generateToc (rootNode, startLevel) {
  var lastLevel = 0;
  startLevel = startLevel || 2; //which H# tag to start indexing.
  var html='<ul>';

  for (var i = 0; i < rootNode.childNodes.length; ++i) {
    var node = rootNode.childNodes[i];

        //skip nodes that aren't <H#> tags
    if (!node.tagName || !/H[0-9]/.test(node.tagName)) { continue; }

    var level = +node.tagName.substr(1);
    if (level < startLevel) { continue; }

    var name = node.innerText;
    if (node.children.length) { name = node.childNodes[0].innerText; }

    //skip this node if there is no name
    if (!name) { continue; }

    var hashable = name.replace(/[\.\s]/g, "-");
    node.id = hashable;

    if (level > lastLevel) {
        html += "";
    } else if (level < lastLevel) {
        html += (new Array(lastLevel - level + 2)).join("</ol></li>");
    } else {
        html += "</ol></li>";
    }

    html += "<li class='post-list-item'><i class='fa fa-paperclip'></i><a class='scroll lvl"+level+"' href='#" + hashable + "'>　" + name + "</a><ol>";
    lastLevel = level;
  }
  html += '</ul>'
  return html;
}


// TOC
;(function($) {
    if ($('.toc')) {
        var root = $('.post-content')[0];
        console.log(root);
        $('.toc').html(generateToc(root));
    }
})(jQuery);