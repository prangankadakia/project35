var balloon,balloon1;
var background1;
var database;
var position;


function preload(){
background1 = loadImage("images/Hot Air Ballon-01.png");
balloon1 = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-02.png",
"images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-03.png",
"images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png","images/Hot Air Ballon-04.png","images/Hot Air Ballon-04.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon  = createSprite(100,100)
  balloon.addAnimation("hotairballoon", balloon1)

  var balloonHeight=database.ref('balloon/position');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}

function draw() {
  background(background1);  
 
  
    if(position!==undefined){
    if(keyDown(LEFT_ARROW)){
      updateHeight(-10,0);
      balloon.addAnimation("hotAirBalloon",balloon1);
    }
    else if(keyDown(RIGHT_ARROW)){
      updateHeight(10,0);
      balloon.addAnimation("hotAirBalloon",balloon1);
    }
    else if(keyDown(UP_ARROW)){
      updateHeight(0,-10);
      balloon.addAnimation("hotAirBalloon",balloon1);
      balloon.scale=balloon.scale -0.005;
    }
    else if(keyDown(DOWN_ARROW)){
      updateHeight(0,+10);
      balloon.addAnimation("hotAirBalloon",balloon1);
      balloon.scale=balloon.scale+0.005;
    }
  
    drawSprites();
    fill(0);
    stroke("white");
    textSize(25);
    text("**Use arrow keys to move Hot Air Balloon!",40,40);
   }
  }   
  
  
  function updateHeight(x,y){
    database.ref('balloon/position').set({
      'x': position.x + x,
      'y': position.y + y,
    })
  }
  
  function readHeight(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
  }
  
  function showError(){
    console.log("Error in writing to the database");
  }
  