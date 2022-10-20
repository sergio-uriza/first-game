const sectionMessage = document.getElementById("message")
const listPlayerAttack = document.getElementById("list_player_attack")
const listEnemyAttack = document.getElementById("list_enemy_attack")
const listResult = document.getElementById("list_result")
const spanLivesPlayer = document.getElementById("lives_player")
const spanLivesEnemy = document.getElementById("lives_enemy")
const imagePlayer = document.getElementById("image_player")
const imageEnemy = document.getElementById("image_enemy")
const paragraphCharacterEnemy = document.getElementById("character_enemy")
const sectionSelectCharacter = document.getElementById("select_character")
const paragraphCharacterPlayer = document.getElementById("character_player")
const sectionSelectAttack = document.getElementById("select_attack")
const sectionRestart = document.getElementById("restart")
const buttonCharacterPlayer = document.getElementById("button_character")
const rockButton = document.getElementById("button_rock")
const paperButton = document.getElementById("button_paper")
const scissorsButton = document.getElementById("button_scissors")
const lizardButton = document.getElementById("button_lizard")
const spockButton = document.getElementById("button_spock")
const restartButton = document.getElementById("button_rest")
const divCharacters = document.getElementById("div_characters")

let characters = []
let listOfCharacters
let playerAttack = ""
let enemyAttack = ""
let livesPlayer = 5
let livesEnemy = 5
let round = 1

class Character {
    constructor(name, id, image, live) {
        this.name = name
        this.id = id
        this.image = image
        this.live = live
    }
}

let sheldon = new Character('Sheldon', 'character_one', './img/sheldon.png', 5)
let leonard = new Character('Leonard', 'character_two', './img/leonard.png', 5)
let howard = new Character('Howard', 'character_three', './img/howard.png', 5)
let penny = new Character('Penny', 'character_four', './img/penny.png', 5)
let bernadette = new Character('Bernadette', 'character_five', './img/bernadette.png', 5)
let amy = new Character('Amy', 'character_six', './img/amy.png', 5)

characters.push(sheldon, leonard, howard, penny, bernadette, amy)
characters.forEach((character) => {
    listOfCharacters = `
    <input type="radio" name="characters" id=${character.id} />
    <label for=${character.id}>
        <p>${character.name}</p>
        <img src=${character.image} alt=${character.name}>
    </label>
    `
    divCharacters.innerHTML += listOfCharacters
})

const inputCharacterOne = document.getElementById(characters[0].id)
const inputCharacterTwo = document.getElementById(characters[1].id)
const inputCharacterThree = document.getElementById(characters[2].id)
const inputCharacterFour = document.getElementById(characters[3].id)
const inputCharacterFive = document.getElementById(characters[4].id)
const inputCharacterSix = document.getElementById(characters[5].id)

function numRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function restartGame() {
    location.reload()
}

function lastTransform(idWinner, idLoser) {
    let winner = document.getElementById(idWinner)
    winner.style.backgroundColor = "#efb52154"

    let loser = document.getElementById(idLoser)
    loser.style.transitionDuration = "0.8s"
    loser.style.transform = "scale(0.7)"
    loser.style.textDecoration = "line-through"
    loser.style.opacity = "0.7"
}

function disableBattleButtons() {
    rockButton.disabled = true
    paperButton.disabled = true
    scissorsButton.disabled = true
    lizardButton.disabled = true
    spockButton.disabled = true
    sectionRestart.style.display = "block" // Habilitar seccion de reinicio
}

function modifyMessage(result) {
    sectionMessage.innerHTML = result
}

function checkLives() {
    if (livesPlayer === 0) {
        modifyMessage("You're so bad, you LOSE the game")
        disableBattleButtons()
        lastTransform("div_enemy", "div_player")
    } else if (livesEnemy === 0) {
        modifyMessage("¡Congratulations, you WIN the game!")
        disableBattleButtons()
        lastTransform("div_player", "div_enemy")
    }
}

function createCombatMessage(result) {
    let messagePlayerAttack = document.createElement("p")
    messagePlayerAttack.innerHTML = playerAttack
    listPlayerAttack.appendChild(messagePlayerAttack) // Listado de los ataques hechos por el jugador    
    let messageEnemyAttack = document.createElement("p")
    messageEnemyAttack.innerHTML = enemyAttack
    listEnemyAttack.appendChild(messageEnemyAttack) // Listado de los ataques hechos por el enemigo    
    let messageResult = document.createElement("p")
    messageResult.innerHTML = result
    listResult.appendChild(messageResult) // Listado de los resultados del duelo
}

function combat(player, opponent) {
    if (player === opponent) {
        createCombatMessage("-DRAW-")
        modifyMessage(("Round " + round + ": Same attack, nothing happens"))
        round++
    } else if ((player === "ROCK" && opponent === "SCISSORS") || (player === "ROCK" && opponent === "LIZARD") || (player === "PAPER" && opponent === "ROCK") || (player === "PAPER" && opponent === "SPOCK") || (player === "SCISSORS" && opponent === "PAPER") || (player === "SCISSORS" && opponent === "LIZARD") || (player === "LIZARD" && opponent === "PAPER") || (player === "LIZARD" && opponent === "SPOCK") || (player === "SPOCK" && opponent === "ROCK") || (player === "SPOCK" && opponent === "SCISSORS")) {
        createCombatMessage("-WIN-")
        modifyMessage(("Round " + round + ": You kill him, well done"))
        round++
        livesEnemy--
        spanLivesEnemy.innerHTML = livesEnemy
    } else if ((opponent === "ROCK" && player === "SCISSORS") || (opponent === "ROCK" && player === "LIZARD") || (opponent === "PAPER" && player === "ROCK") || (opponent === "PAPER" && player === "SPOCK") || (opponent === "SCISSORS" && player === "PAPER") || (opponent === "SCISSORS" && player === "LIZARD") || (opponent === "LIZARD" && player === "PAPER") || (opponent === "LIZARD" && player === "SPOCK") || (opponent === "SPOCK" && player === "ROCK") || (opponent === "SPOCK" && player === "SCISSORS")) {
        createCombatMessage("-LOSE-")
        modifyMessage(("Round " + round + ": You die, very sad"))
        round++
        livesPlayer--
        spanLivesPlayer.innerHTML = livesPlayer
    } else {
        createCombatMessage("ANY PROBLEM")
    }
    checkLives()
}

function enemyAttackRandom() {
    let attackRandom = numRandom(1, 5)

    if (attackRandom === 1) {
        enemyAttack = "ROCK"
    } else if (attackRandom === 2) {
        enemyAttack = "PAPER"
    } else if (attackRandom === 3) {
        enemyAttack = "SCISSORS"
    } else if (attackRandom === 4) {
        enemyAttack = "LIZARD"
    } else {
        enemyAttack = "SPOCK"
    }
    combat(playerAttack, enemyAttack)
}

function rockAttack() {
    playerAttack = "ROCK"
    enemyAttackRandom()
}

function paperAttack() {
    playerAttack = "PAPER"
    enemyAttackRandom()
}

function scissorsAttack() {
    playerAttack = "SCISSORS"
    enemyAttackRandom()
}

function lizardAttack() {
    playerAttack = "LIZARD"
    enemyAttackRandom()
}

function spockAttack() {
    playerAttack = "SPOCK"
    enemyAttackRandom()
}

function modifyDuelImages(character, result) {
    if (character === characters[0].name.toUpperCase()) {
        result.src = characters[0].image
    } else if (character === characters[1].name.toUpperCase()) {
        result.src = characters[1].image
    } else if (character === characters[2].name.toUpperCase()) {
        result.src = characters[2].image
    } else if (character === characters[3].name.toUpperCase()) {
        result.src = characters[3].image
    } else if (character === characters[4].name.toUpperCase()) {
        result.src = characters[4].image
    } else if (character === characters[5].name.toUpperCase()) {
        result.src = characters[5].image
    }
}

function insertDuelImages() {
    modifyDuelImages(paragraphCharacterPlayer.innerHTML, imagePlayer) // Editar imagen personaje jugador
    modifyDuelImages(paragraphCharacterEnemy.innerHTML, imageEnemy) // Editar imagen personaje enemigo
}

function selectCharacterEnemy() {
    let inputCharacterEnemy = numRandom(0, characters.length - 1)

    paragraphCharacterEnemy.innerHTML = characters[inputCharacterEnemy].name.toUpperCase()
    insertDuelImages()
}

function transition() {
    sectionSelectAttack.style.display = "grid" // Habilitar seccion de ataque    
    sectionSelectCharacter.style.display = "none" // Deshabilitar seccion de personajes
}

function selectCharacterPlayer() {
    if (inputCharacterOne.checked) {
        paragraphCharacterPlayer.innerHTML = characters[0].name.toUpperCase()
    } else if (inputCharacterTwo.checked) {
        paragraphCharacterPlayer.innerHTML = characters[1].name.toUpperCase()
    } else if (inputCharacterThree.checked) {
        paragraphCharacterPlayer.innerHTML = characters[2].name.toUpperCase()
    } else if (inputCharacterFour.checked) {
        paragraphCharacterPlayer.innerHTML = characters[3].name.toUpperCase()
    } else if (inputCharacterFive.checked) {
        paragraphCharacterPlayer.innerHTML = characters[4].name.toUpperCase()
    } else if (inputCharacterSix.checked) {
        paragraphCharacterPlayer.innerHTML = characters[5].name.toUpperCase()        
    } else {
        alert("You have to select a character")
        return
    }
    transition()
    selectCharacterEnemy()
}

sectionSelectAttack.style.display = "none" // Deshabilitar seccion de ataque
sectionRestart.style.display = "none" // Deshabilitar seccion de reinicio
buttonCharacterPlayer.addEventListener("click", selectCharacterPlayer) // Accion boton de seleccion
rockButton.addEventListener("click", rockAttack) // Accion botones de Batalla
paperButton.addEventListener("click", paperAttack) // Accion botones de Batalla
scissorsButton.addEventListener("click", scissorsAttack) // Accion botones de Batalla
lizardButton.addEventListener("click", lizardAttack) // Accion botones de Batalla
spockButton.addEventListener("click", spockAttack) // Accion botones de Batalla
restartButton.addEventListener("click", restartGame) // Accion boton de reinicio