impress.js tools
============

Tools I developed while using impress.js to make [this video](http://www.youtube.com/watch?v=ObLiikJEt94)

Both these rely on impress.js having a [public API](https://github.com/bartaz/impress.js/issues/39) so once it does, I'll update this to use the official calls.

For more (and better) information on impress.js, see the [main project](https://github.com/bartaz/impress.js).

Play
----
This is a simple timing helper. It just provides a little array you can push slide durations into and at the end, you call 'play'.

    ImpressJS.play(3000);  //Set the first slide duration for 3 seconds
    ImpressJS.play(1000);  //Set the second slide duration for 1 second
    ImpressJS.play(); //Play from the start

Edit
----
If this script is included in the page (after the impress.js script), you can drag your slides around, rotate and scale them into exactly the position you want. Once you're happy, you can get the current HTML output onto the console for pasting back into your original slideshow file.