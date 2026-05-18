import { authClient } from '#/lib/auth-client'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { toast } from 'sonner'
export default function LoginForm({ redirectTo }: { redirectTo?: string }) {
  const navitage = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState<'github' | 'google' | null>(
    null,
  )

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    try {
      setIsSubmitting(provider)
      await authClient.signIn.social({
        provider,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Logged in Successfully 👍🏼 !!')
            // const internalRedirect = toInternalPath
            navitage({ to: '/' })
          },
          onError: ({ error }) => {
            toast.error(error.message || 'Failed to Login. Please try again')
            setIsSubmitting(null)
          },
        },
      })
    } catch (error) {
      toast.error('Failed to Login. Please try again')
      setIsSubmitting(null)
    }
  }
  return (
    <div className="w-full">
      <div className="space-y-4">
        <Button
          variant="outline"
          className="flex h-12 w-full items-center justify-center gap-3 border-white/10 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white"
          onClick={() => handleSocialLogin('github')}
          disabled={isSubmitting !== null}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-2.782.605-3.37-1.343-3.37-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.07 1.532 1.033 1.532 1.033.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.447-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.547 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.481A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          {isSubmitting === 'github'
            ? 'Redirecting....'
            : 'Continue with GitHub'}
        </Button>

        <Button
          className="flex h-12 w-full items-center justify-center gap-3 bg-white text-black hover:bg-zinc-200"
          onClick={() => handleSocialLogin('google')}
          disabled={isSubmitting !== null}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.5-6.5 6.8l6.2 5.2C38.7 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"
            />
          </svg>
          {isSubmitting === 'google'
            ? 'Redirecting....'
            : 'Continue with Google'}
        </Button>
      </div>

      {/* <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-3 text-zinc-500">
            Or continue with email
          </span>
        </div>
      </div> */}

      {/* <form className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-zinc-300">Email</label>
          <input
            type="email"
            placeholder="hello@example.com"
            className="h-12 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 outline-none ring-0 placeholder:text-zinc-500 focus:border-zinc-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-zinc-300">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className="h-12 w-full rounded-xl border border-white/10 bg-zinc-900 px-4 outline-none ring-0 placeholder:text-zinc-500 focus:border-zinc-500"
          />
        </div>

        <Button className="h-12 w-full bg-white text-black font-semibold hover:bg-zinc-200">
          Sign In
        </Button>
      </form> */}

      {/* <p className="mt-6 text-center text-sm text-zinc-500">
        Don&apos;t have an account?{' '}
        <span className="text-white hover:underline cursor-pointer">
          Sign up
        </span>
      </p> */}
      <p className="mt-6 text-center text-sm text-zinc-500">
        By signing in you agree our Term of Services and Privacy Policy.
        {/* <span className="text-white hover:underline cursor-pointer">
          Sign up
        </span> */}
      </p>
    </div>
  )
}
