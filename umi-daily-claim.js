const axios = require('axios');
const chalk = require('chalk').default;

// Ganti dengan wallet address kamu
const WALLET_ADDRESS = '';

// Cookie yang diberikan user
const COOKIE = '';

function formatDate(dateStr) {
  if (!dateStr) return '-';
  try {
    // Konversi ke waktu Asia/Jakarta (WIB)
    const date = new Date(dateStr);
    return date.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false });
  } catch {
    return dateStr;
  }
}

function printBoxed(msg, color = chalk.white) {
  const lines = msg.split('\n');
  const width = Math.max(...lines.map(l => l.length));
  const border = '─'.repeat(width + 2);
  console.log(color(`┌${border}┐`));
  lines.forEach(line => {
    console.log(color(`│ ${line.padEnd(width)} │`));
  });
  console.log(color(`└${border}┘`));
}

function printHeader() {
  const header = [
    'Wallet Auto Claim Daily UMI',
    'Dibuat oleh https://thedropsdata.vercel.app'
  ];
  printBoxed(header.join('\n'), chalk.blueBright.bold);
}

function printUserInfo(player) {
  const lines = [];
  lines.push(`Wallet: ${player.walletAddress}`);
  lines.push(`XP: ${player.xp}`);
  lines.push(`Level: ${player.level}`);
  lines.push(`Coins: ${player.coins}`);
  lines.push(`Streak: ${player.streakData?.currentStreak || 0} (Longest: ${player.streakData?.longestStreak || 0})`);
  lines.push(`Last Daily XP: ${formatDate(player.streakData?.lastDailyXpCollectionDate)}`);
  lines.push(`Streak Collected Today: ${player.streakData?.streakXpCollectedToday ? 'Yes' : 'No'}`);
  lines.push(`Last Login: ${formatDate(player.streakData?.lastLoginDate)}`);
  lines.push(`Referral Code: ${player.referralCode}`);
  lines.push(`Total Referrals: ${player.referralStats?.totalReferrals || 0}`);
  lines.push(`Total Referral XP: ${player.referralStats?.totalReferralXP || 0}`);
  lines.push(`Twitter Connected: ${player.connectedAccounts?.twitter?.connected ? 'Yes' : 'No'}`);
  lines.push(`Discord Connected: ${player.connectedAccounts?.discord?.connected ? 'Yes' : 'No'}`);
  lines.push(`Verified: ${player.isVerified ? 'Yes' : 'No'}`);
  printBoxed(lines.join('\n'), chalk.magenta);
}

async function claimDailyXP() {
  try {
    printHeader();
    // Cek koneksi (cookie valid?) dengan get streak
    let streakRes;
    try {
      streakRes = await axios.get(
        `https://odyssey.uminetwork.com/api/players?walletAddress=${WALLET_ADDRESS}`,
        {
          headers: {
            'accept': '*/*',
            'cookie': COOKIE,
            'referer': 'https://odyssey.uminetwork.com/quests?type=daily',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          }
        }
      );
      printBoxed('Berhasil connect ke wallet dengan cookie!\nWallet: ' + WALLET_ADDRESS, chalk.green);
    } catch (err) {
      printBoxed('Gagal connect ke wallet!\nCek cookie atau wallet address.', chalk.red);
      return;
    }

    // Claim daily XP
    let claimRes;
    try {
      claimRes = await axios.post(
        'https://odyssey.uminetwork.com/api/players/daily-xp',
        { walletAddress: WALLET_ADDRESS },
        {
          headers: {
            'accept': '*/*',
            'content-type': 'application/json',
            'cookie': COOKIE,
            'origin': 'https://odyssey.uminetwork.com',
            'referer': 'https://odyssey.uminetwork.com/quests?type=daily',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          }
        }
      );
      printBoxed('✅ Berhasil claim daily XP!\n' + JSON.stringify(claimRes.data, null, 2), chalk.green);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error === 'Daily XP already collected today') {
        printBoxed('ℹ️  Daily XP sudah di-claim hari ini!\nStreak: ' + err.response.data.currentStreak + '\nNext claim: ' + formatDate(err.response.data.nextCollectionTime), chalk.yellow);
      } else {
        printBoxed('❌ Gagal claim daily XP!\n' + (err.response ? JSON.stringify(err.response.data, null, 2) : err.message), chalk.red);
      }
    }

    // Tampilkan info user lengkap
    if (streakRes && streakRes.data) {
      printUserInfo(streakRes.data);
    }
  } catch (err) {
    printBoxed('Terjadi error tidak terduga:\n' + err.message, chalk.red);
  }
}

claimDailyXP();
