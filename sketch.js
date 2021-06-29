//Create variables here
var dog, happyDog, milk;
var database;
var foodS, foodStock;
var dogImg, milkImg;
var lastFed, foodObj, lastfed;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

function preload()
{
	//load images here
  dogImg=loadImage("images/dog.png");
  happyDog=loadImage("images/happyDog.png");
  milkImg=loadImage("images/Milk.png")
}

function setup() {
	createCanvas(500, 500);

  database=firebase.database();

  dog=createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.1;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  database = firebase.database();
  //game = new Game();
  //game.getState();
  //game.start();

  feed=createButton("Feed the Dog");
  feed.position(500,195);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(650,195);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(49,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
}

  drawSprites();
  //add styles here
  fill("white");
  textSize(16);
  text("Note:Press UP ARROW to feed Drago milk",100,50);

  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastfed+ "AM",350,30);
  }
}


  


function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  
  //logic to decrease the value of foodS and once it becomes 0 foodS should be set as 0 always
  if (x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);
  milk.addImage(milkImg);

  foodObj.updatefoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}