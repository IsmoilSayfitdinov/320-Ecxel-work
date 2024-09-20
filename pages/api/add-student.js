import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, schoolNumber, classNumber, dateOfBirth, fatherName, fatherWorkplace, motherName, motherWorkplace, address, notes } = req.body;

    const filePath = path.join(process.cwd(), '../../public', 'students.xlsx');
    const dirPath = path.join(process.cwd(), '../../public'); // public katalogi

    // public papkasini yaratish, agar mavjud bo'lmasa
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    let workbook;
    let worksheet;

    // Excel fayl mavjudligini tekshirish
    if (fs.existsSync(filePath)) {
      workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(filePath);
      worksheet = workbook.getWorksheet(1);
    } else {
      workbook = new ExcelJS.Workbook();
      worksheet = workbook.addWorksheet('Oquvchilar');
      worksheet.columns = [
        { header: 'F.I.Sh', key: 'fullName', width: 30 },
        { header: 'Maktab raqami', key: 'schoolNumber', width: 15 },
        { header: 'Sinfi', key: 'classNumber', width: 10 },
        { header: 'Tug\'ilgan sanasi', key: 'dateOfBirth', width: 15 },
        { header: 'Otasi F.I.Sh', key: 'fatherName', width: 30 },
        { header: 'Otasi ish joyi', key: 'fatherWorkplace', width: 30 },
        { header: 'Onasi F.I.Sh', key: 'motherName', width: 30 },
        { header: 'Onasi ish joyi', key: 'motherWorkplace', width: 30 },
        { header: 'Yashash manzili', key: 'address', width: 50 },
        { header: 'Izoh', key: 'notes', width: 50 },
      ];
    }

    worksheet.addRow({
      fullName,
      schoolNumber,
      classNumber,
      dateOfBirth,
      fatherName,
      fatherWorkplace,
      motherName,
      motherWorkplace,
      address,
      notes,
    });

    await workbook.xlsx.writeFile(filePath);
    res.status(200).json({ message: 'Ma\'lumotlar saqlandi' });
  } else {
    res.status(405).json({ message: 'Faqat POST so\'rovlar qabul qilinadi' });
  }
}
