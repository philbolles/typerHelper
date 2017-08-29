//TyperHelper proof of concept by Phil Bolles

{
app.beginUndoGroup('TyperHelper');

function changeO() {

  var myString = "four score and seven years ago our fathers brought",
    myTextLayer = app.project.item(1).layer('theText'),
    myTextLayer2 = app.project.item(1).layer('theText2'),
    myDebugger = app.project.item(1).layer('debug'),
    debugProp = myDebugger.property("Source Text"),
    textProp = myTextLayer.property("Source Text"),
    textProp2 = myTextLayer2.property("Source Text"),
    runningString = "",
    runningString2 = "",
    myCursor = app.project.item(1).layer('cursor'),
    myCursor2 = app.project.item(1).layer('cursor2'),
    frameDuration = 1/24,
    screenAreaEOn = false;

    var rDiff = 0,
      rDiff2 = 0;
    var r = myTextLayer.sourceRectAtTime(0, true),
      r2 = myTextLayer2.sourceRectAtTime(0, true);

    var newWidth = 0,
      oldWidth = 0;


    // initialise text layer to have no characters in it
    textProp.setValueAtTime( 0, '' );
    textProp2.setValueAtTime( 0, '' );


  myCursor.transform.position.setValueAtTime(0, [230,1303]);


  for (var i = 0; i < myString.length; i++) {

    // bring the keycap up in opacity, then back down, only onscreen for about five frames
    // these five frames are added to .2 of the iteration number
    app.project.item(1).layer(myString[i]).opacity.setValueAtTime( (0+i/5), 0);
    app.project.item(1).layer(myString[i]).opacity.setValueAtTime( (frameDuration+i/5), 100);
    app.project.item(1).layer(myString[i]).opacity.setValueAtTime( (5*frameDuration+i/5), 100);
    app.project.item(1).layer(myString[i]).opacity.setValueAtTime( (6*frameDuration+i/5), 0);


    // after the text area width hits 690, add a new line and give us more room,
    // while also moving the letters and cursor back to the beginning of the line
    if (newWidth < 689) {

      myTextLayer.transform.position.setValueAtTime(frameDuration+i/5, [230,1320]);

      // add to our ever-lengthening string, and display it
      runningString = runningString + myString[i];
      textProp.setValueAtTime( frameDuration+i/5, runningString );

      // set differential to be the new width minus the old width
      // diff starts as zero, then should be 31.8 or something, for A

      r = myTextLayer.sourceRectAtTime( frameDuration+i/5, true);
      newWidth = r.width;
      oldWidth = myTextLayer.sourceRectAtTime( frameDuration+((i-1)/5), true).width;

      rDiff = newWidth - oldWidth;



      ///then move the cursor
      //should be previous x coord plus rDiff
      if (myString[i] == " ") {
        myCursor.transform.position.setValueAtTime(frameDuration+i/5, [myCursor.transform.position.valueAtTime(frameDuration + ((i-1)/5), true)[0],1303]);
      }
      else {
          myCursor.transform.position.setValueAtTime(frameDuration+i/5, [myCursor.transform.position.valueAtTime(frameDuration + ((i-1)/5), true)[0]+rDiff,1303]);
      }


      //initialise the next cursor and set opacity of other one
      myCursor2.transform.position.setValueAtTime(frameDuration+i/5, [254,1303]);
      myCursor.opacity.setValueAtTime( frameDuration+i/5, 100);
      myCursor2.opacity.setValueAtTime( frameDuration+i/5, 0);

    } // end if width less than 633 or whatever
      //********

    else {

      //fade out the other cursor, bring up new one
      myCursor.opacity.setValueAtTime( frameDuration+i/5, 0);
      myCursor2.opacity.setValueAtTime( frameDuration+i/5, 100);


      // move text
      myTextLayer.transform.position.setValueAtTime(frameDuration+i/5, [230,1260]);


      // is it already turned on?
      if (screenAreaEOn === true) {
        //do nothing
      }
      else {
          app.project.item(1).layer('screenAreaE').opacity.setValueAtTime( ( (frameDuration+i/5)-frameDuration), 0);
          app.project.item(1).layer('screenAreaE').opacity.setValueAtTime( (frameDuration+i/5), 100);
          screenAreaEOn = true;
      }

      // add to our ever-lengthening string, and display it
      runningString2 = runningString2 + myString[i];
      textProp2.setValueAtTime( frameDuration+i/5, runningString2 );



      //redefine variables
      r2 = myTextLayer2.sourceRectAtTime( frameDuration+i/5, true);
      newWidth2 = r2.width;
      oldWidth2 = myTextLayer2.sourceRectAtTime( frameDuration+((i-1)/5), true).width;

      rDiff2 = newWidth2 - oldWidth2;


      //debug display the new vars
      debugProp.setValueAtTime( frameDuration+i/5   ,  newWidth2 + " " + oldWidth2 );


      ///then move the cursor2
      //should be previous x coord plus rDiff
      if (myString[i] == " ") {
        myCursor2.transform.position.setValueAtTime(frameDuration+i/5, [myCursor2.transform.position.valueAtTime(frameDuration + ((i-1)/5), true)[0],1303]);
      }
      else {
          myCursor2.transform.position.setValueAtTime(frameDuration+i/5, [myCursor2.transform.position.valueAtTime(frameDuration + ((i-1)/5), true)[0]+rDiff2,1303]);
      }



    }


  }

}

changeO();

app.endUndoGroup(); // End Undo group

}
