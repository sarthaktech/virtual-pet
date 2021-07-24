var dog,sadDog,happyDog;
var addFood,foodObj;
var lastFed,foodStock;
var fedTime,feed,food



function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database()
  createCanvas(1000,400);

  foodObj=new Food()
  foodStock=database.ref("food").on("value",readStock)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

}

function draw() {
  background(46,139,87);

  foodObj.display()

  fedTime=database.ref("FeedTime").on("value",function(data){
    lastFed=data.val()
  })

  if(lastFed>=12){
    fill("red")
    textSize(20)
    text("Last Feed:  " + lastFed % 12 + "PM",350,30)
  }
  else if(lastFed===0){
    fill("red")
    textSize(20)
    text("Last Feed:12AM",350,30)
  }
  else {
    fill("red")
    textSize(20)
    text("Last Feed:  " + lastFed + "AM",350,30)
  }





  drawSprites();
}

//function to read food Stock
function readStock(data){
  food=data.val()
  foodObj.updateFoodStock(food)
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()

  })
}


//function to add food in stock
function addFoods(){
  food++;
  database.ref("/").update({
    Food:food
  })
}
