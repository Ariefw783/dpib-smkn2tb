// Nama memori penyimpanan (cache)
const CACHE_NAME = 'dpib-hub-cache-v1';

// Daftar aset penting yang perlu disimpan untuk cadangan offline
const ASSETS_TO_CACHE = [
  './index.html',
  './absensiguru.html',
  './datasiswa.html',
  './monitoring.html',
  './peminjaman.html',
  './manifest.json',
  './dpib.png',
  './logosmk.png'
];

// 1. Tahap Instalasi Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Menyimpan aset penting ke dalam cache
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Tahap Aktivasi Service Worker (Pembersihan cache lama jika ada pembaruan)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Tahap Mencegat Permintaan Internet (Strategi Network First)
self.addEventListener('fetch', (event) => {
  // Hanya proses permintaan dengan metode GET (bukan POST/tulis data)
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Hanya kelola berkas lokal dari domain yang sama agar tidak mengganggu Firebase/Firestore
  if (url.origin !== self.location.origin) return;
  
  event.respondWith(
    // Langkah A: Selalu coba ambil data terbaru dari Internet (Network) terlebih dahulu
    fetch(event.request)
    .then((response) => {
      // Jika internet berhasil tersambung dan merespons dengan baik
      if (response.status === 200) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // Perbarui memori cache dengan berkas terbaru yang berhasil diunduh
          cache.put(event.request, responseClone);
        });
      }
      return response;
    })
    .catch(() => {
      // Langkah B: Jika internet mati/gagal terhubung, ambil berkas cadangan dari cache
      return caches.match(event.request);
    })
  );
});