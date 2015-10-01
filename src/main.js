console.log('main.js is loaded');

var size = 150;

$(function() {
  console.log('jQuery and the document are loaded');

  makeElements(size);
});


$(window).resize(function() {
  console.log($(document).width(), $(document).height());
});

$(document).click(changeIcons);

function getRandIcon() {
  var str = '&#xf';
  var hexNoF = '0123456789ABCDE'.split('');
  str += Math.round(Math.random());
  str += hexNoF[Math.floor(Math.random() * 8)];
  str += hexNoF[Math.floor(Math.random() * 15)];
  str += ';';
  return str;
}

function changeIcons() {
  $('.icon').each(function() {
    if (Math.round(Math.random() * .75)) {
      $(this)
        .css('background', randomColor({luminosity: 'bright'}))
        .children('i')
          .html(getRandIcon())
          .css('color', randomColor({luminosity: 'bright'}));
    }
  });

}

function makeElements(size) {
  var width = $(document).width();
  var height = $(document).height();
  var num = Math.floor(width/(size+12)) * Math.floor(height/(size+12)); // cool.

  var iconDiv;
  var icon;
  for (var i = 0; i < num; i++) {
    iconDiv = document.createElement('div');
    $(iconDiv).addClass('icon');
    icon = document.createElement('i');
    $(icon).addClass('fa fa-big');
    $(iconDiv).append(icon);
    $('.container').append(iconDiv);
  }
}
