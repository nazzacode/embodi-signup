import React, { useState } from 'react';

const SignupForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submission logic will go here in later steps
    alert('Form submitted!');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', textAlign: 'left' }}>
      <div>
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email*</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          name="note"
          value={form.note}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm; 