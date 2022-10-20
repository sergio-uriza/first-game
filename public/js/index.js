const sectionMessage = document.getElementById("message")
const listPlayerAttack = document.getElementById("list_player_attack")
const listEnemyAttack = document.getElementById("list_enemy_attack")
const listResult = document.getElementById("list_result")
const spanVictoriesPlayer = document.getElementById("victories_player")
const spanVictoriesEnemy = document.getElementById("victories_enemy")
const imagePlayer = document.getElementById("image_player")
const imageEnemy = document.getElementById("image_enemy")
const paragraphCharacterEnemy = document.getElementById("character_enemy")
const sectionSelectCharacter = document.getElementById("select_character")
const paragraphCharacterPlayer = document.getElementById("character_player")
const sectionSelectAttack = document.getElementById("select_attack")
const sectionRestart = document.getElementById("restart")
const buttonCharacterPlayer = document.getElementById("button_character")
const restartButton = document.getElementById("button_rest")
const divCharacters = document.getElementById("div_characters")
const divAttacks = document.getElementById("div_attacks")
const divPlayer = document.getElementById("div_player")
const divEnemy = document.getElementById("div_enemy")

let characters = []
let inputCharacters = []
let selectedCharacterAttacks = []
let selectedEnemyAttacks = []
let selectedCharacterButtons
let listPlayerAttacks = []
let listEnemyAttacks = []
let listOfCharacters
let listOfAttack
let playerAttack = ""
let enemyAttack = ""
let playerWins = 0
let enemyWins = 0
let attacksLength = 0

let allPossibleAttacks = [
    { name: "Rock", id: "button_rock" },
    { name: "Paper", id: "button_paper" },
    { name: "Scissors", id: "button_scissors" },
    { name: "Lizard", id: "button_lizard" },
    { name: "Spock", id: "button_spock" }
]

class Character {
    constructor(name, id, image, preference) {
        this.name = name
        this.id = id
        this.image = image
        this.preference = preference
        this.attacks = []
    }
}

let sheldon = new Character("Sheldon", "character_one", "./img/sheldon.png", "spock")
let leonard = new Character("Leonard", "character_two", "./img/leonard.png", "paper")
let howard = new Character("Howard", "character_three", "./img/howard.png", "lizard")
let penny = new Character("Penny", "character_four", "./img/penny.png", "scissors")
let bernadette = new Character("Bernadette", "character_five", "./img/bernadette.png", "rock")
let amy = new Character("Amy", "character_six", "./img/amy.png", "none")

sheldon.attacks.push(
    allPossibleAttacks[0],
    allPossibleAttacks[2],
    allPossibleAttacks[3],
    allPossibleAttacks[4],
    allPossibleAttacks[4],
)

leonard.attacks.push(
    allPossibleAttacks[0],
    allPossibleAttacks[1],
    allPossibleAttacks[1],
    allPossibleAttacks[2],
    allPossibleAttacks[4],
)

howard.attacks.push(
    allPossibleAttacks[0],
    allPossibleAttacks[1],
    allPossibleAttacks[3],
    allPossibleAttacks[3],
    allPossibleAttacks[4],
)

penny.attacks.push(
    allPossibleAttacks[1],
    allPossibleAttacks[2],
    allPossibleAttacks[2],
    allPossibleAttacks[3],
    allPossibleAttacks[4],
)

bernadette.attacks.push(
    allPossibleAttacks[0],
    allPossibleAttacks[0],
    allPossibleAttacks[1],
    allPossibleAttacks[2],
    allPossibleAttacks[3],
)

amy.attacks.push(
    allPossibleAttacks[0],
    allPossibleAttacks[1],
    allPossibleAttacks[2],
    allPossibleAttacks[3],
    allPossibleAttacks[4],
)

characters.push(sheldon, leonard, howard, penny, bernadette, amy) // Agregar personaje en el arreglo
characters.forEach((character) => {
    listOfCharacters = `
        <input type="radio" name="characters" id=${character.id} />
        <label for=${character.id}>
            <p>${character.name}</p>
            <img src=${character.image} alt=${character.name}>
            <p class="cpreference">Preference:<br>${character.preference}</p>
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

inputCharacters.push(inputCharacterOne, inputCharacterTwo, inputCharacterThree, inputCharacterFour, inputCharacterFive, inputCharacterSix) // Agregar input de los personajes en el arreglo

function numRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function restartGame() {
    location.reload()
}

function lastTransform(winner, loser) {
    winner.style.backgroundColor = "#efb52154"

    loser.style.transitionDuration = "0.8s"
    loser.style.transform = "scale(0.7)"
    loser.style.textDecoration = "line-through"
    loser.style.opacity = "0.7"
}

function modifyMessage(result) {
    sectionMessage.innerHTML = result
}

function checkWins() {
    if (playerWins > enemyWins) {
        modifyMessage("¡Congratulations, you WIN the game!")
        lastTransform(divPlayer, divEnemy)
    } else if (playerWins < enemyWins) {
        modifyMessage("You're so bad, you LOSE the game")
        lastTransform(divEnemy, divPlayer)
    } else if (playerWins === enemyWins) {
        modifyMessage("How boring! tied game, nobody wins")
    }
    sectionRestart.style.display = "block" // Habilitar seccion de reinicio
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
    spanVictoriesPlayer.innerHTML = playerWins // Conteo victorias jugador
    spanVictoriesEnemy.innerHTML = enemyWins // Conteo victorias enemigo
}

function combat(player, opponent) {
    if (player === opponent) {
        createCombatMessage("-DRAW-")
    } else if ((player === "ROCK" && opponent === "SCISSORS") || (player === "ROCK" && opponent === "LIZARD") || (player === "PAPER" && opponent === "ROCK") || (player === "PAPER" && opponent === "SPOCK") || (player === "SCISSORS" && opponent === "PAPER") || (player === "SCISSORS" && opponent === "LIZARD") || (player === "LIZARD" && opponent === "PAPER") || (player === "LIZARD" && opponent === "SPOCK") || (player === "SPOCK" && opponent === "ROCK") || (player === "SPOCK" && opponent === "SCISSORS")) {
        playerWins++
        createCombatMessage("-WIN-")
    } else if ((opponent === "ROCK" && player === "SCISSORS") || (opponent === "ROCK" && player === "LIZARD") || (opponent === "PAPER" && player === "ROCK") || (opponent === "PAPER" && player === "SPOCK") || (opponent === "SCISSORS" && player === "PAPER") || (opponent === "SCISSORS" && player === "LIZARD") || (opponent === "LIZARD" && player === "PAPER") || (opponent === "LIZARD" && player === "SPOCK") || (opponent === "SPOCK" && player === "ROCK") || (opponent === "SPOCK" && player === "SCISSORS")) {
        enemyWins++
        createCombatMessage("-LOSE-")
    } else {
        createCombatMessage("ANY PROBLEM")
    }
}

function combatSequence() {
    for (let i = 0; i < listPlayerAttacks.length; i++) {
        playerAttack = listPlayerAttacks[i]
        enemyAttack = listEnemyAttacks[i]
        combat(listPlayerAttacks[i], listEnemyAttacks[i])
    }
    checkWins()
}

function enemyAttackRandom() {
    selectedEnemyAttacks.forEach(attack => {
        listEnemyAttacks.push(attack.name.toUpperCase())
    });
    listEnemyAttacks.sort(() => Math.random() - 0.5) // Desordenar aleatoriamente el orden de los ataques del enemigo //array = array.sort(function() {return Math.random() - 0.5})

    combatSequence()
}

function startCombat() {
    if (listPlayerAttacks.length === attacksLength) {
        enemyAttackRandom()
    }
}

function sequenceAttacks() {
    selectedCharacterButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            allPossibleAttacks.forEach(attack => {
                if (event.target.textContent === attack.name) {
                    listPlayerAttacks.push(attack.name.toUpperCase())
                    button.disabled = true
                    button.style.backgroundColor = "gray"
                }
            });
            startCombat()
        })
    })
}

function insertAttacks() {
    selectedCharacterAttacks.forEach((attack) => {
        listOfAttack = `
            <button class="cbutton-attack" id=${attack.id}>${attack.name}</button>
            `
        divAttacks.innerHTML += listOfAttack
    })
    selectedCharacterButtons = document.querySelectorAll(".cbutton-attack")
    sequenceAttacks()
}

function extractAttacks() {
    characters.forEach(character => {
        if (paragraphCharacterPlayer.innerHTML.toLowerCase() === character.name.toLowerCase()) {
            selectedCharacterAttacks = character.attacks
        }
        if (paragraphCharacterEnemy.innerHTML.toLowerCase() === character.name.toLowerCase()) {
            selectedEnemyAttacks = character.attacks
        }
    });
    insertAttacks()
}

function modifyDuelImages(characterName, editSource) {
    characters.forEach(character => {
        if (characterName === character.name.toUpperCase()) {
            editSource.src = character.image
        }
    });
}

function selectCharacterEnemy() {
    let inputCharacterEnemy = numRandom(0, characters.length - 1)
    paragraphCharacterEnemy.innerHTML = characters[inputCharacterEnemy].name.toUpperCase()

    modifyDuelImages(paragraphCharacterPlayer.innerHTML, imagePlayer) // Editar imagen personaje jugador
    modifyDuelImages(paragraphCharacterEnemy.innerHTML, imageEnemy) // Editar imagen personaje enemigo
    extractAttacks()
}

function transition() {
    sectionSelectAttack.style.display = "grid" // Habilitar seccion de ataque    
    sectionSelectCharacter.style.display = "none" // Deshabilitar seccion de personajes
}

function selectCharacterPlayer() {
    let condition = false
    for (let i = 0; i < inputCharacters.length; i++) {
        if (inputCharacters[i].checked) {
            paragraphCharacterPlayer.innerHTML = characters[i].name.toUpperCase()
            attacksLength = characters[i].attacks.length
            condition = true
        }
    }
    if (!condition) {
        alert("You have to select a character")
        return
    }
    selectCharacterEnemy()
    transition()
}

sectionSelectAttack.style.display = "none" // Deshabilitar seccion de ataque
sectionRestart.style.display = "none" // Deshabilitar seccion de reinicio
buttonCharacterPlayer.addEventListener("click", selectCharacterPlayer) // Accion boton de seleccion
restartButton.addEventListener("click", restartGame) // Accion boton de reinicio
