//SETTING VARIABLES ===========================================
const attackBtnEl = document.getElementById('attack-btn');
const repairBtnEl = document.getElementById('repair-btn');
const defendBtnEl = document.getElementById('defend-btn');

const playerNameEl = document.getElementById('player-name');
const playerHealthBarEl = document.getElementById('player-health-bar');
const playerHealthNumberEl = document.getElementById('php');
const playerHealthMaxNumberEl = document.getElementById('total-php');

const enemyNameEl = document.getElementById('enemy-name');
const enemyHealthBarEl = document.getElementById('enemy-health-bar');
const enemyHealthNumberEl = document.getElementById('ehp');
const enemyHealthMaxNumberEl = document.getElementById('total-ehp');
//WILL AND BRYCE DEBUGGED THIS ^SHIT^ LETS FUGGEN GO

const gameLevel = document.getElementById('level');
const playLogs = document.getElementById('play-logs');


// UTILITY FUNCTIONS ===========================================
//FUNCTION TO GENERATE RANDOM NUMBER
function generateRandomNum(num1, num2){
    return Math.floor(Math.random() * num1) + num2
}

function initializeContent(player, enemy) {
    console.log("initializing content...");
    playerNameEl.textContent = player.name;
    playerNameEl.style.textTransform = 'uppercase'; //ADDED BY BRYCE/WILL
    playerNameEl.style.fontSize = '3rem'; //ADDED BY BRYCE/WILL
    playerNameEl.style.fontWeight = 'bold'; //ADDED BY BRYCE/WILL
    playerNameEl.style.fontFamily = "'Space Grotesk', sans-serif"; //ADDED BY BRYCE/WILL
    playerHealthBarEl.setAttribute('max', player.maxHp);
    playerHealthBarEl.setAttribute('value', player.currentHp);
    // playerHealthBarEl.style.backgroundColor = 'black'; -- > was trying to change the background color of the health bars.. can someone advise
    playerHealthNumberEl.textContent = player.currentHp;
    playerHealthMaxNumberEl.textContent = player.maxHp;

    enemyNameEl.textContent = enemy.name;
    enemyNameEl.style.fontFamily = "'Space Grotesk', sans-serif"; //ADDED BY BRYCE/WILL
    enemyNameEl.style.textTransform = 'uppercase'; //ADDED BY BRYCE/WILL
    enemyNameEl.style.fontSize = '3rem'; //ADDED BY BRYCE/WILL
    enemyNameEl.style.fontWeight = 'bold'; //ADDED BY BRYCE/WILL
    enemyHealthBarEl.setAttribute('max', enemy.maxHp);
    enemyHealthBarEl.setAttribute('value', enemy.currentHp);
    enemyHealthNumberEl.textContent = enemy.currentHp;
    enemyHealthMaxNumberEl.textContent = enemy.maxHp;
}

// SPACESHIP CLASS =========================================================
class Spaceship {
    constructor(name, hpStart, accuracy, dmg, level, hpAdded) {
        this.name = name;
        this.hpStart = hpStart; 
        this.dmg = dmg; 
        this.accuracy = accuracy; 
        this.level = level;
        this.hpAdded = hpAdded;
        this.currentHp = hpStart + hpAdded;
        this.maxHp = hpStart + hpAdded;
    }
    attack(target) {
        // enable buttons
        attackBtnEl.disabled = false;
        repairBtnEl.disabled = false;

        const randomNum = generateRandomNum(10, 1);          
        // DANNY ADDITION: probability to randomNum, pull in accuracy property value so that as accuracy increase, chances of miss decreases
        if (randomNum <= this.accuracy) {
            target.currentHp -= this.dmg;                
            playLogs.innerHTML = `${this.name} attacked ${target.name} for ${this.dmg} damage!`;
            playLogs.style.fontSize = '3rem'; //ADDED BY BRYCE/WILL
            playLogs.style.textTransform = 'uppercase'; //ADDED BY BRYCE/WILL
            playLogs.style.fontWeight = 'bold'; //ADDED BY BRYCE/WILL
            playLogs.style.fontFamily = "'Space Grotesk', sans-serif"; //ADDED BY BRYCE/WILL
            console.log(`${this.name} attacked ${target.name} for ${this.dmg} damage!`);                
        } else {
            playLogs.innerHTML = `${this.name} missed!`;
            playLogs.style.fontSize = '3rem'; //ADDED BY BRYCE/WILL
            playLogs.style.textTransform = 'uppercase'; //ADDED BY BRYCE/WILL
            playLogs.style.fontWeight = 'bold'; //ADDED BY BRYCE/WILL
            playLogs.style.fontFamily = "'Space Grotesk', sans-serif"; //ADDED BY BRYCE/WILL
            console.log(`${this.name} missed!`);
        }                          
    }    
    levelUp() {
        this.level++;
        // this.currentHp = 100;
        // this.dmg += 0;
        // this.accuracy += 0;
        console.log(`${this.name} leveled up to level ${this.level}!`);
    }

    updateMaxHp(damage) {
        this.maxHp = this.hpStart + this.hpAdded;
    }
}

// PLAYER SUBCLASS ========================================================
class Player extends Spaceship {
    constructor(name, hpStart, accuracy, dmg, level, hpAdded) {
        super(name, hpStart, accuracy, dmg, level, hpAdded)        
    }
    repair(target) {         
        const maxHealth = this.hpStart + this.hpAdded;
        if(this.currentHp >= maxHealth) {
            document.querySelector("#repair-btn").disabled = true;
            playLogs.innerHTML = "You're at full health!";
            playLogs.style.fontSize = '3rem'; //ADDED BY BRYCE/WILL
            playLogs.style.textTransform = 'uppercase'; //ADDED BY BRYCE/WILL
            playLogs.style.fontWeight = 'bold'; //ADDED BY BRYCE/WILL
            playLogs.style.fontFamily = "'Space Grotesk', sans-serif"; //ADDED BY BRYCE/WILL
            console.log("You're at full health!");
        } else {
            //heal 10-20% of health
            const addedHealth = generateRandomNum(20, 10); // DANNY ADDITION
            if ((this.currentHp + addedHealth) >= maxHealth) { // DANNY ADDITION
                this.currentHp = maxHealth; // DANNY ADDITION
            } else {
                this.currentHp += addedHealth;
            }
            playLogs.innerHTML = `${this.name} healed and is now at ${this.currentHp} HP!`;
            playLogs.style.fontSize = '3rem'; //ADDED BY BRYCE/WILL
            playLogs.style.textTransform = 'uppercase'; //ADDED BY BRYCE/WILL
            playLogs.style.fontWeight = 'bold'; //ADDED BY BRYCE/WILL
            playLogs.style.fontFamily = "'Space Grotesk', sans-serif"; //ADDED BY BRYCE/WILL         
        }      
        initializeContent(this, target);                                  
    }

    defend(target) {
    //deflects 10-20% of enemy attack dmg
        setTimeout(() => {
            let damage = target.dmg; // DANNY ADDITION
            let defense = generateRandomNum(20, 10); // DANNY ADDITION
            if (damage <= defense) { // DANNY ADDITION
            playLogs.innerHTML = `${this.name} defended the attack!`; // DANNY ADDITION
            playLogs.style.fontSize = '3rem';
            playLogs.style.textTransform = 'uppercase'; //ADDED BY BRYCE/WILL
            playLogs.style.fontWeight = 'bold'; //ADDED BY BRYCE/WILL
            playLogs.style.fontFamily = "'Space Grotesk', sans-serif"; //ADDED BY BRYCE/WILL
            console.log(`${this.name} defended the attack!`);
            } else {
            this.currentHp -= (damage - defense);
            playLogs.innerHTML = `${this.name} defended the attack but took ${damage - defense} damage!`;
            playLogs.style.fontSize = '3rem'; //ADDED BY BRYCE/WILL
            playLogs.style.textTransform = 'uppercase'; //ADDED BY BRYCE/WILL
            playLogs.style.fontWeight = 'bold'; //ADDED BY BRYCE/WILL
            playLogs.style.fontFamily = "'Space Grotesk', sans-serif"; //ADDED BY BRYCE/WILL
            console.log(`${this.name} defended the attack but took ${damage - defense} damage!`);
            }
        }, 500);
        }
}

// ENEMY SUBCLASS EXTENDING SPACESHIP
class Enemy extends Spaceship {
    constructor(name, hpStart, accuracy, dmg, level, hpAdded)  {
        super(name, hpStart, accuracy, dmg, level, hpAdded);        
    }
}


//PLAYER/ENEMY OBJECTS ===========================================
const player1 = new Player('Player 1', 100, 7, 5, 1, 0);

const enemy1 = new Enemy("Starshredder", 100, 7, 5, 1, 0);
const enemy2 = new Enemy("Nebula Scourge", 100, 7, 5, 2, 0);
const enemy3 = new Enemy("Cosmic Menace", 100, 7, 5, 3, 0);
const enemy4 = new Enemy("Galactic Destructor", 100, 7, 5, 4, 0);
const enemy5 = new Enemy("Dark Matter Raider", 100, 7, 5, 5, 0);
const enemy6 = new Enemy("Quantum Marauder", 100, 7, 5, 6, 0);
const enemy7 = new Enemy("Interstellar Annihilator", 100, 7, 5, 7, 0);
const enemy8 = new Enemy("Plasma Leviathan", 100, 7, 5, 8, 0);
const enemy9 = new Enemy("GARBAGE MAN", 100, 7, 5, 9, 0);
const enemy10 = new Enemy("Arthur SS", 100, 7, 5, 10, 0);


// STARTING LEVEL 1 ===========================================
// INITIALIZING THE CONTENT ON THE SCREEN FOR NEXT LEVEL
initializeContent(player1, enemy1);
const enemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9, enemy10];
let currentEnemyIndex = 0;

// PLAYER ACTIONS ===========================================
// JALENS CODE FOR LEVELS/ROUNDS  
// ATTACK EVENT LISTENER ++++
 attackBtnEl.addEventListener("click", e => {  
    if (attackBtnEl.disabled) e.preventDefault();
    player1.attack(enemies[currentEnemyIndex]);
    attackBtnEl.disabled = true;
    repairBtnEl.disabled = true;
    initializeContent(player1, enemies[currentEnemyIndex]); 

    setTimeout(() => {        
        enemies[currentEnemyIndex].attack(player1);   
        initializeContent(player1, enemies[currentEnemyIndex]);  
    }, 2000);

    if (enemies[currentEnemyIndex].currentHp <= 0) {
        currentEnemyIndex++;
        player1.levelUp();
        //start next level
        if (currentEnemyIndex < enemies.length) {
            initializeContent(player1, enemies[currentEnemyIndex]);
        } else {
            console.log("You win!");
        }
    }
});
    
// REPAIR EVENT LISTENER ++++
repairBtnEl.addEventListener("click", e => {
    if (repairBtnEl.disabled) e.preventDefault();
    player1.repair(enemy1);
    attackBtnEl.disabled = true;
    repairBtnEl.disabled = true;
    initializeContent(player1, enemy1);  

    setTimeout(() => {        
        enemy1.attack(player1);   
        initializeContent(player1, enemy1);  
    }, 2000);    
});

// ORIG CODE FOR LEVELS/ROUNDS
// attack event listener    
//  attackBtnEl.addEventListener("click", e => {  
//     if (attackBtnEl.disabled) e.preventDefault();
//     player1.attack(enemy1);
//     attackBtnEl.disabled = true;
//     repairBtnEl.disabled = true;
//     initializeContent(player1, enemy1);  

//     setTimeout(() => {        
//         enemy1.attack(player1);   
//         initializeContent(player1, enemy1);  
//     }, 2000);         
// });
    
// repair event listener
// repairBtnEl.addEventListener("click", e => {
//     if (repairBtnEl.disabled) e.preventDefault();
//     player1.repair(enemy1);
//     attackBtnEl.disabled = true;
//     repairBtnEl.disabled = true;
//     initializeContent(player1, enemy1);  

//     setTimeout(() => {        
//         enemy1.attack(player1);   
//         initializeContent(player1, enemy1);  
//     }, 2000);    
// });