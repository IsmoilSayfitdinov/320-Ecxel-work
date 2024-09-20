import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), '../../public', 'students.xlsx');

  if (fs.existsSync(filePath)) {
    const workbook = new ExcelJS.Workbook();
    try {
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.getWorksheet(1);
      const data = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) {
          data.push({
            fullName: row.getCell(1).value,
            schoolNumber: row.getCell(2).value,
            class: row.getCell(3).value,
            dob: row.getCell(4).value,
            fatherName: row.getCell(5).value,
            fatherWorkplace: row.getCell(6).value,
            motherName: row.getCell(7).value,
            motherWorkplace: row.getCell(8).value,
            address: row.getCell(9).value,
            notes: row.getCell(10).value,
          });
        }
      });

      res.status(200).json(data);
    } catch (error) {
      console.error("Error reading Excel file:", error);
      res.status(500).json({ message: 'Faylni o\'qishda xato yuz berdi' });
    }
  } else {
    res.status(404).json({ message: 'Excel fayli topilmadi' });
  }
}
