'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-20 space-y-20">
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to Shadcn Landing</h1>
          <p className="text-muted-foreground">Build beautiful UIs with Next.js and shadcn/ui.</p>
          <Button size="lg">Get Started</Button>
        </section>
        <section id="features" className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Easy to Use</CardTitle>
              <CardDescription>Components built with Tailwind CSS</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              Create consistent interfaces quickly.
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Responsive</CardTitle>
              <CardDescription>Works on all devices</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              Layout adapts to any screen size.
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Open Source</CardTitle>
              <CardDescription>MIT licensed components</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              Customize them to fit your needs.
            </CardContent>
          </Card>
        </section>
        <section id="about" className="space-y-4">
          <h2 className="text-2xl font-bold">About</h2>
          <p>Shadcn Landing is a demo project using shadcn/ui with Next.js 15.</p>
        </section>
        <section id="contact" className="space-y-4">
          <h2 className="text-2xl font-bold">Contact</h2>
          <p>Email us at contact@example.com.</p>
        </section>
      </main>
      <Footer />
    </>
  )
}
