export default function Footer() {
  return (
    <footer className="w-full border-t mt-12 bg-background">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Shadcn Landing. All rights reserved.
      </div>
    </footer>
  )
}
