///////////////////////////////////////////////////
// I would like to make squares dance to music. //
/////////////////////////////////////////////////

// What is my MVP for these dancing squares?
// - appear centered in the window
// - work in a few different window sizes
// -- 1440x900
// -- 1440x727
// -- 1000x700
// -- 650x400
// - be colorful
// - change visually according to beat information
// - change without lagging noticeably

$(function() {
  console.log('jQuery and the document are loaded');
  setContainerSize();
  drawSquares();
});

function setContainerSize() {
  var width = $(window).width();
  var height = $(window).height();
  var w = 650;
  var h = 400;

  if (width >= 1440 && height >= 900) {
    w = 1440;
    h = 900;
  } else if (width >= 1440 && height >= 727) {
    w = 1440;
    h = 727;
  } else if (width >= 1000 && height >= 700) {
    w = 1000;
    h = 700;
  }
  $('.squares').css({width: w, height: h});
}

function drawSquares() {

}
