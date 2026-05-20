import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LogOut, User, FileChartColumn } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import { Link, useRouter } from '@tanstack/react-router'
import { ModeToggle } from './mode-toggle'

export default function Navbar() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  const handleLogout = async () => {
    await authClient.signOut()
    router.navigate({ to: '/login' })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Navbar Logo  */}
        <Link to="/">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black shadow-lg">
              <FileChartColumn className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                SlideGPT
              </h1>
              <p className="text-xs text-zinc-400">AI Presentation Generator</p>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button
              variant="outline"
              className="hidden border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white md:flex"
            >
              Dashboard
            </Button>
          </Link>

          {isPending ? (
            <div className="size-9 rounded-full bg-muted animate-pulse" />
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative size-9 rounded-full p-0"
                >
                  <Avatar className="size-9 border-2 border-primary/30">
                    <AvatarImage
                      src={session.user.image!}
                      alt={session.user.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {session.user.name ? (
                        session.user.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="size-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 glass border-border/50"
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{session.user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="mr-2 size-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              size="sm"
              className="hidden border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white md:flex"
            >
              <Link to="/login">Sign in</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
