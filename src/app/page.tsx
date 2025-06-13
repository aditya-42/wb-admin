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
          <h1 className="text-4xl font-bold">WorldBridge Mobile</h1>
          <p className="text-muted-foreground">
            Manage incident reports from anywhere with our mobile companion app.
          </p>
          <Button size="lg">Download Now</Button>
        </section>
        <section id="features" className="grid md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Manage On&nbsp;the&nbsp;Go</CardTitle>
              <CardDescription>Review reports from your phone</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              Stay connected even when you&#39;re away from the desk.
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Realtime Alerts</CardTitle>
              <CardDescription>Get notified instantly</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              Receive push notifications for new reports.
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Secure Access</CardTitle>
              <CardDescription>Your data is protected</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              Built with modern security best practices.
            </CardContent>
          </Card>
        </section>
        <section id="about" className="space-y-4">
          <h2 className="text-2xl font-bold">About</h2>
          <p>WorldBridge Mobile complements this admin portal, allowing field agents to submit and track reports effortlessly.</p>
        </section>
        <section id="contact" className="space-y-4">
          <h2 className="text-2xl font-bold">Contact</h2>
          <p>Reach us at support@worldbridge.app.</p>
        </section>
      </main>
      <Footer />
    </>
  )
}
