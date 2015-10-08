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
        updateInputFields({square: result.square, gutter: result.gutter});
      });
  });
});


///////////

function updateInputFields(options) {
  if (options.square) {
    $('#square').val(options.square);
  }
  if (options.gutter) {
    $('#gutter').val(options.gutter);
  }
}

function updateWindowSize() {
  var width = $(window).width();
  var height = $(window).height();
  $('#width').text('width: ' + width);
  $('#height').text('height: ' + height);
}

function drawSquares(square, gutter) {
  var width = $(window).width();
  var height = $(window).height();
  var square = +square || +$('#square').val();
  var squareMin = +$('#squareMin').val();
  var squareMax = +$('#squareMax').val();
  var gutter = +gutter || +$('#gutter').val();
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

  // $('.squares').css('padding', `0 ${gutter}px ${gutter}px 0`).empty();
  // $('.squares').css('padding', `${gutter}px 0 0 ${gutter}px`).empty();
  $('.squares').empty();

  var squareDiv, border;
  for (var i = 0; i < num; i++) {
    border = new Border();
    squareDiv = document.createElement('div');
    $(squareDiv)
      .addClass('drawnSquare')
      .css({
        'height': square,
        'width': square,
        'margin-left': gutter,
        'margin-top': gutter,
        'background': randomColor({luminosity: 'bright'}),
        'border-style': border.styles.join(' '),
        'border-color': border.colors.join(' '),
        'border-width': '5px',
      });
    $('.squares').append(squareDiv);
  }
  // $('.squares div:nth-child(' + Math.round(cols) + 'n)').css('margin-left', 0); //meh
}

function Border() {
  var styles = ['none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];
  this.styles = [];
  this.colors = randomColor({count: 4, luminosity: 'bright'});
  for (var i = 0; i < 4; i++) {
    this.styles.push(styles[Math.floor(Math.random() * 9)]);
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
    console.log('rows: ' + (windowHeight - gutter) / (squareSide + gutter));
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

function varyContainer(square, gutter, variation) {  // too many variables everywhere. simplifying.
  var width = $(window).width(); // 1172, e.g.
  var height = $(window).height(); // 835, e.g.

  if (checkSquareFit(width, height, square, gutter)) {
    return [width, height, square, gutter];
  }

  for (var i = 0; i < variation; i++) {
    if (checkSquareFit(width-i, height-i, square, gutter)) {
      return [width, height, square, gutter];
    }
  }
  return false;
}

// http://stackoverflow.com/questions/17445231/js-how-to-find-the-greatest-common-divisor
function gcd(a,b) {
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

// round both width and height to the nearest [squareSide] and it will work.
// same as what i did before by using Math.floor() on the rows and columns.

// what is the point of this? :-|
// fill a window with squares that reach the edge if possible.
// if not possible by changing the side length or gutter size within the range given,
//   alter the centered container size as needed
// Maybe this is difficult because it's about prioritizing variables in a certain order.
// Which is the most important? square size, gutter size, or container size? Which is least?

// I think the container size isnt as important as the consistency of the proportions of it are.
// If it was smaller by however much but the border around it was even on all sides It would look good.

// Things to alter over time, depending on song beat information --
//   sizes - square, gutter, container, border, icon
//   colors - square, border, background, icon
//   shapes - transform divs - rotate, scale, etc.
//   icons
//   border styles


// ok, so one side of this is making the squares, and the other is about animating them to music.
// what is my MVP for these squares?
// - appear centered in the window
// -

// idea - breakpoints for determined container size.
// My mac - full screen - 1440x900, windowed chrome w/ toolbar -
// most common sizes, in order - 1366x768 1920x1080 1024x768 1280x800 1440x900 1280x1024
// 1000px - 200px covers 90%+ of css-tricks' users
//
// ok... how about just a few sizes to work with for now.
// ----- 1440x900
// ----- 1440x727
// ----- 1000x700

function vary(square, gutter, whatToVary, maxVariation) {
  var width = $(window).width();
  var height = $(window).height();

  if (whatToVary === 'square') {

    for (var i = 0; i < maxVariation; i++) {
      if (checkSquareFit(width, height, square-i, gutter)) {
        return [width, height, square-i, gutter];
      } else if (checkSquareFit(width, height, square+i, gutter)) {
        return [width, height, square+i, gutter];
      }
    }

  } else if (whatToVary === 'gutter') {

    for (var i = 0; i < maxVariation; i++) {
      if (checkSquareFit(width, height, square, gutter-1)) {
        return [width, height, square, gutter-i];
      } else if (checkSquareFit(width, height, square, gutter+i)) {
        return [width, height, square, gutter+i];
      }
    }

  } else if (whatToVary === 'container') {  // this can be improved.

    for (var i = 0; i < maxVariation; i++) {
      if (checkSquareFit(width-i, height-i, square, gutter)) {
        return [width-i, height-i, square, gutter];
      }
    }

  } else if (whatToVary === 'width') {  // this can be improved.

    for (var i = 0; i < maxVariation; i++) {
      if (checkSquareFit(width-i, height, square, gutter)) {
        return [width-i, height, square, gutter];
      }
    }

  } else if (whatToVary === 'height') {  // this can be improved.

    for (var i = 0; i < maxVariation; i++) {
      if (checkSquareFit(width, height-i, square, gutter)) {
        return [width, height-i, square, gutter];
      }
    }

  } else {
    console.log('Vary unsuccessful!');
  }

}

// figure out what square size within the accepted range will make a container fit most closely
// to the edges of the window

function getClose(square, gutter, maxVariation) { // working...ish?
  var width = $(window).width();
  var height = $(window).height();
  var results = [];
  var widthDiff, heightDiff, combinedDiff, lowestDiff;

  if (checkSquareFit(width, height, square, gutter)) {
    return {
      width: width,
      height: height,
      square: square,
      gutter: gutter,
      combinedDiff: 0
    }
  }

  for (var i = 0; i < maxVariation; i++) {
    results.push(getDiff(width, height, square-i, gutter));
    results.push(getDiff(width, height, square+i, gutter));
  }
  console.log(results);

  results.forEach(function(result) {
    if (!lowestDiff || result.combinedDiff < lowestDiff.combinedDiff) {
      lowestDiff = result;
    }
  });

  var cols = Math.round((width - gutter) / (lowestDiff.square + gutter));
  var rows = Math.round((height - gutter) / (lowestDiff.square + gutter));

  var newWidth = (cols * lowestDiff.square) + ((cols - 1) * gutter);
  var newHeight = (rows * lowestDiff.square) + ((rows - 1) * gutter);

  return [newWidth, newHeight, lowestDiff.square, gutter, lowestDiff.combinedDiff];

}

function getDiff(width, height, square, gutter) {
  var widthDiff = (width - gutter) % (square + gutter);
  var heightDiff = (height - gutter) % (square + gutter);
  var combinedDiff = widthDiff + heightDiff;
  return {
    width: width,
    height: height,
    square: square,
    gutter: gutter,
    combinedDiff: combinedDiff
  }
}

//could decrease width by 1 at a time, then check height for a range of +/- 10, e.g.
