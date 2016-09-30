<html>
    <head>
        <title>Lab 5 - Canvas</title>

        <style>
          body{
            text-align:center;
            background-color:#3d97ca;
            color:#FFF;
          }
          canvas{
            background-color:white;
          }
        </style>
    </head>
    <body>
        <h1>Blow some bubbles!</h1>
        <canvas id="canvas" width="500" height="500" style="border:1px solid #000000;"></canvas>
        <br>

        <button id="clear" accesskey="c">Clear the <u>c</u>anvas</button>
        <button id="undo" accesskey="u"><u>U</u>ndo the last move</button>
        <button id="replay" accesskey="r"><u>R</u>eplay the history</button>

        <br>



        <script src="click_location.js"></script>
        <script src="index.js"></script>
        
        <script>
            document.getElementById("submitButton").onclick = function(e){
                
                // alert("something")
                var dotsString = "["+dots.map(JSON.stringify).toString()+"]"
                console.log(dotsString)

                document.getElementById("saveInfo").value = dotsString
                // document.getElementById("saveInfo").value = '[{x:50, y:50, r:RADIUS, c:"red"}]'

                // document.getElementById("saveInfo").value = 'something'
                document.getElementById("form").submit()

            }

            document.getElementById("loadButton").onclick = function(e){
                clearC()
                dots = eval(<?php echo file_get_contents("db.txt") ?>)


                console.log(<?php echo file_get_contents("db.txt"); ?>)



                drawDots()
            }
        </script>
        <script src="keyboard_events.js"></script>
        <script src="button_clicks.js"></script>

        <?php 
            if(strlen($_REQUEST["saveInfo"]) > 1):
                file_put_contents("db.txt", $_REQUEST["saveInfo"]);
            endif; 
        ?>
    </body>
</html>