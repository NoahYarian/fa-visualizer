$(function() {
  console.log('jQuery and the document are loaded');
  updateWindowSize();
});

// listeners
$(window).resize(function() {
  updateWindowSize();
});

$('#trySquares').click(drawSquares);


///////////

function updateWindowSize() {
  var width = $(window).width();
  var height = $(window).height();
  $('#width').text('width: ' + width);
  $('#height').text('height: ' + height);
}

function drawSquares() {
  var width = $(window).width();
  var height = $(window).height();
  var square = $('#square').val();
  var squareMin = $('#squareMin').val();
  var squareMax = $('#squareMax').val();
  var gutter = $('#gutter').val();
  var gutterMin = $('#gutterMin').val();
  var gutterMax = $('#gutterMax').val();

  var rows = (width - gutter) / (square + gutter);
  var cols = (width - gutter) / (square + gutter);
  var num = rows * cols;

  var squareDiv;
  for (var i = 0; i < num; i++) {
    squareDiv = document.createElement('div');
    $(squareDiv)
      .addClass('drawnSquare')
      .css({
        'height': square,
        'width': square,
        'margin-left': gutter,
        'margin-top': gutter,
        'background': randomColor({luminosity: 'bright'}),
        'border': '5px solid ' + randomColor({luminosity: 'bright'})
      });
    $('.squares').append(squareDiv);
  }
}

///////////
function checkSquareFit(windowWidth, windowHeight, squareSide, gutter) {
  if (
    (windowWidth - gutter) % (squareSide + gutter) === 0 &&
    (windowHeight - gutter) % (squareSide + gutter) === 0
  ) {
    console.log('it works!');
    console.log('squareSide: ' + squareSide + 'px');
    console.log('gutter: ' + gutter + 'px');
    console.log('columns: ' + (windowWidth - gutter) / (squareSide + gutter));
    console.log('rows: ' + (windowWidth - gutter) / (squareSide + gutter));
    return true;
  } else {
    console.log('no dice.')
    console.log('squareSide: ' + squareSide + 'px');
    console.log('gutter: ' + gutter + 'px');
    console.log('columns: ' + (windowWidth - gutter) / (squareSide + gutter));
    console.log('rows: ' + (windowHeight - gutter) / (squareSide + gutter));
    return false;
  }
}

function varyGutter(windowWidth, windowHeight, squareSide, gutter, minGutter, maxGutter) {
  var results = [];
  for (var i = minGutter; i <= maxGutter; i++) {
    if (checkSquareFit(windowWidth, windowHeight, squareSide, i)) {
      console.log('Booya! A gutter of ' + i + 'px works.');
      results.push({
        windowWidth: windowWidth,
        windowHeight: windowHeight,
        squareSide: squareSide,
        gutter: i
      });
    }
  }
  return results;
}

function varySquareSide(windowWidth, windowHeight, squareSide, gutter, minSquareSide, maxSquareSide) {
  var results = [];
  // if (!minSquareSide) {
  //   minSquareSide = 1;
  //   maxSquareSide = windowWidth > windowHeight ? windowHeight : windowWidth;
  // }
  for (var i = minSquareSide; i <= minSquareSide; i++) {
    if (checkSquareFit(windowWidth, windowHeight, i, gutter)) {
      console.log('Booya! A squareSide of ' + i + 'px works.');
      results.push({
        windowWidth: windowWidth,
        windowHeight: windowHeight,
        squareSide: i,
        gutter: gutter
      });
    }
  }
  return results;
}

function getClose(windowWidth, windowHeight, squareSide, gutter, minSquareSide, maxSquareSide, minGutter, maxGutter) {
  if (checkSquareFit(windowWidth, windowHeight, squareSide, gutter)) {
    console.log('no need to vary the gutter or square size.');
  } else {

  }
}
