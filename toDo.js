const readline = require("node:readline");
const {stdin: input, stdout: output} = require("node:process");
const { parse } = require("node:path");
const rl = readline.createInterface({input, output});

let todos = [];

function showMenu() {
    console.log("\n==== To-Do List ====");
    console.log("1. Tambah Tugas");
    console.log("2. Lihat Tugas");
    console.log("3. Tandai Tugas");
    console.log("4. Hapus Tugas");
    console.log("5. Keluar");
    rl.question("Pilih menu: ", (number) => {
        switch (number) {
            case "1":
                addTodo();
                break;
            case "2":
                listTodo();
                showMenu();
                break;
            case "3":
                flagTodo();
                break;
            case "4":
                deletedTodo();
                break;
            case "5":
                console.log("Terimakasih sudah menggunakan aplikasi ini");
                rl.close();
                break;
            default:
                console.log("Pilihan tidak valid silahkan coba lagi");
                showMenu();
        }
    });
}

function addTodo() {
    rl.question("Masukan tugas baru: ", (task) => {
        if (task.trim() === "") {
            console.log("Tugas tidak boleh kosong!");
        } else {
            todos.push({task, flagged: false}); //Menyimpan sebagai objek
            console.log("Tugas berhasil ditambahkan!");
        }
        showMenu();
    });
}

function listTodo() {
    console.log("\nDaftar Tugas:");
    if (todos.length === 0) {
        console.log("Belum ada tugas.");
    } else {
        todos.forEach((todo, index) => {
            const status = todo.flagged ? "[✔]" : "[ ]"; //Tampilkan ceklis jika ditandai
            console.log(`${index + 1}. ${status} ${todo.task}`);
        });
    }
}

function flagTodo() {
    if (todos.length === 0) {
        console.log("Tidak ada tugas untuk ditandai. ");
        return showMenu();
    }

    listTodo(); //Tampilkan Daftar Tugas Sebelum Memilih

    rl.question("Pilih nomor tugas yang ingin ditandai/dihapus: ", (number) => {
        const index = parseInt(number) - 1;
        if (isNaN(index) || index < 0 || index >= todos.length) {
            console.log("Nomor tugas tidak valid! Silahkan coba lagi");
            return flagTodo();
        }
        todos[index].flagged = !todos[index].flagged;
        console.log(`Tugas "${todos[index].task}" telah ${todos[index].flagged ? "ditandai [✔]" : "dihapus tandanya [ ]"}`);
        showMenu();
    });
}

function deletedTodo() {
    if (todos.length === 0) {
        console.log("Tidak ada tugas untuk dihapus.");
        return showMenu();
    }

    listTodo(); //Tampilkan daftar tugas sebelum memilih

    rl.question("Pilih nomor tugas yang ingin dihapus: ", (number) => {
        const index = parseInt(number) - 1;
        if (isNaN(index) || index < 0 || index >= todos.length) {
            console.log("Nomor tugas tidak valid!");
            return deletedTodo();
        }
        const deletedTask = todos.splice(index, 1)[0]; //Ambil objek yang dihapus
        console.log(`Tugas "${deletedTask.task}" berhasil dihapus. `);
        showMenu();
    });
}

showMenu();