import axios from 'axios';
import fs from 'fs';
import path from 'path';

const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
const CHAT_ID = 'YOUR_CHAT_ID';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'students.xlsx');

  if (fs.existsSync(filePath)) {
    const fileStream = fs.createReadStream(filePath);
    const form = new FormData();
    form.append('chat_id', CHAT_ID);
    form.append('document', fileStream, 'students.xlsx');

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`;

    try {
      await axios.post(telegramUrl, form, {
        headers: form.getHeaders(),
      });
      res.status(200).json({ message: 'Excel fayli yuborildi' });
    } catch (error) {
      res.status(500).json({ message: 'Telegramga yuborishda xatolik yuz berdi' });
    }
  } else {
    res.status(404).json({ message: 'Excel fayli topilmadi' });
  }
}
