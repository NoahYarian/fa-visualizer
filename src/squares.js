$(function() {
  console.log('jQuery and the document are loaded');
  updateWindowSize();
  drawSquares();
});

// listeners
$(window).resize(function() {
  updateWindowSize();
  drawSquares();
});

$('input').change(drawSquares);
$('#find').click(function() {
  $('#results')
    .empty()
    .removeClass('hidden');
  var width = $(window).width();
  var height = $(window).height();
  var square = +$('#square').val();
  var squareMin = +$('#squareMin').val();
  var squareMax = +$('#squareMax').val();
  var gutter = +$('#gutter').val();
  var gutterMin = +$('#gutterMin').val();
  var gutterMax = +$('#gutterMax').val();
  var results = findSquares(width, height, square, gutter, squareMin, squareMax, gutterMin, gutterMax);
  console.log(results);
  results.forEach(function(result, i) {
    var resultEle = document.createElement('a');
    $(resultEle)
      .appendTo($('#results'))
      .text(`square: ${result.square}, gutter: ${result.gutter}`)
      .click(function() {
        drawSquares(result.square, result.gutter);
      });
  });
});


///////////

function updateWindowSize() {
  var width = $(window).width();
  var height = $(window).height();
  $('#width').text('width: ' + width);
  $('#height').text('height: ' + height);
}

function drawSquares(square, gutter) {
  var width = $(window).width();
  var height = $(window).height();
  var square = square || +$('#square').val();
  var squareMin = +$('#squareMin').val();
  var squareMax = +$('#squareMax').val();
  var gutter = gutter || +$('#gutter').val();
  var gutterMin = +$('#gutterMin').val();
  var gutterMax = +$('#gutterMax').val();

  var rows = (height - gutter) / (square + gutter);
  var cols = (width - gutter) / (square + gutter);
  var num = rows * cols;

  $('#rows').text('rows: ' + rows.toString().split('').slice(0, 5).join(''));
  $('#cols').text('columns: ' + cols.toString().split('').slice(0, 5).join(''));

  console.log('width: ' + width);
  console.log('height: ' + height);
  console.log('square: ' + square);
  console.log('squareMin: ' + squareMin);
  console.log('squareMax: ' + squareMax);
  console.log('gutter: ' + gutter);
  console.log('gutterMin: ' + gutterMin);
  console.log('gutterMax: ' + gutterMax);
  console.log('rows: ' + rows);
  console.log('cols: ' + cols);
  console.log('num: ' + num);

  if (!checkSquareFit(width, height, square, gutter)) {
    console.log('problem with fit.');
  }

  $('.squares').css('padding', `0 ${gutter}px ${gutter}px 0`).empty();
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

function findSquares(windowWidth, windowHeight, squareSide, gutter, minSquareSide, maxSquareSide, minGutter, maxGutter) {
  var results = [];
  for (var i = minSquareSide; i <= maxSquareSide; i++) {
    for (var j = minGutter; j <= maxGutter; j++) {
      if (checkSquareFit(windowWidth, windowHeight, i, j)) {
        console.log('squareSide: ' + i +', gutter: ' + j);
        results.push({
          width: windowWidth,
          height: windowHeight,
          square: i,
          gutter: j
        });
      } else {
        console.log(i, j);
      }
    }
  }
  return results;
}
