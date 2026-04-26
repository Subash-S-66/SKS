"use client"
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replying, setReplying] = useState(false);

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiries', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      if (res.ok) setEnquiries(await res.json());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEnquiries(); }, []);

  const handleReply = async () => {
    if (!replyMessage.trim()) return;
    setReplying(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry._id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ message: replyMessage })
      });
      if (res.ok) {
        setReplyMessage('');
        setSelectedEnquiry(null);
        fetchEnquiries();
      }
    } finally {
      setReplying(false);
    }
  };

  if (loading) return <div>Loading enquiries...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Enquiries Manager</h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-medium text-white/60">Date</th>
              <th className="p-4 font-medium text-white/60">Name</th>
              <th className="p-4 font-medium text-white/60">Service</th>
              <th className="p-4 font-medium text-white/60">Status</th>
              <th className="p-4 font-medium text-white/60">Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4">{format(new Date(enq.createdAt), 'MMM d, yyyy')}</td>
                <td className="p-4">{enq.name}</td>
                <td className="p-4">{enq.serviceInterestedIn || '-'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${enq.status === 'New' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {enq.status}
                  </span>
                </td>
                <td className="p-4">
                  <button onClick={() => setSelectedEnquiry(enq)} className="text-[var(--primary-accent)] hover:underline text-sm">View</button>
                </td>
              </tr>
            ))}
            {enquiries.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-white/50">No enquiries found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Enquiry Details</h2>
              <button onClick={() => setSelectedEnquiry(null)} className="text-white/50 hover:text-white">Close</button>
            </div>

            <div className="space-y-4 mb-8">
              <div><span className="text-white/50 text-sm">Name:</span> {selectedEnquiry.name}</div>
              <div><span className="text-white/50 text-sm">Email:</span> {selectedEnquiry.email}</div>
              <div><span className="text-white/50 text-sm">Service:</span> {selectedEnquiry.serviceInterestedIn || 'N/A'}</div>
              <div className="bg-black/50 p-4 rounded-lg mt-2 border border-white/5">{selectedEnquiry.message}</div>
            </div>

            {selectedEnquiry.replies?.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold mb-4">Replies History</h3>
                <div className="space-y-4">
                  {selectedEnquiry.replies.map((reply: any, idx: number) => (
                    <div key={idx} className="bg-white/5 p-4 rounded-lg">
                      <div className="text-xs text-white/50 mb-2">{format(new Date(reply.sentAt), 'PPpp')}</div>
                      <div>{reply.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-bold mb-4">Send Reply</h3>
              <textarea
                rows={4}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
                className="w-full bg-black/50 border border-white/10 rounded-lg p-4 focus:outline-none focus:border-[var(--primary-accent)] mb-4"
              />
              <button
                onClick={handleReply}
                disabled={replying || !replyMessage.trim()}
                className="px-6 py-2 bg-[var(--primary-accent)] text-black font-bold rounded-lg disabled:opacity-50"
              >
                {replying ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
