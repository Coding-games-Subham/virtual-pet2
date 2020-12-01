//Create variables here
var dog, happyDog, database, foodS, foodStock
var feedPet,addPet
var feedTime,lastFed
var foodObj;
function preload()
{
  //load images here
  foodWait = loadImage("dogImg.png");
  foodReady = loadImage("dogImg1.png");
  food = loadImage("Milk.png")
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  foodS=20;
  
 dog = createSprite(250,250);
 dog.addImage(foodWait);
 dog.scale=0.2;

feed=createButton("feed the dog")
feed.position(700,95);
feed.mousePressed(feedDog);

AddFood=createButton("Add Food")
AddFood.position(800,95);
AddFood.mousePressed(addFoods);
foodObj=new Milk();

 foodStock=database.ref('Food');
foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);
  feedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  });
  if(keyWentUp(UP_ARROW)){
    writeStock(foodS-1);
     dog.addImage(foodReady);
  }
  drawSprites();
  //add styles here
  textSize(30);
  stroke("blue");
  strokeWeight(3);
  if(keyWentDown('a')){
   writeStock(foodS+1);
  }
  text("Press'a' to add Food",100,420);
  
    text('food Remaining : ' + foodS,100,100);
    text("Press Up Arrow Key To feed Your Pet",00,490);
    
}
function addFood(){
   foodS+=1;
}
function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foods
  })
}



