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
    return pickOne([10,12,15,18,20,30,36,45,60,90,180]);
  } else if (w === '1440x720') {
    return pickOne([10,12,15,16,18,20,24,30,36,40,45,48,60,72,80,90,120,144,180,240,360,720]);
  } else if (w === '1260x720') {
    return pickOne([10,12,15,18,20,30,36,45,60,90,180]);
  } else {
    return pickOne([10,12,15,16,20,24,30,40,48,60,80,120,240]);
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






// utility functions

function pickOne(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}
