import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), '../../public', 'students.xlsx');
  console.log('File path:', filePath); // Bu yerda log qo'shdik
  const workbook = new ExcelJS.Workbook();

  if (fs.existsSync(filePath)) {
    try {
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet(1);
      const students = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) { // Birinchi qatorni tashlab o'tamiz (sarlavhalar)
          const student = {
            fullName: row.getCell(1).value,
            schoolNumber: row.getCell(2).value,
            class: row.getCell(3).value,
            dob: row.getCell(4).value,
            fatherName: row.getCell(5).value,
            fatherWorkplace: row.getCell(6).value,
            motherName: row.getCell(7).value,
            motherWorkplace: row.getCell(8).value,
            address: row.getCell(9).value,
            notes: row.getCell(10).value
          };
          students.push(student);
        }
      });

      console.log('Students data:', students); // Log: Ma'lumotlarni ko'rib chiqish
      res.status(200).json({ students });
    } catch (error) {
      console.error('Error reading file:', error); // Log: xatoni ko'rsatish
      res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
  } else {
    console.log('File not found:', filePath); // Log: Fayl topilmadi
    res.status(404).json({ message: 'Ma\'lumotlar topilmadi' });
  }
}
