/**
 * impress.edit.js
 *
 * Editing Mode
 * This allow the slides to be positioned using the mouse
 * Hold down shift to rotate
 * Hold down alt to scale
 * Hold down cmd (or ctrl) to move
 * Clicking on the text in the top-left corner of the screen will output the updated page source to the console.
 *
 * TODO
 * - Change scale factor in moving mode to be the slides' original one, not the current one
 * - Add in a 'drag page source to desktop' handler
 *
 * ImpressJS Edit
 * MIT Licensed
 * Simon Madine (@thingsinjars)
 *
 * ImpressJS
 * MIT Licensed
 * Copyright 2011 Bartek Szopka (@bartaz)
 */
(function ( document, window ) {
  if(ImpressJS) {
    var mouseDown = false,
      mouseOriginal = {},
      rotatePattern = /rotateZ\(([-\d]*)deg\)/,
      canvas = document.getElementsByClassName('canvas')[0],
      canvasTransformProperty = getTransformProperty(canvas);

    //Slide Editing tools
    document.addEventListener("mousedown", function ( event ) {
      var target = ImpressJS.target(event.target);
      if(target.nodeName != 'BODY' && target.id != 'statusBar') {
        mouseDown = true;
        mouseOriginal = {Ex:event.pageX, Ey:event.pageY, target: target, rotate: ~~target.dataset.rotate, scale : 1*target.dataset.scale, x : 1*target.dataset.x, y : 1*target.dataset.y};
      }
    });
    document.addEventListener("mousemove", function ( event ) {
      if(mouseDown) {
        if(event.shiftKey) {
          updateMode("Rotating");
          mouseOriginal.target.dataset.rotate = format((mouseOriginal.rotate+(event.pageX-mouseOriginal.Ex)/2)%360, 2);
        }
        if(event.altKey) {
          updateMode("Scaling");
          mouseOriginal.target.dataset.scale = format(mouseOriginal.scale + (event.pageX-mouseOriginal.Ex)/50, 2);
        }
        if(event.metaKey) {
          updateMode("Moving");
          var dX = (event.pageX-mouseOriginal.Ex),
              dY = (event.pageY-mouseOriginal.Ey),
              canvasRotation = canvas.style[canvasTransformProperty].match(rotatePattern)[1],
              cosAlpha = Math.cos((canvasRotation/180)*Math.PI), // I hate radians. Seriously.
              sinAlpha = Math.sin((canvasRotation/180)*Math.PI);
          mouseOriginal.target.dataset.x = format(mouseOriginal.x + (cosAlpha * dX + sinAlpha * dY ) * mouseOriginal.scale, 2);
          mouseOriginal.target.dataset.y = format(mouseOriginal.y + (cosAlpha * dY - sinAlpha * dX ) * mouseOriginal.scale, 2);
        }
        ImpressJS.update(mouseOriginal.target, 0);
      }
    });
    
    document.addEventListener("mouseup", function ( event ) {
              mouseDown = false;
              updateMode("Edit mode");
    });

    function format(number, dp) {
      dp = Math.pow(10,dp);
      return Math.floor(number*dp)/dp;
    }

    // Generate the markup for the current layout
    var getDoctype = function(a,b){with(document.doctype)return'<!DOCTYPE '+name+((b=publicId,a=systemId)?(b?' PUBLIC "'+b+'" ':' SYSTEM ')+'"'+a+'"':'')+'>'};
    function generateMarkup() {
      var doctype = getDoctype();
      var markup = document.all[0].innerHTML;
      return doctype+"\n"+markup;
    }
    
    function updateMode(editMode) {
      var statusBar = document.getElementById('statusBar');
      if(!statusBar) {
          statusBar = document.createElement('div');
          statusBar.id = 'statusBar';
          with(statusBar.style) {
            position = 'fixed';
            top = '10px';
            left = '10px';
            fontSize = '20px';
            color = '#444';
          }
          document.body.appendChild(statusBar);
          statusBar.addEventListener("click", function ( event ) {
            console.log(generateMarkup());
          });
      }
      statusBar.innerHTML = editMode;
    }
    
    /* To prevent text highlighting when dragging */
    var div = document.createElement('div'); div.innerHTML ='x<style>*{-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;-o-user-select: none;user-select: none;}</style>';document.body.appendChild(div.lastChild);
    
    // From https://github.com/zachstronaut/jquery-css-transform/blob/master/jquery-css-transform.js
    function getTransformProperty(element) {
            var properties = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'];
            var p;
            while (p = properties.shift())
            {
                if (typeof element.style[p] != 'undefined')
                {
                    return p;
                }
            }
        
            // Default to transform also
            return 'transform';
    }
  }  
})(document, window);