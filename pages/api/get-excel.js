import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), '../../public', 'students.xlsx');

  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=students.xlsx');
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ message: 'Excel fayli topilmadi' });
  }
}
