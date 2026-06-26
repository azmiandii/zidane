const audio = document.getElementById('bg-music');
const piringan = document.getElementById('piringan-hitam');

let sandiInputan = "";
let totalSalah = 0;

// Kalimat jahil pas kunci sandi lockscreen salah
const petunjukJahil = [
    "Wwkwk salah! Coba ingat-ingat lagi, masa lupa sih sayang? 😜",
    "Masih salah boooo! Fokus dong cintaku 🤣",
    "Eh salah lagi? Tenang, aku belum ngambek kok. Coba lagi! 💖",
    "Clue: Angka ultah kita berdua dipadukan! 🧩",
    "Tetep salah! Kayaknya harus aku cium dulu biar pinter nih 🫣",
    "Pencet sembarang aja terus sampai jebol sayang hhe 🧸",
    "Satu kali lagi salah, kodenya aku kasih tau deh hha 😂"
];

// SCREEN LOADER AUTOMATION
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loadPage = document.getElementById('loading-page');
        loadPage.style.opacity = '0';
        setTimeout(() => {
            loadPage.style.display = 'none';
            document.getElementById('page-intro').classList.add('active');
            document.getElementById('page-intro').style.opacity = '1';
        }, 500);
    }, 2000);
});

function tekanAngka(angka) {
    if (sandiInputan.length < 4) {
        sandiInputan += angka;
        updateTitikIndikator();
    }
}

function hapusAngka() {
    sandiInputan = sandiInputan.slice(0, -1);
    updateTitikIndikator();
}

function updateTitikIndikator() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index < sandiInputan.length) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function submitSandi() {
    const teksPetunjuk = document.getElementById('petunjuk-sandi');
    const labelCounter = document.getElementById('hitung-salah');
    const avatarBeruang = document.getElementById('avatar-beruang');

    if (sandiInputan.length < 4) {
        alert("Ketik 4 digit angkamu dulu sayangku! 🥰");
        return;
    }

    // ⬇️ DI SINI KAMU BISA GANTI SANDINYA (Sekarang diset default: 1124) ⬇️
    if (sandiInputan === "1124") {
        teksPetunjuk.innerHTML = "Yeayyy benar! I love you! Membuka gerbang... ✨🌸";
        avatarBeruang.classList.add('happy');
        
        setTimeout(() => {
            gantiHalaman('page-intro', 'page-isi');
            audio.play().then(() => piringan.classList.add('playing')).catch(() => {});
            document.getElementById('romance-video').play().catch(() => {});
            setInterval(buatHatiHujan, 350);
        }, 1100);

    } else {
        totalSalah++;
        sandiInputan = "";
        updateTitikIndikator();

        avatarBeruang.classList.add('shake');
        setTimeout(() => avatarBeruang.classList.remove('shake'), 400);

        labelCounter.innerText = `Kesempatan salah: ${totalSalah}/8`;

        if (totalSalah >= 8) {
            teksPetunjuk.innerHTML = "Hahaha udah 8x salah! Kodenya: <br><b>Ketik angka 1124 ya sayang!</b> 🔐🤍";
        } else {
            teksPetunjuk.innerHTML = petunjukJahil[totalSalah - 1];
        }
    }
}

function gantiHalaman(idHalamanSekarang, idHalamanBaru) {
    const halSekarang = document.getElementById(idHalamanSekarang);
    const halBaru = document.getElementById(idHalamanBaru);

    halSekarang.style.opacity = '0';
    setTimeout(() => {
        halSekarang.classList.remove('active');
        halBaru.classList.add('active');
        setTimeout(() => { halBaru.style.opacity = '1'; }, 50);
    }, 550);
}

function pindahKePenutup() {
    gantiHalaman('page-isi', 'page-penutup');
    document.getElementById('romance-video').pause();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// LOGIKA JEBAKAN PENUTUP JAHIL
function hindariTombol() {
    const btnGak = document.getElementById('btn-gak-mau');
    const xAcak = Math.floor(Math.random() * 160) - 80;
    const yAcak = Math.floor(Math.random() * 80) - 40;
    
    btnGak.style.transform = `translate(${xAcak}px, ${yAcak}px)`;
    
    const teksGeli = ["Gak bisa klik wleee 😜", "Eits gabisaaa 😋", "Harus mau pokoknya! 🤣", "Gak boleh menolak! 🤪"];
    btnGak.innerText = teksGeli[Math.floor(Math.random() * teksGeli.length)];
}

function klikMauPeluk() {
    document.getElementById('emoji-penutup').innerText = "💝🧸🤗💐";
    document.getElementById('teks-penutup-interaktif').innerHTML = "Aww! Peluk erat dari jauh 🤗❤️<br><br><span style='font-family:\"Caveat\"; font-size:26px;'>i love you, alinkesayangantiann 🤍</span>";
    document.querySelector('.button-prank-wrapper').style.display = "none";
    document.getElementById('btn-reset-momen').style.display = "inline-flex";

    for(let i = 0; i < 35; i++) { setTimeout(buatHatiHujan, i * 60); }
}

function ulangMomen() {
    sandiInputan = ""; totalSalah = 0;
    updateTitikIndikator();
    document.getElementById('emoji-penutup').innerText = "🧸❓";
    document.getElementById('teks-penutup-interaktif').innerText = "Mau peluk Tian online sekarang gak? 👉👈";
    document.querySelector('.button-prank-wrapper').style.display = "flex";
    
    const btnGak = document.getElementById('btn-gak-mau');
    btnGak.style.transform = "translate(0, 0)";
    btnGak.innerText = "Gak Mau 😜";
    
    document.getElementById('btn-reset-momen').style.display = "none";
    gantiHalaman('page-penutup', 'page-intro');
}

function kontrolMusik() {
    if (audio.paused) { audio.play(); piringan.classList.add('playing'); } 
    else { audio.pause(); piringan.classList.remove('playing'); }
}

function buatHatiHujan() {
    const heart = document.createElement('div');
    heart.classList.add('heart-fall');
    const tipeHati = ['❤️', '💐', '🌸', '💖', '🧸', '✨', '🤍', '💝'];
    heart.innerText = tipeHati[Math.floor(Math.random() * tipeHati.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 18 + 14 + "px";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 5000);
}

function efekKlikHati() {
    for(let i=0; i<10; i++) { setTimeout(buatHatiHujan, i * 70); }
}
