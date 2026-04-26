"use client"
import { useState } from 'react';
import AdminLoginModal from './AdminLoginModal';

export default function AdminLoginTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-0 left-0 w-[40px] h-[40px] bg-transparent border-none cursor-default hover:bg-transparent focus:outline-none z-[9999]"
        aria-hidden="true"
        tabIndex={-1}
      />
      {isOpen && <AdminLoginModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
