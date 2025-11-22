import React, { useState } from 'react';

// Responsive property form for adding/editing listings
const PropertyForm = ({ onSubmit, initialValues = {} }) => {
  const [form, setForm] = useState({
    title: initialValues.title || '',
    price: initialValues.price || '',
    location: initialValues.location || '',
    size: initialValues.size || '',
    status: initialValues.status || 'available',
    dealInitiator: initialValues.dealInitiator || '',
    image: initialValues.image || '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form className="bg-white rounded-lg shadow-md p-4 max-w-full md:max-w-2xl mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border rounded px-3 py-2 w-full" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="border rounded px-3 py-2 w-full" required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border rounded px-3 py-2 w-full" required />
      <input name="size" value={form.size} onChange={handleChange} placeholder="Size (e.g. 500 sqm)" className="border rounded px-3 py-2 w-full" required />
      <select name="status" value={form.status} onChange={handleChange} className="border rounded px-3 py-2 w-full">
        <option value="available">Available</option>
        <option value="pending">Pending</option>
        <option value="sold">Sold</option>
      </select>
      <input name="dealInitiator" value={form.dealInitiator} onChange={handleChange} placeholder="Deal Initiator Name" className="border rounded px-3 py-2 w-full" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border rounded px-3 py-2 w-full" />
      <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700">Save Property</button>
    </form>
  );
};

export default PropertyForm;
