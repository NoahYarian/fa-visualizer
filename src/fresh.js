///////////////////////////////////////////////////
// I would like to make squares dance to music. //
/////////////////////////////////////////////////

// What is my MVP for these dancing squares?
// - appear centered in the window
// - work in a few different window sizes
// - be colorful
// - change visually according to beat information
// - change without lagging noticeably

///// notes
// https://en.wikipedia.org/wiki/Highly_composite_number
// Largely composite numbers - http://oeis.org/A067128/internal
// write a function that finds the container sizes that allow for the highest number of square sizes
// 1440x900 = [10,12,15,18,20,30,36,45,60,90,180];
// 1440x720 = [10,12,15,16,18,20,24,30,36,40,45,48,60,72,80,90,120,144,180,240,360,720];
// 1260x720 = [10,12,15,18,20,30,36,45,60,90,180];
// 720x480 = [10,12,15,16,20,24,30,40,48,60,80,120,240];


// listeners
$(function() {
  console.log('jQuery and the document are loaded');
  setContainerSize();
  drawSquares();
});

$(window).resize(function() {
  setContainerSize();
  drawSquares();
});

$('#btn').click(drawSquares);

$('#btn2').click(freshen);

///////////////

function setContainerSize() {
  var width = $(window).width();
  var height = $(window).height();
  var w = 720;
  var h = 480;

  if (width >= 1440 && height >= 900) {
    w = 1440;
    h = 900;
  } else if (width >= 1440 && height >= 720) {
    w = 1440;
    h = 720;
  } else if (width >= 1260 && height >= 720) {
    w = 1260;
    h = 720;
  }
  $('.squares').css({width: w, height: h});
}

function getRandSquare() {
  var w = $('.squares').width() + 'x' + $('.squares').height();

  if (w === '1440x900') {
    // return pickOne([10,12,15,18,20,30,36,45,60,90,180]);
    return pickOne([20,30,36,45,60,90,180]);
  } else if (w === '1440x720') {
    // return pickOne([10,12,15,16,18,20,24,30,36,40,45,48,60,72,80,90,120,144,180,240,360,720]);
    return pickOne([20,24,30,36,40,45,48,60,72,80,90,120,144,180,240,360,720]);
  } else if (w === '1260x720') {
    // return pickOne([10,12,15,18,20,30,36,45,60,90,180]);
    return pickOne([20,30,36,45,60,90,180]);
  } else {
    // return pickOne([10,12,15,16,20,24,30,40,48,60,80,120,240]);
    return pickOne([20,24,30,40,48,60,80,120,240]);
  }

}

function drawSquares() {
  var square = getRandSquare();
  var w = $('.squares').width();
  var h = $('.squares').height();
  var cols = w / square;
  var rows = h / square;
  console.log('square: ' + square, 'width: ' + w, 'height: ' + h);
  console.log('cols: ' + cols, 'rows: ' + rows);
  var num = cols * rows;
  var squaresArr = [];

  for (var i = 0; i < num; i++) {
    squaresArr.push(makeSquare(square));
  }

  $('.squares').empty().append(squaresArr);
}

function makeSquare(square) {
  var border = new Border();
  var squareDiv = document.createElement('div');
  $(squareDiv)
    .addClass('square')
    .css({
      'height': square,
      'width': square,
      'background': randomColor({luminosity: 'bright'}),
      'border-style': border.styles.join(' '),
      'border-color': border.colors.join(' '),
      'border-width': square / 10
    });
  return squareDiv;
}

function Border() {
  var styles = ['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
  this.styles = [];
  this.colors = randomColor({count: 4, luminosity: 'bright'});
  for (var i = 0; i < 4; i++) {
    this.styles.push(styles[Math.floor(Math.random() * 9)]);
  }
}

function freshen() {
  if (Math.round(Math.random())) {
    var rot = $('.square').data('rotate') || 0;
    console.log(rot);
    rot += rand(-360,360);
    console.log(rot);
    $('.square')
      .css({
        transition: rand(0.1,2) + 's',
        '-webkit-filter': 'hue-rotate(' + rot + 'deg)',
        transform: 'rotate(' + rot + 'deg)',
        'transform-origin': rand(-100,100) + '% ' + rand(-100,100) + '%'
      })
      .data('rotate', rot);
  } else {
    var scaleX = rand(-1,1);
    var scaleY = rand(-1,1);
    $('.square')
      .css({
        transition: rand(0.1,2) + 's',
        '-webkit-filter': 'hue-rotate(' + rand(0,360) + 'deg)',
        transform: 'scale(' + scaleX + ', ' + scaleY + ')',
        // 'transform-origin': rand(-100,100) + '% ' + rand(-100,100) + '%'
      });
  }
}




// utility functions

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function pickOne(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
