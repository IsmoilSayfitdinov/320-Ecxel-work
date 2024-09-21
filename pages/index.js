import Link from 'next/link';
import React, { useState } from 'react';

export default function StudentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    schoolNumber: '',
    classNumber: '',
    dateOfBirth: '',
    fatherName: '',
    fatherWorkplace: '',
    motherName: '',
    motherWorkplace: '',
    address: '',
    notes: '',
  });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${apiUrl}/api/add-student`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert('Ma\'lumotlar muvaffaqiyatli saqlandi!');
      setFormData({
        fullName: '',
        schoolNumber: '',
        classNumber: '',
        dateOfBirth: '',
        fatherName: '',
        fatherWorkplace: '',
        motherName: '',
        motherWorkplace: '',
        address: '',
        notes: '',
      });
    } else {
      alert('Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
    }
  };

  return (
    <div  style={styles.container}>
      <p><Link style={{ textDecoration: 'none', color: '#333', fontSize: '18px', marginLeft: '20px'}} href="/view">Barcha o'quvchilar</Link></p>
      <h1 style={styles.title}>O'quvchi ma'lumotlarini kiritish formasi</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="fullName"
          placeholder="To'liq ismi"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="schoolNumber"
          placeholder="Maktab raqami"
          value={formData.schoolNumber}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="classNumber"
          placeholder="Sinf raqami"
          value={formData.classNumber}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="fatherName"
          placeholder="Otasi F.I.Sh."
          value={formData.fatherName}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="fatherWorkplace"
          placeholder="Otasi ish joyi"
          value={formData.fatherWorkplace}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="motherName"
          placeholder="Onasi F.I.Sh."
          value={formData.motherName}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="motherWorkplace"
          placeholder="Onasi ish joyi"
          value={formData.motherWorkplace}
          onChange={handleChange}
        />
        <input
          style={styles.input}
          type="text"
          name="address"
          placeholder="Yashash manzili"
          value={formData.address}
          onChange={handleChange}
        />
        <textarea
          style={styles.textarea}
          name="notes"
          placeholder="Izoh"
          value={formData.notes}
          onChange={handleChange}
        />
        <button type="submit" style={styles.button}>Yuborish</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    marginTop: '100px',
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    height: '100px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  
};
