var i = 63;
		var apple = 66;
		var direction = "right";
		var arrofbody = [i];
		var speed = 500;
		//creates random position for apple
		function getRndInteger(min, max) {
			return Math.floor(Math.random() * (max - min) ) + min;
		}
		//create pixels for snake to move
		function createBoxes(){
			
			for (var j = 0; j < 132; j++){
				document.getElementById("box").innerHTML+='<div class="bodypart white"></div>'
			}
			//head created
			document.getElementsByClassName("bodypart")[63].style.backgroundColor = "yellow";
			//head apple
			document.getElementsByClassName("bodypart")[66].style.backgroundColor = "blue";
		}createBoxes();
		//assigns the random pos to a apple
		function appleCreate(i){
			apple = getRndInteger(0,131);
			if(!arrofbody.includes(apple)){
				document.getElementsByClassName("bodypart")[apple].style.backgroundColor = "blue";
			}
			//if apple pos and snake head comes at same pos again generate a random pos of apple
			else{
				apple = getRndInteger(0,131);
				document.getElementsByClassName("bodypart")[apple].style.backgroundColor = "blue";
			}
			return apple
		}
		//main move function
		function move(id){
				var dir;
				temp = i;
				val = i;
				switch(id){
						case "left" : val=left(val);
									  dir = 2;
									  break;
						case "right" : val=right(val);
									   dir = -1;
									   break;
						case "up" : val=up(val);
									dir = 24;
									break;
						case "down" : val=down(val);
									  dir = -24;
									  break;
					}
				
				if(val==apple){
					arrofbody.push(temp)
					apple = appleCreate(val)
					if(speed>10){
						speed-=5;
					}
				}
				var len = arrofbody.length;
				i = val;
				arrofbody.unshift(val);
				document.getElementsByClassName("bodypart")[arrofbody[len]].style.backgroundColor = "white";
				arrofbody.pop();
				checkOver();
				for(var j=0;j<arrofbody.length;j++){
					document.getElementsByClassName("bodypart")[arrofbody[j]].style.backgroundColor = "red";
				}
				document.getElementsByClassName("bodypart")[arrofbody[0]].style.backgroundColor = "yellow";
				return speed;
		}
		//direction of snake right calls game over when crossed wall or provide pos of bodypart
		function left(i){
			if(i%12==0){
				showOver();
			}
			else{
				i-=1;
			}
			return i
		}
		//direction of snake right calls game over when crossed wall or provide pos of bodypart
		function right(i){
			if((i-11)%12==0){
				showOver();
			}
			else{
				i+=1;
			}
			return i
		}
		//direction of snake up calls game over when crossed wall or provide pos of bodypart
		function up(i){
			if(i>=0 && i<12){
				showOver();
			}
			else{
				i-=12;
			}
			return i
		}
		//direction of snake down calls game over when crossed wall or provide pos of bodypart
		function down(i){
			if(i>=120){
				showOver();
			}
			else{
				i+=12;
			}
			return i
		}
		//Controls by direction key event calling move on keydown
		document.addEventListener("keydown", function(event) {
		  event.preventDefault();
		  const key = event.key;
		  var temp = direction;
		  
		  switch (key) { 
		    case "ArrowLeft":
		      direction = "left";
		      break;
		    case "ArrowRight":
		      direction = "right";
		      break;
		    case "ArrowUp":
		      direction = "up";
		      break;
		    case "ArrowDown":
		      direction = "down";
		      break;
		  }
		  if(direction!=temp){
		  	move(direction)
		  }
		});
		//moving snake with decreasing time 
		(function variableInterval() {
			speed = move(direction);
			console.log(speed)
			ref = setTimeout(variableInterval, speed);
		})();
		//stop the snake when touched wall by terminating the interval
		function stop(){
			clearTimeout(ref)
		}
		//game over checking
		function checkOver(){
			var head = arrofbody[0];
			if(arrofbody.lastIndexOf(head)>0){
				showOver()		
			}
		}
		//display Game Over
		function showOver(){
			document.getElementById("box").innerHTML=`<div class='gm'><h2 class="gameover">Game Over</h2> <h3>Your final score is ${arrofbody.length}</h3><button id='reset'>Play Again</button></div>`
			document.getElementById('reset').addEventListener("click",()=>{
				location.reload()
			})
			stop()
		}
