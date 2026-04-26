"use client"
import { useEffect, useState } from 'react';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials', { headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` } })
      .then(res => res.json())
      .then(data => { setTestimonials(data); setLoading(false); });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Testimonials Manager</h1>
        <button className="px-4 py-2 bg-[var(--primary-accent)] text-black font-bold rounded-lg">Add Testimonial</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-1">{testimonial.clientName}</h3>
            <p className="text-white/40 text-sm mb-4">{testimonial.businessName}</p>
            <p className="text-white/80 italic text-sm mb-4">"{testimonial.quote}"</p>
            <div className="flex gap-2">
              <button className="text-sm px-3 py-1 bg-white/10 rounded hover:bg-white/20 transition">Edit</button>
              <button className="text-sm px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
