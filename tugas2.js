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

function playTheGame() {
    let playerScore = 0;
    let computerScore = 0;

    function playRound() { //Penambahan fitur score dan menampilkan pilihan computer
        const generateRandomNumber = Math.floor(Math.random() * choices.length);
        const computerChoice = choices[generateRandomNumber];

        rl.question("Silahkan pilih pilihan anda (Gunting/1, Batu/2, Kertas/3):", function (input) {
            const playerChoice = getChoiceName(input);

            if (!playerChoice) {
                console.log("Pilihan tidak valid");
                return playRound(); // Ulangi ronde jika input tidak valid
            }

            console.log(`Player memilih ${playerChoice.name}`);
            console.log(`Computer memilih ${computerChoice.name}`);

            const result = getWinner(playerChoice, computerChoice);
            console.log(`You ${result}`);

            if (result === "win") {
                playerScore++;
            } else if (result === "lose") {
                computerScore++;
            }

            console.log(`Score: Player ${playerScore} - Computer ${computerScore}`);

            if (playerScore === 3 || computerScore === 3) { // Menentukan pemenang Berdasarkan score
                if (playerScore === 3) {
                    console.log("Game Over! Player menang!");
                } else {
                    console.log("Game Over! Computer menang!");
                }
                rl.close();
            } else {
                playRound(); // Lanjut ke ronde berikutnya
            }
        });
    }

    playRound(); // Mulai ronde pertama
}


playTheGame();


