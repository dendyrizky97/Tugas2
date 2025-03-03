const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

// Pilihan batu gunting kertas
const choices = [
    {name : "gunting", value: 1},
    {name : "batu", value: 2},
    {name : "kertas", value: 3} 
]

function getChoiceName(input) {
    input = input.toLowerCase();
    return choices.find(function (val) {
        return val.name === input || val.value.toString() === input;
    })
}

function getWinner(player, computer) {
    switch (player.name) {
        case "gunting":
            switch (computer.name) {
                case "gunting":
                    return "draw";
                case "batu":
                    return "lose";
                case "kertas":
                    return "win";
            }
            break;
        case "batu":
            switch (computer.name) {
                case "gunting":
                    return "win";
                case "batu":
                    return "draw";
                case "kertas":
                    return "lose";
            }
            break;
        case "kertas":
            switch (computer.name) {
                case "gunting":
                    return "lose";
                case "batu":
                    return "win";
                case "kertas":
                    return "draw";
            }
            break;
    }
}

function playTheGame(player) {
    const generateRandomNumber = Math.floor(Math.random() * choices.length);
    const computerChoice = choices[[generateRandomNumber]];
    console.log(computerChoice)

    rl.question("Silahkan pilih pilihan anda (Gunting/1, Batu/2, Kertas/3):", function (input){
        const playerChoice = getChoiceName(input)
        console.log(playerChoice)

        if (!playerChoice) {
            console.log("Pilihan tidak valid");
            return playTheGame();
        }
    
    console.log(`Player choose ${playerChoice.name}`);
    console.log(`Computer choose ${computerChoice.name}`);

    const result = getWinner(playerChoice, computerChoice);
    console.log(`You ${result}`);
    
    
    })
}

playTheGame();


