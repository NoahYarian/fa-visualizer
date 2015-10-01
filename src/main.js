console.log('main.js is loaded');

var size = 150;

$(function() {
  console.log('jQuery and the document are loaded');

  makeElements(size);
  changeAllIcons();
});


$(window).resize(function() {
  console.log($(document).width(), $(document).height());
});

$(document).click(changeSomeIcons);

function getRandIcon() {
  var str = '&#xf';
  var hexNoF = '0123456789ABCDE'.split('');
  str += Math.round(Math.random());
  str += hexNoF[Math.floor(Math.random() * 8)];
  str += hexNoF[Math.floor(Math.random() * 15)];
  str += ';';
  return str;
}

function changeSomeIcons() {
  $('.icon').each(function() {
    if (Math.round(Math.random() * .75)) {
      changeIcon(this);
    }
  });
}

function changeAllIcons() {
  $('.icon').each(function() {
      changeIcon(this);
  });
}

function changeIcon(element) {
  var colors = getColors();
      $(element)
        .css('background', colors[0])
        .css('border', '10px solid ' + colors[1])
        .children('i')
          .html(getRandIcon())
          .css('color', colors[2]);
}

function getColors() {
  var colors = tinycolor(randomColor({luminosity: 'light'})).tetrad()
  return colors.map(function(t) {
    return t.toHexString();
  });
}

function getColorPair(hue) {
  var colors = [
    randomColor({luminosity: 'bright', hue: hue}),
    randomColor({luminosity: 'bright', hue: hue})
  ];
  var readability = tinycolor.readability(colors[0], colors[1]);
  if (readability < 2) {
    console.log(readability);
    console.log('getting another set of colors');
    return getColorPair();
  }
  return colors;
}

function makeElements(size) {
  var width = $(document).width();
  var height = $(document).height();
  var num = Math.floor(width/(size+30)) * Math.floor(height/(size+30)); // cool.

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

function getRandomHue() {
  var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'];
  var randInt = Math.floor(Math.random() * 7);
  var hue = colors[randInt];
  console.log(hue)
  return hue;
}
