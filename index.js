const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 1000

class Player{
	constructor({x,y,image}){
		this.position = {
			x,
			y
		}
		this.velocity = {
			x:0,
			y:0
		}
		
		this.image = image
		this.width = 100
		this.height = 100 

	}

	draw(){
		//c.fillRect(this.position.x,this.position.y, this.width,this.height)
		c.drawImage(this.image, this.position.x, this.position.y)
	}
	update(){
		 this.draw()
	   this.position.x += this.velocity.x
	}
}




class Invader{
	constructor({x,y,image}){
		this.position = {
			x,
			y
		}
		this.velocity = {
			x:0,
			y:0
		}

		this.image = image
		this.width = 45
		this.height = 42 

	}

	draw(){
		//c.fillRect(this.position.x,this.position.y, this.width,this.height)
		c.drawImage(this.image, this.position.x, this.position.y)
	}
	update({velocity}){
		 this.draw()
	   this.position.x += velocity.x
	   this.position.y += velocity.y
	}
}


class Proyectile{
	constructor({position,velocity}){
		this.position = position
		this.velocity = velocity
		this.radius = 3


	}

	draw(){
		c.beginPath()
		c.arc(this.position.x,this.position.y,this.radius,0,Math.PI * 2)
		c.fillStyle='red'
		c.fill()
		c.closePath()
	}

	update(){
		this.draw()
		this.position.y += this.velocity.y

	}
}


class Grid{
	constructor(){
		this.position = {
			x:0,
			y:0
		}

		this.velocity = {
			x:3,
			y:0
		}

		this.invaders = []

		const columns = 15
		const rows = 3

		this.width = columns * 55
		for(let x = 0; x < columns; x++){
			for(let y = 0; y < rows; y++){

			this.invaders.push(new Invader({
				x:x * 55,
				y:y * 55,
				image:createImage('./img/nivel_1.png')

			})
			)
		}
	}
}
	update(){
			this.position.x += this.velocity.x
			this.position.y += this.velocity.y
			this.velocity.y= 0

			if(this.position.x + this.width >= canvas.width || this.position.x <= 0){
				this.velocity.x = -this.velocity.x
				this.velocity.y = 20
			}
	}
}


function createImage(imageSrc){

  const image = new Image()
  image.src = imageSrc
  return image

}








const player = 
new Player({
		x:300,
		y:670,
		image:createImage('./img/idle.png')
	
})




const proyectile = []
const proyectile2 = []

const grids = [new Grid()]

function init(){
	grids = [new Grid()]
}

const keys = {
  a: {
    pressed:false
  },
  d:{
    pressed:false

  },
  space:{
  	pressed:false
  },
  arrowLeft:{
  	pressed:false
  },
  arrowRight:{
  	pressed:false
  },
  uno:{
  	pressed:false
  }
 }



let score = 0



function animate(){
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0,0, canvas.width,canvas.height)



  grids.forEach((Grid) =>{
  	Grid.update()
  	Grid.invaders.forEach( (Invader,i) =>{
  			Invader.update({velocity:Grid.velocity})

  			proyectile.forEach((Proyectile,j) =>{
  				if(
  					Proyectile.position.y - Proyectile.radius <= Invader.position.y + Invader.height &&
  					Proyectile.position.x + Proyectile.radius >= Invader.position.x && 
  					Proyectile.position.x - Proyectile.radius <= Invader.position.x + Invader.width&&
  					Proyectile.position.y + Proyectile.radius >= Invader.position.y){

  						setTimeout(() =>{
  							const invaerFound = Grid.invaders.find(
  								(invader3) => Invader === Invader
  					    )

  							const projectileFound = proyectile.find(
  								(projectile3) => Proyectile === Proyectile

  							)

  							if(invaerFound && projectileFound){
	  							Grid.invaders.splice(i,1)
	  							proyectile.splice(j,1)
	  							score += 1

	  						if(Grid.invaders.length>0){

	  							const firstInvader = Grid.invaders[0]
	  							const lastInvader = Grid.invaders[Grid.
	  							invaders.length -1 ]

	  							Grid.width =
	  							lastInvader.position.x -
	  							firstInvader.position.x +
	  							lastInvader.width

	  							Grid.position.x = firstInvader.position.x


	  						}
	  		
  							}
  						},0)
  				}
  			})




















  	})
  })

   proyectile.forEach((Proyectile,index) =>{
   	if(Proyectile.position.y + proyectile.height <= 0){
   		setTimeout(() =>{
   			proyectile.splice(index,1)
   		},0)
   		
   	}else{
   		Proyectile.update()
   	}
  	
  	 
  })




  player.update()




   if(keys.a.pressed && player.position.x >=0){
   	player.velocity.x = -7
   	player.image.src = './img/left.png'
  }
  else if(keys.d.pressed && player.position.x + player.width <= canvas.width){
  	player.velocity.x = 7
  	player.image.src = './img/right.png'
  }else{
  	player.velocity.x = 0
  	player.image.src = './img/idle.png'
  }



  	
  }






 




  animate()


   window.addEventListener('keydown', (event) =>{


    switch (event.key){
    case 'd':
    keys.d.pressed = true
    break
    case 'a':
    keys.a.pressed = true
    break
    case ' ':
    keys.space.pressed = true

    	setTimeout(()=>{
			proyectile.push(
    	new Proyectile({
					position:{
					x:player.position.x + 20,
					y:player.position.y
				 },
				 velocity:{
				 	x:0,
				 	y:-5
				 }
			})
   )
		},10)
    
    break





  }


})


window.addEventListener('keyup', (event) =>{

  switch (event.key){
    case 'd':
    keys.d.pressed = false
    break
    case 'a':
    keys.a.pressed = false
    break
    case ' ':
    keys.space.pressed = false
    break


   
  }

})





