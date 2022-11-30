
import './App.css';

import bg from './img/background.png'

import s from './img/shop.png'

import red from './img/char_red_1.png'

import PL2 from './img/purple/PL2.png'
import PL1 from './img/purple/PL1.png'

import PR1 from './img/purple/PR1.png'
import PR2 from './img/purple/PR2.png'
import { Button } from 'bootstrap';

//TODO
// Add blocking
// Add current state of player/enemy
// Add animations according to the state

//TODO Fix animation - (on state change, set the current.frame.x to the starting frame (editR)    &  fix ending if else statement)


// Add a starting menu (View 2)
// Add a Pause Menu (View 3)
// Add a character selection screen (View 4)
// Add 2 player and AI, leave multiplayer for later (on starting screen)
// launch demo
// Add music and noise
// Add changing backgrounds and different character color sets (on character selection screen)
// Add multiplayer lobbies
// Add loading screen (View 5?)


function App() {


  return (
    <div className="App">
      
      <button onClick={pauseScreen}>Start Game</button>
  
      

      
      
      
    
    </div>
  );
}


export default App;



//Setting the canvas to a variable 'c'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


// Canvas Size
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)





//how high ground is from the bottom
let groundHeight = 96

//Battle timer
let timer = 100

// Gravity 
const gravity = .6


// This multiplies all the sprites speed
const spriteSpeedIntensifier = 1

// This multiplies all the sprite's jump force
const jumpForce = .8

// This is the pause
let pause = true

let VsAI = false
let VsHuman = true

//Image Creator WIP

class Pic{
  constructor({position, name, imageSrc, height = canvas.height, width = canvas.width, scale = 1, framesMax = 1, currentFrame = 0,previousFrame = 0, framesElapsed = 0, framesHold = 10, direction = 'right', editR = 0, editL = 0}){
    this.position = position
    this.name = name
    this.editL = editL
    this.editR = editR
    this.direction = direction
    this.width = width
    this.height = height
    this.scale = scale
    this.framesMax = framesMax
    this.currentFrame = currentFrame
    this.previousFrame = previousFrame
    this.framesElapsed = framesElapsed
    this.framesHold = framesHold
    this.image = new Image()
    this.image.src = imageSrc
    this.image.onload = () => {
      this.update()
    }


  }

  draw() {
    //Find out how to draw
    if(this.image){
      
      
      c.drawImage(this.image,

        this.currentFrame.x * (this.image.width / this.framesMax.x),
        this.currentFrame.y * (this.image.height / this.framesMax.y),

        (this.image.width  / this.framesMax.x),
        (this.image.height / this.framesMax.y),


        this.position.x,
        this.position.y,

        (this.width / this.framesMax.x )* this.scale.x,
        (this.height / this.framesMax.y) * this.scale.y);
    }
  

  }
  update(){
      //This will run each frame
      this.draw()

      
      



      this.framesElapsed++
      // if(this.direction == 'left' && this.currentFrame.x < this.editR){
      //   this.currentFrame.x = this.editR
      // }


      if(this.previousFrame == this.currentFrame.y){

      }
      else{
        console.log("state change")
        if(this.direction == 'right'){
          this.currentFrame.x = 0
        }
        else if(this.direction == 'left'){
          this.currentFrame.x = 7
        }
        
      }
      if (this.framesElapsed % (this.framesHold/2) === 0){
        if(this.direction == 'left'){
          this.currentFrame.x --
          if ((this.currentFrame.x)  <= this.framesMax.x - this.editR){
            this.currentFrame.x = 0
            
          }
        }
        if(this.direction == 'right'){
          this.currentFrame.x ++
          if ((this.currentFrame.x)  >= this.framesMax.x - this.editL){
            this.currentFrame.x = 0
            
          }
        }
        
        
      }
      
  }

}

// making a new pic for the background
const background = new Pic({
  position:{
    x: 0,
    y: 0
  },
  imageSrc: bg, 
  width: canvas.width,
  height: canvas.height,
  scale:{
    x: 1,
    y: 1
  },
  framesMax:{
    x: 1,
    y: 1
  },
  currentFrame:{
    x: 0,
    y: 0
  }
})

const shop = new Pic({
  position:{
    x: 630,
    y: 79
  },
  imageSrc: s,
  width: 2000,
  
  height: 400,
  scale:{
    x: 1,
    y: 1
  },
  framesMax:{
    x: 6,
    y: 1
  },
  currentFrame:{
    x: 0,
    y: 0
  }
})


const playerRed = new Pic({
  position:{
    x: 100,
    y: 100
  },
  imageSrc: PR1, 
  width: 800,
  height: 800,
  scale:{
    x: 2,
    y: 2
  },
  framesMax:{
    x: 8,
    y: 11
  },
  currentFrame:{
    x: 0,
    y: 0
  },
  framesHold: 20,
  editR: 2,
  editL: 0
})
const playerBlue = new Pic({
  position:{
    x: 100,
    y: 100
  },
  imageSrc: red, 
  width: 800,
  height: 800,
  scale:{
    x: 2,
    y: 2
  },
  framesMax:{
    x: 8,
    y: 11
  },
  currentFrame:{
    x: 0,
    y: 0
  },
  framesHold: 10,
  editR: 2,
  editL: 0,
})

// Sprite Creator

class Sprite {
  constructor({position, velocity, speed, color = 'red', offset, name, height = 150, width = 50, state }){
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
    this.canCrouch = true
    this.alive = true
    this.score = 0
    this.isFalling = false
    this.isBlocking = false
    this.isStunned = false
    this.isCrouching = false
    this.maxVelocity = {
      x: 5,
      y: 20
    }
    this.state = state
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

      //Updating the sprite frame for frame
  update(){
    //console.log(this.velocity.y)
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
  
      if (this.position.y + this.height + this.velocity.y >= canvas.height-groundHeight){
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

  status(){

    
    let state = ['idle','normal attack','critical attack', 'jumping up', 'falling down', 'sliding down wall', 'knocked', 'blocking', 'crouching', 'stunned', 'dying', 'running']


    if(player.velocity.x > 0){
      playerRed.image.src = PR1
      playerRed.direction = 'left'
      
    }
    if(player.velocity.x < 0){
      playerRed.image.src = PL1
      playerRed.direction = 'right'
      
      
    }

    
    if(!this.alive){
      this.state = 'dying'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        playerRed.currentFrame.y = 6
        playerRed.editR = 0
        playerRed.framesHold = 10
        
      }
      if(this == enemy){
        playerBlue.currentFrame.y = 6
        playerBlue.editR = 0
        playerBlue.framesHold = 10
      }
    }
    else if(this.isAttacking && this.isFalling){
      this.state = 'critAttk'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        
      }
      if(this == enemy){

      }
    }
    else if(this.isAttacking){
      this.state = 'normAttk'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        playerRed.currentFrame.y = 1
        playerRed.editR = 2
        playerRed.framesHold = 3
        
      }
      if(this == enemy){
        playerBlue.currentFrame.y = 1
        playerBlue.editR = 2
        playerBlue.framesHold = 3
      }
    }
    else if(this.isStunned){
      this.state = 'knocked'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        playerRed.currentFrame.y = 5
        playerRed.editR = 5
        playerRed.framesHold = 10
        
      }
      if(this == enemy){
        playerBlue.currentFrame.y = 5
        playerBlue.editR = 5
        playerBlue.framesHold = 10
      }
    }
    else if (this.position.x >= canvas.width && this.isFalling){
      this.state = 'slidingRight'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        
      }
      if(this == enemy){

      }
    }
    else if (this.position.x <= 0 && this.isFalling){
      this.state = 'slidingLeft'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        
      }
      if(this == enemy){

      }
    }
    else if(this.isFalling){
      this.state = 'falling down'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        playerRed.currentFrame.y = 4
        playerRed.editR = 0
        playerRed.framesHold = 8
        
      }
      if(this == enemy){
        playerBlue.currentFrame.y = 4
        playerBlue.editR = 0
        playerBlue.framesHold = 8
      }
    }
    else if(this.velocity.y < 0){
      this.state = 'jumping up'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        playerRed.currentFrame.y = 3
        playerRed.editR = 2
        playerRed.framesHold = 8
        
      }
      if(this == enemy){
        playerBlue.currentFrame.y = 3
        playerBlue.editR = 2
        playerBlue.framesHold = 8
      }
    }
    else if(this.isBlocking){
      this.state = 'blocking'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        playerRed.currentFrame.y = 10
        playerRed.editR = 5
        playerRed.framesHold = 10
        
      }
      if(this == enemy){
        playerBlue.currentFrame.y = 10
        playerBlue.editR = 5
        playerBlue.framesHold = 10
      }
    }
    else if (this.isCrouching){
      this.state = 'crouching'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        playerRed.currentFrame.y = 9
        playerRed.editR = 5
        playerRed.framesHold = 10
        
      }
      if(this == enemy){
        playerBlue.currentFrame.y = 9
        playerBlue.editR = 5
        playerBlue.framesHold = 10
      }
    }
    else if(this.velocity.x !== 0){
      this.state = 'running'
      playerRed.previousFrame = playerRed.currentFrame.y
      playerBlue.previousFrame = playerBlue.currentFrame.y
      if (this == player){
        playerRed.currentFrame.y = 2
        playerRed.editR = 0
        playerRed.framesHold = 6
        
      }
      if(this == enemy){
        playerBlue.currentFrame.y = 2
        playerBlue.editR = 0
        playerBlue.framesHold = 6
      }
    }
    else if(this.velocity.x == 0 && this.velocity.y == 0 && player.alive){
        this.state = 'idle'
        playerRed.previousFrame = playerRed.currentFrame.y
        playerBlue.previousFrame = playerBlue.currentFrame.y
        if (this == player){
          playerRed.currentFrame.y = 0
          
          playerRed.framesHold = 10
          if(playerRed.direction == 'left'){
            playerRed.editR = 2
            playerRed.editL = 0
            
          }
          if(playerRed.direction == 'right'){
            playerRed.editL = 2
            playerRed.editR = 0
            

          }
        }
        if(this == enemy){
          playerBlue.currentFrame.y = 0
          playerBlue.editR = 2
          playerBlue.framesHold = 10
        }
      }
    
      //console.log(this.state)

  }
    //attack lasts .1 seconds
    attack() {
      
      this.isAttacking = true
      this.canAttack = false
      setTimeout(() => {
        this.isAttacking = false
      }, 300)
    }

    // Stunned

    stun(time){
      this.isStunned = true
      let preset = this.lastKey
      this.lastKey = ''
      setTimeout(() => {
        this.isStunned = false
        this.lastKey = preset
      }, time)
    }

    //Implements knockback under certain conditions
    knockback(){
      
      console.log(this.name)
        let i=1
        if (this.name == "player"){
          i = 1
        }
        if (this.name == "enemy"){
          i = -1
        }
        if(player.position.x+player.width < enemy.position.x){
          this.velocity.y = -10
          this.velocity.x = -20*i
          this.canJump = false
          this.stun(500)
        }
        if(player.position.x > enemy.position.x+enemy.width){
          this.velocity.y = -10
          this.velocity.x = 20*i
          this.canJump = false
          this.stun(500)
        }
      }
    





}


// Making a new player
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



// for reference
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



// Checking if certain kyes are currently pressed

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


//Adding friction when on ground
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


//detects if 2 differnt rectangles are colliding. (attackbox rectangles)

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
  if(pause){
    //Global functions
    friction()
  


    
    //draw functions
    
    c.fillStyle = 'black'
    c.fillRect(0,0, canvas.width, canvas.height)
    background.update()
    
    shop.update()
    player.update()
    enemy.update()
    playerRed.update()
    playerRed.position.x = player.position.x-70
    playerRed.position.y = player.position.y
    playerBlue.update()
    playerBlue.position.x = enemy.position.x-70
    playerBlue.position.y = enemy.position.y
    
    
    playerBar.draw()
    enemyBar.draw()
    player.status()
    enemy.status()
    

    

    //player.velocity.x = 0;
    //enemy.velocity.x = 0;
    
    
   //checking if player is falling
    if(player.velocity.y  <= 0){
      player.isFalling = false
    }
    else{
      player.isFalling = true
    }

    //checking if enemy is falling
    if(enemy.velocity.y  <= 0){
      enemy.isFalling = false
    }
    else{
      enemy.isFalling = true
    }
    

    //Setting position and velocity boundaries for player
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

    //Setting position and velocity boundaries for enemy
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


    // detect for collisions

    //player attack
    if(
      rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&player.isAttacking)
        {
      player.isAttacking = false
      console.log("player attack sucessful")
      if(enemy.canAttack){
        if (enemy.position.x < canvas.width-(enemy.width*2) && enemy.position.x > enemy.width){
          if(enemy.isBlocking){
            player.knockback()
          }
          else{
            enemy.knockback()
          }
          
        }
        else{
          if(enemy.isBlocking){
            player.stun(400)
          }
        }
      }
      
      if (enemyBar.width >= pEnemyWidth-1){
        if (player.isFalling){
          enemyBar.width -= pEnemyWidth
          enemyBar.position.x += pEnemyWidth
        }
        enemyBar.width -= pEnemyWidth
        enemyBar.position.x += pEnemyWidth
        
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

    //enemy attack
    if(rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) && enemy.isAttacking)
      {
      enemy.isAttacking = false
      console.log("enemy attack sucessful")
      if (player.canJump){
        if (player.position.x < canvas.width-(player.width*2) && player.position.x > player.width){
          if(player.isBlocking){
            enemy.knockback()
          }
          else{
            player.knockback()
          }
          
        }
        else{
          console.log("to close to wall")
          if(player.isBlocking){
            enemy.stun(400)
          }
        }
        
        
      }
      
      if (playerBar.width >= pBarWidth-1){ 
        if(enemy.isFalling){
          playerBar.width -= pBarWidth
        }
        playerBar.width -= pBarWidth
        
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

  }
  //vsAI()



}

// Starting the simulation
if (pause) {
animate()
vsAI()
} else {}

//Setting the hp bars and how much damage they can take
const pBarWidth = playerBar.width*.1
const pEnemyWidth = enemyBar.width*.1

let rpBarWidth = playerBar.width
let reBarWidth = enemyBar.width


// Restarts on 'space'
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

  // Timer for game
function startTimer(){
  //console.log("tick")
  enemy.canAttack = true
  player.canAttack = true
  // player.maxVelocity = 5
  // enemy.maxVelocity = 5
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

  
  


  






function pauseScreen(){
  if (pause){
    pause = false
  }
  else{
    pause = true
  }
}





// Checking for keydown events
window.addEventListener('keydown', (event) => {

  
  switch (event.key){
    // This is the pause

    case 'Escape':
      console.log('hit esc')
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
      case 'p':
        console.log(playerRed)
        console.log(playerRed.currentFrame)
        console.log(pause)
      break
  }
  if (pause){
    if(player.alive && !player.isStunned){
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
      if(player.canJump && !player.isBlocking){
        player.velocity.y = (-20 * jumpForce)
        player.canJump = false
      }
      
      break
    case 's':
      
      if (player.canCrouch){
        player.isCrouching = true
        player.canCrouch = false
      }
      
      
      break
      case 'f':
        
        if (player.canAttack && !player.isBlocking){
          player.attack()
        }
      break
      case 'g':
        
        if(player.canJump){
          player.color = 'darkred'
          player.isBlocking = true
        }
      break

  }
    }
    if(enemy.alive && !enemy.isStunned){
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
          
          if (enemy.canCrouch){
            enemy.isCrouching = true
            enemy.canCrouch = false
          }
          
        break
        case 'm':
          
          if (enemy.canAttack && !enemy.isBlocking){
            enemy.attack()
          }
        break
        case 'n':
          
          if(enemy.canJump){
            enemy.color = 'darkblue'
            enemy.isBlocking = true
          }
        break
      }
    }
  

  // Debug - Logging out which key went down
  console.log(event.key)
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
    case 's':
        player.isCrouching = false
        player.canCrouch = true
      
      
      
      break
      case 'f':
        
      break
      case 'g':
          player.color = 'red'
          player.isBlocking = false
      break
  }



     
      switch (event.key){
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
      enemy.isCrouching = false
        enemy.canCrouch = true

      
          
    break
    case 'm':
      
    break
    case 'n':
      enemy.color = 'blue'
      enemy.isBlocking = false
    break
      
     }

    
  

  // Debug - Logging out which key went up
  //console.log(event.key + " keyup")

})



//WIP vs AI  (currently too powerful) VsAi and VsHuman added, start screen functionality needed to work.
function vsAI () {
  if (VsAI) {
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
      if (enemy.position.y > player.position.y +100) {
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
  } else if (VsHuman) {
    //player and enemy controls needed to be imported here
  }
  



}


  


