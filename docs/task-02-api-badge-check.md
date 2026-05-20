### 1. Endpoint badge per desa
Status: Belum ditemukan

Endpoint yang dicari:
- `villages/:id/badges`
- `village/:id/badges`
- `desa/:id/badges`

Hasil pengecekan:
Pencarian dengan keyword `badge|badges` hanya menemukan penggunaan badge sebagai komponen tampilan, status klaim, dan icon ranking. Tidak ditemukan endpoint API khusus untuk badge per desa.

Pencarian tambahan dengan pattern `villages.*badges`, `badges.*villages`, `village.*badges`, `badges.*village`, `desa.*badges`, dan `badges.*desa` juga tidak menghasilkan output.

Kesimpulan:
Endpoint badge per desa belum ditemukan di project.

### 2. Endpoint badge per inovator
Status: Belum ditemukan

Endpoint yang dicari:
- `innovator/:id/badges`
- `innovators/:id/badges`

Hasil pengecekan:
Pencarian dengan pattern `innovator.*badges`, `badges.*innovator`, `innovators.*badges`, dan `badges.*innovators` tidak menghasilkan output.

Kesimpulan:
Endpoint khusus untuk mengambil badge berdasarkan inovator belum ditemukan di project.

### 3. Field kategori pada data inovasi
Status: Ada

Field yang ditemukan:
- `kategori`

File yang ditemukan:
- `src/app/api/innovations/route.ts`
- `src/app/api/innovations/categories/route.ts`

Hasil pengecekan:
Pada endpoint innovations, data inovasi menggunakan field `kategori`. Query parameter yang diterima bernama `category`, tetapi nilai tersebut digunakan untuk memfilter field `kategori`.

Catatan:
Field `kategori` sudah tersedia dan relevan untuk kebutuhan badge Adopter Giat dan Adopter Spesialis.