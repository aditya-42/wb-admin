'use client'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="w-full bg-background sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold">Shadcn Landing</Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="#features" className="hover:underline">Features</Link>
          <Link href="#about" className="hover:underline">About</Link>
          <Link href="#contact" className="hover:underline">Contact</Link>
          <Button size="sm">Get Started</Button>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col p-4 gap-2">
            <Link href="#features" onClick={() => setOpen(false)} className="py-2">Features</Link>
            <Link href="#about" onClick={() => setOpen(false)} className="py-2">About</Link>
            <Link href="#contact" onClick={() => setOpen(false)} className="py-2">Contact</Link>
            <Button className="w-full" size="sm" onClick={() => setOpen(false)}>Get Started</Button>
          </nav>
        </div>
      )}
    </header>
  )
}
