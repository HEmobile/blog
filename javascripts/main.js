$(function(){
  var container = $("#tags-list > .container");

  // reorder tag list
  if (container[0]) {

    var
      last_tag = "",
      tags_hash = {},
      to_render = [],
      hash_keys = [];

    container.children().each(function() {

      if (this.className == "tag-anchor") {
        last_tag = this.id;
        tags_hash[last_tag] = {
          childs: [],
          header: this.outerHTML
        }
      } else {
        tags_hash[last_tag].childs.push(this.outerHTML);
      }

    });

    for (key in tags_hash) {
      hash_keys.push(key);
    }
    hash_keys.sort();

    for (var i = 0; i < hash_keys.length; i++) {
      to_render.push(tags_hash[hash_keys[i]].header);
      to_render.push(tags_hash[hash_keys[i]].childs.join(''));
    }

    container.html(to_render.join(''));
  }

  // urlify author names
  $('.author-link').each(function (i) {
    var
      slug = URLify($(this).text().split(" ").slice(0, 2).join(" ")),
      url = 'http://helabs.com.br/nosso-time/' + slug + '/'
    ;
    $(this).attr('href', url);
  });

});
