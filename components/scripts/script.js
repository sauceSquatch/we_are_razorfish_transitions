
$(document).ready(function()
{
  init();
  reset();
  // transitionOnActiveImage();
  

  TweenLite.to("#loader", 0, {rotation:270, opacity:1});

})

///// INIT vars
init = function() {
  imageCount = $("div.image_group").length;
  i = 1;
  $.getJSON( "../peopleData.json", onLoadedJSON);
  setWidth();
}

var currentNum = 0,
    firstRun = true,
    timeForEachPerson = 3,
    nextNum = 1,
    people = [],
    person1 = $('#person1'),
    person2 = $('#person2'),
    activeperson,
    activeVideo = $('.person-video', '#person1'),
    pageWidth = $(window).width(),
    colors = ['#acd5d3', '#acd5c4', '#ccd5ac', '#d5acc8', '#baacd5', '#acd0d5', '#b5d5ac'],
    newColor = '',
    currentColor = '';

shuffle = function(array) {
  // console.log('SHUFFLE');
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

setWidth = function() {
  pageWidth = $(window).width();

  TweenLite.set($('.person'), {width:pageWidth});
}
$(window).resize(setWidth);

onLoadedJSON = function( data ) {
  // console.log("DATA SUCCESS");
  people = $.each( data.people, function( key, val ) {
  
  });

  people = shuffle(people);
  // console.log(people)
  advanceNextImage();
  
}

///// INIT build
reset = function() {
  
}

timerStart = function() {
  TweenLite.to($("#loader_path"), 0, {drawSVG:"100%"});

  // console.log($("#loader_path"))
  if(firstRun) {
    TweenLite.from($("#loader_path"), 0.01, {drawSVG:"0%", delay:0.5, onComplete:timerComplete});
    firstRun = false;
  } else {
    TweenLite.from($("#loader_path"), timeForEachPerson, {drawSVG:"0%", delay:0.5, onComplete:timerComplete});
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * max) + min;
}

timerComplete = function() {
  newColor = colors[getRandom(0, colors.length)];
  while(newColor == currentColor) {
    newColor = colors[getRandom(0, colors.length)];
  }
  currentColor = newColor;
  // transition out the videos
  if(person1.active == false) {
    activeVideo = $('.person-video', '#person2');
    TweenLite.to($('.details', '#person1'), 0.75, {x:-360, ease:Power4.easeInOut});
    $('#person1').removeClass('top').addClass('bottom');
    TweenLite.to($('#person1'), 0.75, {x:pageWidth * -1, ease:Power4.easeInOut, delay:0.25});
    $('#person2').removeClass('bottom').addClass('top');
    TweenLite.to($('#person2'), 0.75, {x:0, ease:Power4.easeInOut, onComplete:advanceNextImage, delay:0.25});
    person1.active = true;
    person2.active = false;
    // animate the details on
    TweenLite.set($('.details', '#person2'), {backgroundColor:newColor});
    TweenLite.to($('.details', '#person2'), 0.55, {width:80, ease:Power4.easeOut, delay:0.75});
    TweenLite.to($('.details h1', '#person2'), 0.75, {alpha:1, marginLeft:0, delay:0.95, ease:Power4.easeOut});
    TweenLite.to($('.details h2', '#person2'), 0.75, {alpha:1, marginLeft:0, delay:1.05, ease:Power4.easeOut});
  } else {
    activeVideo = $('.person-video', '#person1');
    TweenLite.to($('.details', '#person2'), 0.75, {x:-360, ease:Power4.easeInOut});
    $('#person2').removeClass('top').addClass('bottom');
    TweenLite.to($('#person2'), 0.75, {x:pageWidth * -1, ease:Power4.easeInOut, delay:0.25});
    $('#person1').removeClass('bottom').addClass('top');
    TweenLite.to($('#person1'), 0.75, {x:0, ease:Power4.easeInOut, onComplete:advanceNextImage, delay:0.25});
    person1.active = false;
    person2.active = true;
    // animate the details on
    TweenLite.set($('.details', '#person1'), {backgroundColor:newColor});
    TweenLite.to($('.details', '#person1'), 0.55, {width:80, ease:Power4.easeOut, delay:0.75});
    TweenLite.to($('.details h1', '#person1'), 0.75, {alpha:1, marginLeft:0, delay:0.95, ease:Power4.easeOut});
    TweenLite.to($('.details h2', '#person1'), 0.75, {alpha:1, marginLeft:0, delay:1.05, ease:Power4.easeOut});
  }

  TweenLite.to($('footer'), 0.95, {backgroundColor:newColor, delay:0.5});

  if(activeVideo.get(0) != undefined) activeVideo.get(0).play();
}

advanceNextImage = function() {
  currentNum = nextNum;
  // console.log("nextNum: ", nextNum);
  // console.log("people.length: ", people.length);
  // console.log("currentNum: ", currentNum);

  if(nextNum >= people.length - 1) {
    // nextNum = 0; instead of resetting to zero, re-grab data and re-shuffle
    nextNum = 0;
    // reshuffle
    // people = shuffle(people);
    // init();

  } else {
    nextNum++;
  }

  // figure out what one is inactive and then update data
  if(person1.active == false) {
    TweenLite.set($('#person2'), {x:pageWidth});
    TweenLite.set($('.details h1', '#person2'), {alpha:0, marginLeft:80});
    TweenLite.set($('.details h2', '#person2'), {alpha:0, marginLeft:60});
    TweenLite.set($('.details', '#person2'), {width:pageWidth, backgroundColor:'#000000', x:0});
    $('.details h1', '#person2').text(people[nextNum].name);
    $('.details h2', '#person2').text(people[nextNum].title);
    $('.person-video', '#person2').attr( "src", people[nextNum].video);
  } else {
    TweenLite.set($('#person1'), {x:pageWidth});
    TweenLite.set($('.details h1', '#person1'), {alpha:0, marginLeft:80});
    TweenLite.set($('.details h2', '#person1'), {alpha:0, marginLeft:60});
    TweenLite.set($('.details', '#person1'), {width:pageWidth, backgroundColor:'#000000', x:0});
    $('.details h1', '#person1').text(people[nextNum].name);
    $('.details h2', '#person1').text(people[nextNum].title);
    $('.person-video', '#person1').attr( "src", people[nextNum].video);
  }
  
  timerStart();
}
