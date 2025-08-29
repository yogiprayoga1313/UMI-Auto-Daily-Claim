# UMI Network Daily Claim Bot

Bot otomatis untuk claim daily XP di [odyssey.uminetwork.com](https://odyssey.uminetwork.com).

---

## ✨ Fitur
- Auto claim daily XP UMI Network
- Tampilkan info wallet, streak, referral, dsb
- Tampilan terminal rapi dan informatif

---

## 🚀 Cara Install

1. **Clone repo**
   ```bash
   git clone https://github.com/username/umi-daily-claim.git
   cd umi-daily-claim
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```

---

## ⚙️ Cara Setup

1. **Edit file `umi-daily-claim.js`**
   - Ganti `const WALLET_ADDRESS = '...'` dengan wallet address kamu.
   - Ganti `const COOKIE = '...'` dengan cookie session hasil login di browser.

---

## 🍪 Cara Ambil Cookie Session

1. **Login ke** [https://odyssey.uminetwork.com](https://odyssey.uminetwork.com) **dengan wallet kamu**
2. **Buka Developer Tools** (F12 atau klik kanan → Inspect)
3. **Pilih tab Application**
4. **Di sidebar kiri, klik Cookies → https://odyssey.uminetwork.com**
5. **Cari dan salin value cookie berikut:**
   - `AMP_MKTG_bdf69bf142`
   - `__Host-next-auth.csrf-token`
   - `__Secure-next-auth.callback-url`
   - `AMP_bdf69bf142`
6. **Gabungkan semua value cookie** menjadi satu string, contoh:
   ```
   AMP_MKTG_bdf69bf142=...; __Host-next-auth.csrf-token=...; __Secure-next-auth.callback-url=...; AMP_bdf69bf142=...
   ```
7. **Paste ke variabel `COOKIE` di script.**

---

## ▶️ Cara Menjalankan Bot

```bash
node umi-daily-claim.js
```

---

## 🛡️ Tips Keamanan
- **Jangan share cookie ke orang lain!**
- Jika cookie expired, ulangi langkah ambil cookie.
- Untuk multi-wallet, ulangi proses login dan ambil cookie untuk setiap wallet.

---

## 📄 Contoh Konfigurasi
```js
const WALLET_ADDRESS = '0x123...';
const COOKIE = 'AMP_MKTG_bdf69bf142=...; __Host-next-auth.csrf-token=...; ...';
```

---

## 👨‍💻 Dibuat oleh [thedropsdata](https://thedropsdata.vercel.app)
