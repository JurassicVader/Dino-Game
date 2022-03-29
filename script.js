var character = document.getElementById("character");
var block = document.getElementById("block");
var ground = document.getElementById("ground");
var startGameBlock = document.getElementById("startGame");
var gameOverBlock = document.getElementById("gameOver");
var cloud1 = document.getElementById("cloud1");
var cloud2 = document.getElementById("cloud2");
var cloud3 = document.getElementById("cloud3");
var notDead = true;
var gameActive = false;
var jumping = false;
var isCrouching = false;
var score = document.getElementById("score");
var scoreVal = 0;

function jump(evt) {
    if (jumping == false) {
        if(evt.keyCode == "32" || evt.keyCode == "38" || evt.keyCode == "87") {
            if(character.classList != "animateJump") {
                character.classList.add("animateJump");
                character.classList.remove("animateWalk");
                jumping = true;
            }
            setTimeout(function(){
                character.classList.remove("animateJump");
                character.classList.add("animateWalk");
                jumping = false;
            }, 600)
        }
    }
}

// Crouch as of now... Temporary
function crouch(evt) {
    if(isCrouching == false) {
        if(evt.keyCode == "83" || evt.keyCode == "40") {
            isCrouching = true;
            character.style.width = "54px";
            character.style.height = "28px";
            character.style.top = "172px";
            character.classList.add("animateCrouch");
            character.classList.remove("animateWalk");
            ground.style.marginTop = "134px";
            block.style.top = "134px";
        }
    }
    if (isCrouching == true) {
        setInterval(function(){
                isCrouching = false;
                character.style.width = "40px";
                character.style.height = "43px";
                character.style.top = "157px";
                ground.style.marginTop = "120px";
                block.style.top = "120px";
                character.classList.remove("animateCrouch");
                character.classList.add("animateWalk");
            }, 1000)
    }
}
/* My attempt at fixing crouching *** DOES NOT WORK ***

function action_crouch() {
    isCrouching = true;
    character.style.width = "54px";
    character.style.height = "28px";
    character.style.top = "172px";
    character.classList.add("animateCrouch");
    character.classList.remove("animateWalk");
    ground.style.marginTop = "134px";
    block.style.top = "134px";
}
function stand() {
    character.style.width = "40px";
    character.style.height = "43px";
    character.style.top = "157px";
    ground.style.marginTop = "120px";
    block.style.top = "120px";
    character.classList.remove("animateCrouch");
    character.classList.add("animateWalk");
}


function crouch(evt) {
    if(isCrouching == false ) {
        if(evt.keyCode == "83" || evt.keyCode == "40") {
            setInterval(function(){
                if(evt.keyCode == "83" || evt.keyCode == "40") {
                    action_crouch();
                }
            }, 10)
        }
    }
    isCrouching = false;
    stand();
}

*/

function startGame(evt) {
    //Spawns the block.
    if (gameActive == false) {
        gameActive = true;
        if(evt.keyCode == "32" || evt.keyCode == "38" || evt.keyCode == "87") {
            cloud1.style.display = "block";
            cloud2.style.display = "block";
            cloud3.style.display = "block";
            cloud1.style.animation = "cloud 15s infinite linear";
            cloud2.style.animation = "cloud 23s infinite linear";
            cloud3.style.animation = "cloud 8s infinite linear";
            startGameBlock.style.display = "none";
            spawnBlock(); 
            setInterval(function(){
                if(notDead == true) {
                    scoreVal ++;
                    score.innerHTML = "Score: " + scoreVal;
                }
            }, 10)
        }
    }   
}

function spawnBlock() {
    ground.style.marginTop = "120px";
    setCactus();
    /*setTimeout(function(){
        block.style.display = "none";
        ground.style.marginTop = "157px";
    }, 2000) */
}

function setCactus() {
    block.style.animation = "block 2s infinite linear";
    block.style.dislay = "block";
    block.style.width = "18px";
    block.style.height = "37px";
    block.style.backgroundImage = "url('images/cactusSmall.png')";
    ground.style.marginTop = "120px";
}

function setDinoDead() {
    character.style.animation = "none";
    character.style.width = "40px";
    character.style.height = "43px";
    character.style.backgroundImage = "url('images/dinoDead.png')";
    character.style.left = "20px";
    character.style.top = "157px";
}

var checkDead = setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft<60 && blockLeft>20 && characterTop>=110){
        block.style.animation = "none";
        notDead = false;
        setDinoDead();
        gameOverBlock.style.display = "block";
        ground.style.marginTop = "120px";
        block.style.top = "120px";
        score.style.width = "100px";
        score.style.marginTop = "-150px";
        score.style.marginLeft = "150px";
        score.innerHTML = "Final Score: " + scoreVal;
    }
},10)
window.addEventListener("keydown", startGame, false);
if (isCrouching == false) {
    window.addEventListener("keydown", jump, false);
}
if (jumping == false) {
    window.addEventListener("keydown", crouch, false);
}
//Event Listeners for "down arrow" or "S" - Action(Crouch)
//Event Listeners for "Up arrow" or "W" or "Spacebar" - Action(Jump)