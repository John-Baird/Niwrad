
import './App.css';


import React, { useState } from "react";

import bg from './img/background.png'

import s from './img/shop.png'

import PL1 from './img/purple/PL1.png'

import PR1 from './img/purple/PR1.png'

import BL1 from './img/blue/BL1.png'

import BR1 from './img/blue/BR1.png'

import GL1 from './img/green/GL1.png'

import GR1 from './img/green/GR1.png'

import RL1 from './img/red/RL1.png'

import RR1 from './img/red/RR1.png'

import { Button } from 'bootstrap';

let P1RightColor = PR1
let P1LeftColor = PL1

let P2RightColor = GR1
let P2LeftColor = GL1

let BackgroundVar = bg
let ShopVar = s

//TODO


//TODO Fix animation - (on state change, set the current.frame.x to the starting frame (editR)    &  fix ending if else statement)
// state change - correct direction on knockback hit - attack stopping short on hit


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
  const [custom, setCustom] = useState("");
  const customToggle = () => {
    setCustom(!custom);
    
    
  };
  
  const [howto, setHowto] = useState("");
  const howtoToggle = () => {
    setHowto(!howto);
    
    
  };
  const [isActive, setActive] = useState("");
  const handleToggle = () => {
    setActive(!isActive);
    console.log(isActive)
    
  };
  const [open, setOpen] = useState("");
  const openToggle = () => {
    setOpen(!open);
    
    
  };
  const [settings, setSett] = useState("");
  const settToggle = () => {
    setSett(!settings);
    
    
  };
  const [pause, setPause] = useState("");
  const pauseToggle = () => {
    setPause(!pause);
    
    
  };
  window.addEventListener('keyup', (event) => {

    switch (event.key){
      // This is the pause
  
      case 'Escape':
        
        pauseToggle()
       
       break
    }
  })
  return (
    <div className="App">
onClick={event => {}}

<div className={custom ? '' : 'hide'}>
        <div className='custom'>
      <div className="option">
        <div className='coll'>
            <p>Player 1 Color</p>
            <p onClick={event => {
              P1RightColor = RR1
              P1LeftColor = RL1
              }} className='red'>Red</p>
            <p onClick={event => {
              P1RightColor = BR1
              P1LeftColor = BL1
              }}className='blue'>Blue</p>
            <p onClick={event => {
              P1RightColor = PR1
              P1LeftColor = PL1
              }} className='purple'>Purple</p>
            <p onClick={event => {
              P1RightColor = GR1
              P1LeftColor = GL1
              }}className='green'>Green</p>
            </div>
        </div>
        <div className="option">
        <div className='coll'>
        <p>Player 2 Color</p>
            <p onClick={event => {
              P2RightColor = RR1
              P2LeftColor = RL1
              }} className='red'>Red</p>
            <p onClick={event => {
              P2RightColor = BR1
              P2LeftColor = BL1
              }}className='blue'>Blue</p>
            <p onClick={event => {
              P2RightColor = PR1
              P2LeftColor = PL1
              }} className='purple'>Purple</p>
            <p onClick={event => {
              P2RightColor = GR1
              P2LeftColor = GL1
              }}className='green'>Green</p>
            </div>
        </div>
        <p className='option' onClick={event => {
          customToggle();
        }}>Go Back</p>
            </div>

      </div>





<div className={howto ? '' : 'hide'}>
        <div className='howto'>
      <p>Player 1 - 🤸Arrow Keys   🗡️F   🛡️G</p>
      <p>Player 2 - 🤸WASD   🗡️M   🛡️N</p>

        <div className='option'>
              <p onClick={event => {
          howtoToggle();
        }}>Go Back</p>
            </div>
          </div>
      </div>


      <div className={pause ? '' : 'hide'}>
        <div className='pause'>
      <div className="option">
            <p onClick={event => {
          pauseToggle();
          pauseScreen();
        }}>Resume</p>
        </div>
        <div className="option">
            <p
            onClick={event => {
              
              pauseToggle();
              
              handleToggle();
            }}>Quit</p>
        </div>

        <div className="option">
            <p onClick={event => {
          howtoToggle();
        }}>How to play</p>
        </div>

          </div>
      </div>



      <div className={settings ? '' : 'hide'}>
        <div className='settings'>
      <div className="option">
            <p onClick={event => {
          customToggle();
        }}>Character Customization</p>
        </div>
        <div className="option">
            <p onClick={event => {
          howtoToggle();
        }}>How to Play</p>
        </div>

        <div className="option">
            <p>World Customization</p>
        </div>

        <div className='option'>
              <p onClick={event => {
          settToggle();
        }}>Go Back</p>
            </div>
          </div>
      </div>




      <div className={open ? '' : 'hide'}>
        <div className='comingSoon'>
            <div>
              <p>Coming Soon!</p>
            </div>
            <div className='option'>
              <p onClick={event => {
          openToggle();
        }}>Go Back</p>
            </div>
          </div>
      </div>
      {/* <button onClick={pauseScreen}>Start Game</button> */}
      <div id='bruh' className={isActive ? 'hide' : ''}>

        
        <div className="clasy">
          
          <div className="option">
            <p  onClick={event => {
          handleToggle();
          pauseScreen();
          restart();
        }}> 2 Player</p>
          </div>
          <div className="option">
            <p onClick={event => {
          handleToggle();
          pauseScreen();
          restart();
          VsAI = true
        }}>Vs AI</p>
          </div>
          <div>
            <p className="option" onClick={event => {
          openToggle();
        }}>
              Online
            </p>
          </div>
          <div className="option">
            <p onClick={event => {
          settToggle();
        }}>Settings</p>
        </div>
        </div>
        
        </div>
        
      
      
    
    </div>
  )
}


export default App;

window.onload = (event) => {
  document.getElementById('bruh').classList.remove('hide')
 
};




//Setting the canvas to a variable 'c'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


// Canvas Size
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)


let FirstLoad = true


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
let VsHuman =  true

//Image Creator WIP

class Pic{
  constructor({position, name, imageSrc, height = canvas.height, width = canvas.width, scale = 1, framesMax = 1, currentFrame = 0,previousFrame = 0, framesElapsed = 0, framesHold = 10, direction = 'right', editR = 7, editL = 0}){
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
        this.currentFrame.y * (this.image.height / this.framesMax.y)+5+5,

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
      // if(this.direction === 'left' && this.currentFrame.x < this.editR){
      //   this.currentFrame.x = this.editR
      // }
      // console.log("prev")
      // console.log(player2.previousFrame)
      // console.log("current")
      // console.log(player2.currentFrame.y)

      if(this.previousFrame === this.currentFrame.y){
        if(this === player1){
          
        }
      }
      else{
        if(this === player1){
          // console.log("state change")
        }
        
        if(this.direction === 'right'){
          this.currentFrame.x = 0
        }
        else if(this.direction === 'left'){
          this.currentFrame.x = 7
        }
        
      }
      if(this.previousFrame === this.currentFrame.y){
        if(this === player2){
          
        }
      }
      else{
        if(this === player2){
          // console.log("state change")
        }
        
        if(this.direction === 'right'){
          this.currentFrame.x = 0
        }
        else if(this.direction === 'left'){
          this.currentFrame.x = 7
        }
        
      }
      if (this.framesElapsed % (this.framesHold) === 0){


        if(this === player1){
          if(player.state === 'blocking'){
            if(this.direction === 'left'){
              this.currentFrame.x --
              if ((this.currentFrame.x)  <= this.editL){
                this.currentFrame.x = 6
              }
              
            }
            if(this.direction === 'right'){
              this.currentFrame.x ++
              if ((this.currentFrame.x)  >= this.framesMax.x - this.editR){
                this.currentFrame.x = 1
              }
            }
          }
          else if(player.state === 'dying'){
            if(this.direction === 'left'){
              this.currentFrame.x --
              if ((this.currentFrame.x)  <= this.editL){
                this.currentFrame.x = 5
                restart()
              }
              
            }
            if(this.direction === 'right'){
              this.currentFrame.x ++
              if ((this.currentFrame.x)  >= this.framesMax.x - this.editR){
                this.currentFrame.x = 4
                restart()
              }
            }
          }
          else{
            if(this.direction === 'left'){
              this.currentFrame.x --
              if ((this.currentFrame.x)  <= this.editL){
                this.currentFrame.x = 7
              }
            }
            if(this.direction === 'right'){
              this.currentFrame.x ++
              if ((this.currentFrame.x)  >= this.framesMax.x - this.editR){
                this.currentFrame.x = 0
              }
            }
          }
          }
          
          if(this === player2){
            if(enemy.state === 'blocking'){
              if(this.direction === 'left'){
                this.currentFrame.x --
                if ((this.currentFrame.x)  <= this.editL){
                  this.currentFrame.x = 6
                }
                
              }
              if(this.direction === 'right'){
                this.currentFrame.x ++
                if ((this.currentFrame.x)  >= this.framesMax.x - this.editR){
                  this.currentFrame.x = 1
                }
              }
            }
            else if(enemy.state === 'dying'){
              if(this.direction === 'left'){
                this.currentFrame.x --
                if ((this.currentFrame.x)  <= this.editL){
                  this.currentFrame.x = 5
                  restart()
                }
                
              }
              
              if(this.direction === 'right'){
                this.currentFrame.x ++
                if ((this.currentFrame.x)  >= this.framesMax.x - this.editR){
                  this.currentFrame.x = 4
                  restart()
                }
              }
            }
            else{
              if(this.direction === 'left'){
                this.currentFrame.x --
                if ((this.currentFrame.x)  <= this.editL){
                  this.currentFrame.x = 7
                }
              }
              if(this.direction === 'right'){
                this.currentFrame.x ++
                if ((this.currentFrame.x)  >= this.framesMax.x - this.editR){
                  this.currentFrame.x = 0
                }
              }
            }
          }
          if(this === background){
            if(this.direction === 'left'){
              this.currentFrame.x --
              if ((this.currentFrame.x)  <= this.editL){
                this.currentFrame.x = 7
              }
            }
            if(this.direction === 'right'){
              this.currentFrame.x ++
              if ((this.currentFrame.x)  >= this.framesMax.x - this.editR){
                this.currentFrame.x = 0
              }
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
  imageSrc: BackgroundVar, 
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
    y: 90

  },
  imageSrc: ShopVar,
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


const player1 = new Pic({
  position:{
    x: 100,
    y: 100
  },
  imageSrc:P1RightColor, 
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
const player2 = new Pic({
  position:{
    x: 100,
    y: 100
  },
  imageSrc: P2RightColor, 
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
  constructor({position, velocity, speed, color = 'red', offset, name, height = 100, width = 50, state,attka }){
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
    this.attka = attka
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
      this.attackBox.position.y = this.position.y + this.attackBox.offset.y
  
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
        // console.log(this.name +" is out of bounds right")
        this.canMoveRight = false
        this.velocity.x = 0
      }
      else{
        this.canMoveRight = true
      }
      if (this.position.x <= 0){
        // console.log(this.name +" is out of bounds left")
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
      player1.image.src =P1RightColor
      player1.direction = 'right' 
    }
    if(player.velocity.x < 0){
      player1.image.src = P1LeftColor
      player1.direction = 'left'
    }
    if(enemy.velocity.x > 0){
      player2.image.src =P2RightColor
      player2.direction = 'right' 
    }
    if(enemy.velocity.x < 0){
      player2.image.src = P2LeftColor
      player2.direction = 'left'
    }
    if(player1.previousFrame !== player1.currentFrame.y){
      if(this.direction === 'right'){
        this.currentFrame.x = 0
      }
      else if(this.direction === 'left'){
        this.currentFrame.x = 7
      }
    }
    
    else{
    
    if(!this.alive){
      this.state = 'dying'
      
      if (this === player){
        player1.currentFrame.y = 6
        player1.editR = 0
        player1.framesHold = 10
        
      }
      if(this === enemy){
        player2.currentFrame.y = 6
        player2.editR = 0
        player2.framesHold = 10
      }
    }
    else if(this.isAttacking && this.isFalling){
      this.state = 'critAttk'
      
      if (this === player){
        
      }
      if(this === enemy){

      }
    }
    else if(this.attka){
      this.state = 'normAttk'
      
      if (this === player){
        player1.currentFrame.y = 1
        player1.editR = 2
        player1.framesHold = 3
        
      }
      if(this === enemy){
        player2.currentFrame.y = 1
        player2.editR = 2
        player2.framesHold = 3
      }
    }
    else if(this.isStunned){
      this.state = 'knocked'
      
      if (this === player){
        player1.currentFrame.y = 5
        player1.framesHold = 10
        if(player1.direction === 'left'){
          player1.editR = 0
          player1.editL = 5
         
        }
        if(player1.direction === 'right'){
          player1.editR = 5
          player1.editL = 0
          

        }
      }
      if(this === enemy){
        player2.currentFrame.y = 5
        player2.framesHold = 10
        if(player1.direction === 'left'){
          player1.editR = 0
          player1.editL = 5 
        }
        if(player1.direction === 'right'){
          player1.editL = 0
          player1.editR = 5
        }
      }
    }
    else if (this.position.x >= canvas.width && this.isFalling){
      this.state = 'slidingRight'
      
      if (this === player){
        
      }
      if(this === enemy){

      }
    }
    else if (this.position.x <= 0 && this.isFalling){
      this.state = 'slidingLeft'
      
      if (this === player){
        
      }
      if(this === enemy){

      }
    }
    else if(this.isFalling){
      this.state = 'falling down'
      
      if (this === player){
        player1.currentFrame.y = 4
        player1.editR = 0
        player1.framesHold = 8
        
      }
      if(this === enemy){
        player2.currentFrame.y = 4
        player2.editR = 0
        player2.framesHold = 8
      }
    }
    else if(this.velocity.y < 0){
      this.state = 'jumping up'
      
      if (this === player){
        player1.currentFrame.y = 3
        player1.framesHold = 8
        if(player1.direction === 'left'){
          player1.editR = 0
          player1.editL = 2
          
        }
        if(player1.direction === 'right'){
          player1.editR = 2
          player1.editL = 0
          

        }
      }
      if(this === enemy){
        player2.currentFrame.y = 3
        player2.framesHold = 8
        if(player2.direction === 'left'){
          player2.editR = 0
          player2.editL = 2  
        }
        if(player2.direction === 'right'){
          player2.editL = 0
          player2.editR = 2
        }
      }
    }
    else if(this.isBlocking){
      this.state = 'blocking'
      
      if (this === player){
        player1.currentFrame.y = 10
        player1.framesHold = 10
        if(player1.direction === 'left'){
          player1.editR = 0
          player1.editL = 4
          
        }
        if(player1.direction === 'right'){
          player1.editR = 5
          player1.editL = 0
          

        }
      }
      if(this === enemy){
        player2.currentFrame.y = 10
        player2.framesHold = 10
        if(player2.direction === 'left'){
          player2.editR = 0
          player2.editL = 4
        }
        if(player2.direction === 'right'){
          player2.editL = 0
          player2.editR = 5
        }
      }
    }
    else if (this.isCrouching){
      this.state = 'crouching'
      
      if (this === player){
        player1.currentFrame.y = 9
        
        player1.framesHold = 10
        if(player1.direction === 'left'){
          player1.editR = 0
          player1.editL = 5
          
        }
        if(player1.direction === 'right'){
          player1.editR = 5
          player1.editL = 0
          

        }
      }
      if(this === enemy){
        player2.currentFrame.y = 9
        player2.framesHold = 10
        if(player2.direction === 'left'){
          player2.editR = 0
          player2.editL = 5  
        }
        if(player2.direction === 'right'){
          player2.editL = 0
          player2.editR = 5
        }
      }
    }
    else if(this.velocity.x !== 0){
      this.state = 'running'
      
      if (this === player){
        player1.currentFrame.y = 2
        player1.editR = 0
        player1.framesHold = 6
        
      }
      if(this === enemy){
        player2.currentFrame.y = 2
        player2.editR = 0
        player2.framesHold = 6
      }
    }
    else if(this.velocity.x === 0 && this.velocity.y === 0 && player.alive){
        this.state = 'idle'
        player1.previousFrame = player1.currentFrame.y
        player2.previousFrame = player2.currentFrame.y
        if (this === player){
          player1.currentFrame.y = 0
          
          player1.framesHold = 10
          if(player1.direction === 'left'){
            player1.editR = 0
            player1.editL = 2
            
          }
          if(player1.direction === 'right'){
            player1.editL = 0
            player1.editR = 2
            

          }
        }
        if(this === enemy){
          player2.currentFrame.y = 0
          player2.framesHold = 10
          if(player2.direction === 'left'){
            player2.editR = 0
            player2.editL = 2  
          }
          if(player2.direction === 'right'){
            player2.editL = 0
            player2.editR = 2
          }
        }
      }
    
      //console.log(this.state)

    }
    
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
        if (this.name === "player"){
          i = 1
        }
        if (this.name === "enemy"){
          i = -1
        }
        if(player.position.x+player.width > enemy.position.x){
          this.velocity.y = -10
          this.velocity.x = 20*i
          this.canJump = false
          this.stun(500)
        }
        if(player.position.x < enemy.position.x+enemy.width){
          this.velocity.y = -10
          this.velocity.x = -20*i
          this.canJump = false
          this.stun(500)
        }
      }
    





}


// Making a new player
const player = new Sprite({
  position:{
    x: 10,
    y: 100
  },
  velocity:{
    x: 0,
    y: 10
  },
  speed : 5,
  offset: {
    x: 0,
    y: 50
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



// Checking if certain keys are currently pressed

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
  player.attackBox.offset.y = 25
  enemy.attackBox.offset.y = 25

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
    player1.update()
    player1.position.x = player.position.x-70
    player1.position.y = player.position.y-38
    player2.update()
    player2.position.x = enemy.position.x-70
    player2.position.y = enemy.position.y-38

    
    player1.previousFrame = player1.currentFrame.y

    
    
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
        }
      }
      
    }

  }
  vsAI()

  if(FirstLoad){
    pauseScreen()
    FirstLoad = false
   }

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
    player.canAttack = true
    enemy.canAttack = true
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
     pauseScreen()
     
     break
      
    case ' ':
        if (pause){

          restart()
        }
      break
      //DEBUG//
      case 'p':
        console.log(player1)
        console.log(player1.currentFrame)
        console.log(pause)
      break
      //DEBUG//
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
        const wait = Math.random() * (1000 - 100) + 100;
      if (enemy.position.x < player.position.x) {
        setTimeout(() => {
          keys.ArrowRight.pressed = true
          enemy.lastKey = 'ArrowRight'
          enemy.attackBox.offset.x = 0
        } ,wait)
      } else {
        keys.ArrowRight.pressed = false
        enemy.lastKey = 'ArrowLeft'
      }
      if (enemy.position.x > player.position.x) {
        setTimeout(() => {
          keys.ArrowLeft.pressed = true
          enemy.lastKey = 'ArrowLeft'
          enemy.attackBox.offset.x = -50
        } ,wait)
      } else {
        keys.ArrowLeft.pressed = false
        enemy.lastKey = 'ArrowRight'
      }
      if (enemy.position.y > player.position.y) {
        if(enemy.canJump){
          enemy.velocity.y = (-20 * jumpForce)
          enemy.canJump = false
          setTimeout(() => {
            enemy.velocity.y = (-20 * jumpForce)
            enemy.canJump = false
          } ,wait)
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
