document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('background-music');
    if (!backgroundMusic) return; // Kalo ga ada elemen musik, stop.

    // Fungsi utama untuk inisialisasi musik
    function initMusic() {
        const musicTime = sessionStorage.getItem('musicCurrentTime');
        const musicConsent = sessionStorage.getItem('musicConsent');

        // Cek apakah pengguna sudah setuju musik diputar (dari halaman index)
        if (musicConsent === 'true') {
            // Sembunyikan tombol overlay jika ada
            const musicOverlay = document.getElementById('music-overlay');
            if (musicOverlay) {
                musicOverlay.style.display = 'none';
            }
            
            // Lanjutkan musik dari waktu yang disimpan
            if (musicTime) {
                backgroundMusic.currentTime = parseFloat(musicTime);
            }

            // Langsung putar musiknya
            backgroundMusic.play().catch(error => {
                console.log("Browser mencegah autoplay, butuh interaksi.", error);
            });
        }
    }

    // Terus simpan waktu musik ke sessionStorage setiap musiknya jalan
    backgroundMusic.addEventListener('timeupdate', function() {
        sessionStorage.setItem('musicCurrentTime', backgroundMusic.currentTime);
    });

    // --- LOGIC KHUSUS UNTUK TOMBOL DI INDEX.HTML ---
    const playButton = document.getElementById('play-music-btn');
    if (playButton) {
        playButton.addEventListener('click', function() {
            const musicOverlay = document.getElementById('music-overlay');
            musicOverlay.style.display = 'none';
            
            // Tandai bahwa pengguna sudah setuju
            sessionStorage.setItem('musicConsent', 'true');
            
            backgroundMusic.play().catch(error => {
                console.log("Gagal memutar musik:", error);
            });
        });
    }

    // Jalankan inisialisasi musik saat halaman dimuat
    initMusic();

    // --- Script untuk Hamburger Menu ---
    // (Ini bisa kamu pindah juga ke file terpisah kalo mau lebih rapi)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }
});