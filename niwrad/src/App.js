
import './App.css';




function App() {


  return (
    <div className="App">
      
  
      

      
      
      
    
    </div>
  );
}


export default App;






const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


// Canvas Size
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)


let timer = 100
// Gravity 
const gravity = .6

// This multiplies all the sprites speed
const spriteSpeedIntensifier = 1

// This multiplies all the sprite's jump force
const jumpForce = 1

// This is the pause

let pause = true

// Sprite Creator

class Sprite {
  constructor({position, velocity, speed, color = 'red', offset, name, height = 150, width = 50, }){
    this.position = position
    this.velocity = velocity
    this.name = name
    this.width = width
    this.height = height
    this.lastKey = 'key'
    this.speed = (speed * spriteSpeedIntensifier)
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y 
      } ,
      offset, // offset: offset
      width: 100,
      height: 50,

    }
    this.color = color
    this.isAttacking = false
    this.canAttack = true
    this.canJump = true
    this.canMoveLeft = true
    this.canMoveRight = true
    this.alive = true
    this.score = 0
    this.isFalling = false
    this.maxVelocity = {
      x: 5,
      y: 20
    }
    //this.reset = reset
  }
    //Draws out sprites and attack boxes
  draw() {
    // Drawing out red sprites
    c.fillStyle = this.color
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
    

    //Drawing out sprite attack boxes

   if (this.isAttacking){
    c.fillStyle = 'green'
    c.fillRect(this.attackBox.position.x,
               this.attackBox.position.y,
               this.attackBox.width,
               this.attackBox.height )
   }
  }

      
  update(){
    if(this.alive){
      this.draw()
      this.attackBox.position.x = this.position.x + this.attackBox.offset.x
      this.attackBox.position.y = this.position.y
  
      c.fillStyle = 'white'
      c.fillText(timer,canvas.width/2, 40)
      
  
  
      //Score
  
      
  
      // Implements gravity and makes sure it doesn't fall through the ground
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
  
      if (this.position.y + this.height + this.velocity.y >= canvas.height){
        this.velocity.y = 0;
        this.canJump = true;
        
      } 
      else{
        this.velocity.y += gravity
      }
      if (this.position.x + this.width >= canvas.width ){
        console.log(this.name +" is out of bounds right")
        this.canMoveRight = false
        this.velocity.x = 0
      }
      else{
        this.canMoveRight = true
      }
      if (this.position.x <= 0){
        console.log(this.name +" out of bounds left")
        this.canMoveLeft = false
        this.velocity.x = 0
        
      }
      else{
        this.canMoveLeft = true
      }
  
      
    }
  
  }
    //attack lasts .1 seconds
    attack() {
      this.isAttacking = true
      this.canAttack = false
      setTimeout(() => {
        this.isAttacking = false
      }, 100)
    }

    





}


// Making a new player

// Start position
// Starting velocity - Resets after touching ground
// Speed
// Color (default is red)

const player = new Sprite({
  position:{
    x: 10,
    y: 0
  },
  velocity:{
    x: 0,
    y: 10
  },
  speed : 5,
  offset: {
    x: 0,
    y: 0
  },
  name: 'player'
})




// Making a new enemy

// Start position
// Starting velocity - Resets after touching ground
// Speed
// Color

const enemy = new Sprite({
  position:{
    x: 400,
    y: 100
  },
  velocity:{
    x: 0,
    y: 10
  },
  speed : 5,
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  name: 'enemy',
})




//canvas.width = 1024;
//canvas.height = 576;


//Making player HP bar
const playerBar = new Sprite({
  position:{
    x: canvas.width*0.05,
    y: canvas.height*0.05
  },
  velocity:{
    x: 0,
    y: 0
  },
  color: 'darkred',
  width: canvas.width*0.4,
  height: canvas.height*0.05

})



//Making enemy HP bar
const enemyBar = new Sprite({
  position:{
    x: (canvas.width*.6)-(canvas.width*0.05),
    y: canvas.height*0.05
  },
  velocity:{
    x: 0,
    y: 0
  },
  color: 'darkblue',
  width: canvas.width*0.4,
  height: canvas.height*0.05,
  

})




// Debug
//console.log(player)



// Checking if the key is currently pressed

const keys = {
  a: {
    pressed: false  
  },
  d: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  }
} 



function friction(){
    if(player.canJump){
      if (player.velocity.x > 0){
        player.velocity.x -= .4;
      }
      if (player.velocity.x < 0){
        player.velocity.x += .4;
        
      }
    }
    if(enemy.canJump){
      if (enemy.velocity.x > 0){
        enemy.velocity.x -= .4;
      }
      if (enemy.velocity.x < 0){
        enemy.velocity.x += .4;
      }
      
    }
    if (player.velocity.x < 1 && player.velocity.x > -1){
      player.velocity.x = 0
    }
    if (enemy.velocity.x < 1 && enemy.velocity.x > -1){
      enemy.velocity.x = 0
    }
    
    
}


//detects if 2 differnt rectangles are colliding. 

function rectangularCollision({rectangle1, rectangle2}){


  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >= 
      rectangle2.position.x  &&
     rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
     rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y  &&
     rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
}

// This is the infinite loop

function animate(){
  // Reseting the simulation
  window.requestAnimationFrame(animate)
    friction()
    
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update()
    enemy.update()
    playerBar.draw()
    enemyBar.draw()
    //player.velocity.x = 0;
    //enemy.velocity.x = 0;
    
    
    // Making sure that the last key pressed is the direction the player is moving
    // Setting velocity direction (left - right)
    if(player.velocity.y  <= 0){
      player.isFalling = false
    }
    else{
      player.isFalling = true
    }

    if(enemy.velocity.y  <= 0){
      enemy.isFalling = false
    }
    else{
      enemy.isFalling = true
    }
    
    //console.log(player.isFalling)
    //console.log(player.velocity.y)

    if(player.canMoveLeft){
      if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x += (-1 * player.speed)
      }
      
    }
    if(player.canMoveRight){
      if (keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x += (1 * player.speed)
      }
    }
    if (player.velocity.x > player.maxVelocity.x){
      player.velocity.x = player.maxVelocity.x
    }
    if (player.velocity.x < (-1 * player.maxVelocity.x)){
      player.velocity.x = (-1 * player.maxVelocity.x)
    }

    // Making sure that the last key pressed is the direction the enemy is moving
    // Setting velocity direction (left - right) 
    // stops when out of bounds
    if(enemy.canMoveLeft){
      if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x += (-1 * enemy.speed)
      }
    }
    if(enemy.canMoveRight){
      if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x += (1 * enemy.speed)
      }
    }

    if (enemy.velocity.x > enemy.maxVelocity.x){
      enemy.velocity.x = enemy.maxVelocity.x
    }
    if (enemy.velocity.x < (-1 * enemy.maxVelocity.x)){
      enemy.velocity.x = (-1 * enemy.maxVelocity.x)
    }


    // detect for collision between attackBox and body

    if(
      rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
      player.isAttacking
      ){
        player.isAttacking = false
      console.log("player attack sucessful")
      
      if (enemyBar.width >= pEnemyWidth-1){
        if (player.isFalling){
          enemyBar.width -= pEnemyWidth
          enemyBar.position.x += pEnemyWidth
        }
        enemyBar.width -= pEnemyWidth
        enemyBar.position.x += pEnemyWidth
        if(player.position.x < enemy.position.x){
          enemy.velocity.y = -10
          enemy.velocity.x = 10
        }
        if(player.position.x > enemy.position.x){
          enemy.velocity.y = -10
          enemy.velocity.x = -10
        }
        if(enemyBar.width < 0){
          enemyBar.width = 0
          enemy.alive = false
          player.score++
          console.log("Score - Player: "+player.score+" Enemy: "+enemy.score)
          setTimeout(() => {
            restart()
          }, 3000)
        }
        
      }
      
    } 

    if(rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
      enemy.isAttacking
      ){
        enemy.isAttacking = false
      console.log("enemy attack sucessful")
      
      if (playerBar.width >= pBarWidth-1){ 
        if(enemy.isFalling){
          playerBar.width -= pBarWidth
        }
        playerBar.width -= pBarWidth
        if(enemy.position.x < player.position.x){
          player.velocity.y = -10
          player.velocity.x = 10
        }
        if(enemy.position.x > player.position.x){
          player.velocity.y = -10
          player.velocity.x = -10
        }
        if(playerBar.width < 0){
          playerBar.width = 0
          player.alive = false
          enemy.score++
          console.log("Score - Player: "+player.score+" Enemy: "+enemy.score)
          setTimeout(() => {
            restart()
          }, 3000)
        }
      }
      
    }
  vsAI()



}

// Starting the simulation
if (pause) {
animate()
} else {}
const pBarWidth = playerBar.width*.1
const pEnemyWidth = enemyBar.width*.1

let rpBarWidth = playerBar.width
let reBarWidth = enemyBar.width

function restart(){
  
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    playerBar.width = rpBarWidth
    enemyBar.width = reBarWidth
    player.alive = true
    enemy.alive = true
    player.position.y = 0
    player.position.x = 10
    enemy.position.y = 100
    enemy.position.x = 400
    player.canJump = false
    enemy.canJump = false
    player.velocity.x = 0
    player.velocity.y = 0
    enemy.velocity.x = 0
    enemy.velocity.y = 0
    enemyBar.position.x = (canvas.width*.6)-(canvas.width*0.05)
    player.canAttack = false
    enemy.canAttack = false
    timer = 100
    pause = true
    
    
  
    
  

}

//startTimer()

setInterval( startTimer, 1000)


  
function startTimer(){
  console.log("tick")
  enemy.canAttack = true
  player.canAttack = true
  if (timer <=0){
    pause = false
    restart()
    
  }
  else{
    if (pause){
      if(player.alive && enemy.alive){
        timer--
      }
      
    }
    
  }
}

  
  


  


function oneSecondFunction() {

if (timer<=0){
      pause = false
      console.log("Hit")
      clearInterval(startTimer.stop1)
      DownHP()
}
else{
  if(player.alive && enemy.alive){
    timer--
  }
  else{
    clearInterval(startTimer.stop1)
    DownHP()
  }
  
}
}


function DownHP(){
    let stop2 = setInterval(function(){
      if(enemy.alive && player.alive){
        enemyBar.width -= pEnemyWidth
        enemyBar.position.x += pEnemyWidth
        playerBar.width -= pBarWidth
        
        console.log('minus')
        if(playerBar.width < 0){
          playerBar.width = 0
          player.alive = false
          enemy.score++
          console.log("Score - Player: "+player.score+" Enemy: "+enemy.score)
          clearInterval(stop2)
          restart()
        }
        if(enemyBar.width < 0){
          enemyBar.width = 0
          enemy.alive = false
          player.score++
          console.log("Score - Player: "+player.score+" Enemy: "+enemy.score)
          clearInterval(stop2)
          restart()
        
      }
      }
    },300)


}






// Checking for keydown events
window.addEventListener('keydown', (event) => {

  
  switch (event.key){
    // This is the pause

    case 'Escape':
     if (pause){
       pause = false 
     }
     else{
       pause = true
     }
     break
      
    case ' ':
        if (pause){

          restart()
        }
      break
  }
  if (pause){
    if(player.alive){
        switch (event.key){

    // player keys - setting the current downkey to last key pressed

    
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
      player.attackBox.offset.x = 0
      break
    case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
      player.attackBox.offset.x = -50
      break
    case 'w':
      if(player.canJump){
        player.velocity.y = (-20 * jumpForce)
        player.canJump = false
      }
      
      break
    case 's':
      
      if (player.canAttack){
        player.attack()
      }
      break

  }
    }
    if(enemy.alive){
      switch (event.key){

        //enemy keys - setting the current downkey to last key pressed
        case 'ArrowRight':
          keys.ArrowRight.pressed = true
          enemy.lastKey = 'ArrowRight'
          enemy.attackBox.offset.x = 0
        break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = true
          enemy.lastKey = 'ArrowLeft'
          enemy.attackBox.offset.x = -50
        break
        case 'ArrowUp':
          if(enemy.canJump){
            enemy.velocity.y = (-20 * jumpForce)
            enemy.canJump = false
          }
          
        break
        case 'ArrowDown':
          
          if (enemy.canAttack){
            enemy.attack()
          }
        break
        case 'p':
          



          
        break
      }
    }
  

  // Debug - Logging out which key went down
  //console.log(event.key)
}
})


// Checking for keyup events
window.addEventListener('keyup', (event) => {

  
  switch (event.key){

    


    // player
    // Switching off current key
    // Switching the last key pressed to the opposite just incase
    case 'd'
      :
      keys.d.pressed = false
      player.lastKey = 'a'
    break
    case 'a':
      keys.a.pressed = false
      player.lastKey = 'd'
    break
    // case 's':
    //   player.canAttack = true
    //   break


    //enemy
    // Switching off current key
    // Switching the last key pressed to the opposite just incase
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      enemy.lastKey = 'ArrowLeft'
      
    break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      enemy.lastKey = 'ArrowRight'
    break

    case 'ArrowDown':
      enemy.canAttack = true
      
      break

    
  }

  // Debug - Logging out which key went up
  //console.log(event.key + " keyup")

})

function vsAI () {
  if (pause) {
    if (enemy.position.x < player.position.x) {
      keys.ArrowRight.pressed = true
      enemy.lastKey = 'ArrowRight'
      enemy.attackBox.offset.x = 0
    } else {
      keys.ArrowRight.pressed = false
      enemy.lastKey = 'ArrowLeft'
    }
    if (enemy.position.x > player.position.x) {
      keys.ArrowLeft.pressed = true
      enemy.lastKey = 'ArrowLeft'
      enemy.attackBox.offset.x = -50
    } else {
      keys.ArrowLeft.pressed = false
      enemy.lastKey = 'ArrowRight'
    }
    if (enemy.position.y > player.position.y + 10) {
      if(enemy.canJump){
        enemy.velocity.y = (-20 * jumpForce)
        enemy.canJump = false
      }
    }
    if (enemy.position.x - player.position.x <= 50 && enemy.position.y - player.position.y <= 50) {
      if (enemy.canAttack) {
      enemy.attack()
      }
    }
  } else {
    keys.ArrowRight.pressed = false
    keys.ArrowLeft.pressed = false
  }
  



}


