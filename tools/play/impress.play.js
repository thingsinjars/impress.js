/**
 * impress.play.js
 *
 * Play module
 * This allows the slide advance to be timed without modifying the underlying data attributes
 * Include after ImpressJS
 * ImpressJS.play(time); // Adds a time (in milliseconds) onto the queue
 * ImpressJS.play();     //Runs through the timings from the current slide
 *
 * TODO
 * - Make aware of which slide is currently visible so that ImpressJS.play(time) modifies the current slide
 *   instead of just adding on to the end
 *
 * ImpressJS Play
 * MIT Licensed
 * Simon Madine (@thingsinjars)
 *
 * ImpressJS
 * MIT Licensed
 * Copyright 2011 Bartek Szopka (@bartaz)
 */
if (window.ImpressJS) {
  (function () {
    ImpressJS.play = function() {
      if (arguments.length === 1) {
        console.log('Adding: ' + arguments[0] + ' to:', ImpressJS.play.timing);
        ImpressJS.play.timing.push(arguments[0]);
      } else {
        var i, j, t = 0;
        for (i = 0, j = ImpressJS.play.timing.length; i < j; i++) {
          setTimeout(ImpressJS.next, t += ImpressJS.play.timing[i]);
        }
      }
    };
    ImpressJS.play.timing = [];
  }());
}