**Online Store Project
**Online Store Project adalah aplikasi toko online yang memungkinkan pengguna membeli produk dari web atau aplikasi mobile berbasis Ionic. Proyek ini memiliki back-end berbasis PHP dan MySQL, front-end berbasis React untuk aplikasi web, dan Ionic untuk aplikasi mobile.

Daftar Isi
Deskripsi Proyek
Lingkungan Pengembangan
Spesifikasi Teknis
Struktur Direktori
Prasyarat
Instalasi dan Pengaturan
API Endpoint
Penggunaan
Kontribusi
Lisensi
Deskripsi Proyek
Proyek ini terdiri dari beberapa bagian:

Backend: RESTful API menggunakan PHP dan MySQL untuk memproses data pengguna, produk, dan transaksi pesanan.
Frontend Web: Aplikasi web menggunakan React untuk interaksi pengguna dengan katalog produk dan melakukan pembelian.
Mobile App: Aplikasi mobile berbasis Ionic untuk pengguna yang ingin mengakses toko dari perangkat seluler.
Lingkungan Pengembangan
Berikut adalah deskripsi lingkungan pengembangan yang disarankan untuk menjalankan proyek ini dengan lancar:

Software
Sistem Operasi: Windows 10 / macOS / Linux
Server Development: XAMPP atau WAMP untuk PHP dan MySQL, atau server setara lainnya
Node.js: Versi 14.x atau lebih baru untuk menjalankan aplikasi front-end dan mobile
Ionic CLI: Versi 6.x atau lebih baru untuk aplikasi mobile
Tools
Database Management: phpMyAdmin untuk pengelolaan database
Code Editor: Visual Studio Code atau editor teks serupa
Browser: Chrome, Firefox, atau Edge (dengan mode developer)
Postman: Untuk pengujian API
Frameworks & Libraries
Backend: PHP 7.x, MySQL
Frontend Web: React.js dengan Axios untuk API dan React Router untuk navigasi
Mobile App: Ionic Framework dengan Angular
Spesifikasi Teknis
Backend: Server-side API dibangun menggunakan PHP dengan koneksi MySQL, mendukung operasi CRUD pada tabel produk, pesanan, dan pengguna.
Database:
Tabel users: Mengelola data pengguna (ID, username, password, email).
Tabel products: Mengelola data produk (ID, nama, deskripsi, harga, stok, gambar).
Tabel orders: Mengelola pesanan pengguna, mengaitkan pengguna dengan produk yang dipesan.
Frontend Web: Menggunakan React untuk antarmuka pengguna web. Komponen seperti ProductList, Cart, dan OrderSummary mengatur alur transaksi pengguna.
Mobile App: Ionic untuk UI responsif, dengan Angular sebagai basis aplikasi.
Struktur Direktori
bash
Copy code
online-store-project/
├── backend/                        # Aplikasi server-side
│   ├── db.php                      # Koneksi database
│   ├── config/                     # Konfigurasi aplikasi
│   ├── controllers/                # Logika bisnis untuk CRUD
│   ├── models/                     # Struktur data
│   ├── routes/                     # Routing endpoint API
│   └── index.php                   # Entry point backend
│
├── frontend/                       # Aplikasi front-end (web)
│   ├── public/                     # Aset publik
│   ├── src/                        # Kode sumber front-end
│   ├── .env                        # Variabel lingkungan untuk API URL
│   └── package.json                # Konfigurasi proyek front-end
│
├── mobile/                         # Aplikasi mobile (Ionic)
│   ├── src/                        # Kode sumber aplikasi mobile
│   ├── assets/                     # Aset aplikasi mobile
│   ├── capacitor.config.json       # Konfigurasi Capacitor untuk platform mobile
│   └── package.json                # Konfigurasi proyek Ionic
│
└── docs/                           # Dokumentasi proyek
    ├── API.md                      # Dokumentasi API
    ├── database-schema.png         # Diagram skema database
    └── user-guide.md               # Panduan pengguna aplikasi
Prasyarat
Backend: PHP >= 7.4, MySQL (disarankan menggunakan XAMPP atau WAMP).
Frontend: Node.js (v14 atau lebih baru), npm.
Mobile App: Ionic CLI, Android Studio (untuk Android) atau Xcode (untuk iOS).
Instalasi dan Pengaturan
1. Clone Repository
bash
Copy code
git clone https://github.com/username/online-store-project.git
cd online-store-project
2. Setup Database
Buat database MySQL bernama online_store_db.
Impor skema dari docs/database-schema.sql.
3. Konfigurasi Backend
Masuk ke folder backend.
Buat file .env dengan konfigurasi berikut:
dotenv
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=online_store_db
Jalankan server menggunakan XAMPP/WAMP.
4. Frontend Setup (Web)
Masuk ke folder frontend.
Install dependensi:
bash
Copy code
npm install
Jalankan aplikasi web:
bash
Copy code
npm start
5. Mobile Setup (Ionic)
Masuk ke folder mobile.
Install dependensi:
bash
Copy code
npm install
Jalankan aplikasi di emulator atau perangkat nyata:
bash
Copy code
ionic serve
API Endpoint
Lihat docs/API.md untuk dokumentasi lengkap endpoint API, termasuk metode HTTP yang didukung, request, dan response yang diharapkan.

Penggunaan
Frontend Web: Akses melalui http://localhost:3000 untuk melihat antarmuka toko online di browser.
Mobile App: Akses aplikasi Ionic melalui perangkat mobile atau emulator.
Kontribusi
Kontribusi terbuka untuk pengembangan fitur baru, perbaikan bug, atau peningkatan dokumentasi. Silakan buat Pull Request setelah fork repository.

Lisensi
Proyek ini dilisensikan di bawah MIT License.
