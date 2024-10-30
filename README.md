<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Store Project Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f9;
            color: #333;
        }
        h1, h2 {
            color: #333;
        }
        h1 {
            text-align: center;
            font-size: 2em;
            color: #444;
        }
        h2 {
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
            margin-top: 30px;
            font-size: 1.5em;
            color: #444;
        }
        ul, ol {
            margin-left: 20px;
        }
        code {
            background-color: #e9ecef;
            padding: 3px 5px;
            border-radius: 3px;
            font-size: 0.95em;
        }
        pre {
            background-color: #f5f5f5;
            padding: 15px;
            border-radius: 5px;
            overflow: auto;
        }
        .content {
            max-width: 800px;
            margin: auto;
        }
        .code-block {
            background-color: #282c34;
            color: #61dafb;
            padding: 15px;
            border-radius: 5px;
            overflow: auto;
            font-family: monospace;
            line-height: 1.6;
        }
    </style>
</head>
<body>

<div class="content">
    <h1>Online Store Project</h1>
    <p><strong>Online Store Project</strong> adalah aplikasi toko online yang memungkinkan pengguna membeli produk dari web atau aplikasi mobile berbasis Ionic. Proyek ini memiliki back-end berbasis PHP dan MySQL, front-end berbasis React untuk aplikasi web, dan Ionic untuk aplikasi mobile.</p>

    <h2>Daftar Isi</h2>
    <ol>
        <li><a href="#deskripsi">Deskripsi Proyek</a></li>
        <li><a href="#lingkungan">Lingkungan Pengembangan</a></li>
        <li><a href="#spesifikasi">Spesifikasi Teknis</a></li>
        <li><a href="#struktur">Struktur Direktori</a></li>
        <li><a href="#prasyarat">Prasyarat</a></li>
        <li><a href="#instalasi">Instalasi dan Pengaturan</a></li>
        <li><a href="#api">API Endpoint</a></li>
        <li><a href="#penggunaan">Penggunaan</a></li>
        <li><a href="#kontribusi">Kontribusi</a></li>
        <li><a href="#lisensi">Lisensi</a></li>
    </ol>

    <h2 id="deskripsi">Deskripsi Proyek</h2>
    <p>Proyek ini terdiri dari beberapa bagian:</p>
    <ul>
        <li><strong>Backend</strong>: RESTful API menggunakan PHP dan MySQL untuk memproses data pengguna, produk, dan transaksi pesanan.</li>
        <li><strong>Frontend Web</strong>: Aplikasi web menggunakan React untuk interaksi pengguna dengan katalog produk dan melakukan pembelian.</li>
        <li><strong>Mobile App</strong>: Aplikasi mobile berbasis Ionic untuk pengguna yang ingin mengakses toko dari perangkat seluler.</li>
    </ul>

    <h2 id="lingkungan">Lingkungan Pengembangan</h2>
    <p>Berikut adalah deskripsi lingkungan pengembangan yang disarankan:</p>
    <ul>
        <li><strong>Sistem Operasi</strong>: Windows 10 / macOS / Linux</li>
        <li><strong>Server Development</strong>: XAMPP atau WAMP untuk PHP dan MySQL</li>
        <li><strong>Node.js</strong>: Versi 14.x atau lebih baru</li>
        <li><strong>Ionic CLI</strong>: Versi 6.x atau lebih baru</li>
    </ul>

    <h2 id="spesifikasi">Spesifikasi Teknis</h2>
    <ol>
        <li><strong>Backend</strong>: Server-side API dibangun menggunakan PHP dengan koneksi MySQL, mendukung operasi CRUD.</li>
        <li><strong>Database</strong>:
            <ul>
                <li><code>users</code>: Mengelola data pengguna</li>
                <li><code>products</code>: Mengelola data produk</li>
                <li><code>orders</code>: Mengelola pesanan pengguna</li>
            </ul>
        </li>
        <li><strong>Frontend Web</strong>: React digunakan untuk antarmuka pengguna web.</li>
        <li><strong>Mobile App</strong>: Ionic untuk UI responsif, dengan Angular sebagai basis aplikasi.</li>
    </ol>

    <h2 id="struktur">Struktur Direktori</h2>
    <pre class="code-block">
online-store-project/
├── backend/
│   ├── db.php
│   ├── config/
│   └── index.php
├── frontend/
│   ├── public/
│   └── src/
├── mobile/
│   └── src/
└── docs/
    </pre>

    <h2 id="prasyarat">Prasyarat</h2>
    <ul>
        <li><strong>Backend</strong>: PHP >= 7.4, MySQL</li>
        <li><strong>Frontend</strong>: Node.js (v14 atau lebih baru)</li>
        <li><strong>Mobile App</strong>: Ionic CLI</li>
    </ul>

    <h2 id="instalasi">Instalasi dan Pengaturan</h2>
    <p>Clone repository dan install dependensi berikut untuk memulai proyek:</p>
    <pre class="code-block">
git clone https://github.com/username/online-store-project.git
cd online-store-project
    </pre>

    <h2 id="api">API Endpoint</h2>
    <p>Lihat <code>docs/API.md</code> untuk dokumentasi lengkap endpoint API.</p>

    <h2 id="penggunaan">Penggunaan</h2>
    <ul>
        <li><strong>Frontend Web</strong>: Akses melalui <code>http://localhost:3000</code></li>
        <li><strong>Mobile App</strong>: Akses aplikasi Ionic melalui perangkat mobile atau emulator.</li>
    </ul>

    <h2 id="kontribusi">Kontribusi</h2>
    <p>Kontribusi terbuka untuk pengembangan fitur baru, perbaikan bug, atau peningkatan dokumentasi.</p>

    <h2 id="lisensi">Lisensi</h2>
    <p>Proyek ini dilisensikan di bawah <a href="LICENSE">MIT License</a>.</p>
</div>

</body>
</html>
