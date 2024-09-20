"use client";
import React, { useEffect, useState } from 'react';

const ViewData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/view-data');
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDownload = () => {
    window.location.href = '/api/get-excel';
  };

  if (loading) return <div>Yuklanmoqda...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>O'quvchilar Ro'yxati</h1>
      <button onClick={handleDownload} style={styles.downloadButton}>Excelni Yuklab Olish</button>
      <button style={styles.back}><a style={{ textDecoration: 'none', color: 'white' }} href='/'>Orqaga</a></button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.header}>F.I.Sh</th>
            <th style={styles.header}>Maktab Raqami</th>
            <th style={styles.header}>Sinfi</th>
            <th style={styles.header}>Tug'ilgan Sanasi</th>
            <th style={styles.header}>Otasining F.I.Sh</th>
            <th style={styles.header}>Otasi Ish Joyi</th>
            <th style={styles.header}>Onasining F.I.Sh</th>
            <th style={styles.header}>Onasi Ish Joyi</th>
            <th style={styles.header}>Yashash Manzili</th>
            <th style={styles.header}>Izoh</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td style={styles.cell}>{student.fullName}</td>
              <td style={styles.cell}>{student.schoolNumber}</td>
              <td style={styles.cell}>{student.class}</td>
              <td style={styles.cell}>{student.dob}</td>
              <td style={styles.cell}>{student.fatherName}</td>
              <td style={styles.cell}>{student.fatherWorkplace}</td>
              <td style={styles.cell}>{student.motherName}</td>
              <td style={styles.cell}>{student.motherWorkplace}</td>
              <td style={styles.cell}>{student.address}</td>
              <td style={styles.cell}>{student.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  downloadButton: {
    marginBottom: '20px',
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  downloadButtonHover: {
    backgroundColor: '#45a049',
  },
  back: {
    backgroundColor: '#45a049',
    marginLeft: '20px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  header: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    border: '1px solid #ddd',
  },
  cell: {
    padding: '10px',
    border: '1px solid #ddd',
  },
};

export default ViewData;
