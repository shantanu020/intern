import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent-light/10 blur-[120px] pointer-events-none" />

      <Link href="/" className="flex items-center gap-2 mb-8 relative z-10">
        <Sparkles className="w-6 h-6 text-accent" />
        <span className="font-display font-bold text-2xl tracking-tight text-copy-primary">InternConnect</span>
      </Link>

      <Card className="w-full max-w-md bg-background-secondary/80 backdrop-blur-xl border-edge relative z-10">
        <CardHeader className="space-y-2 text-center pb-6 border-b border-edge/50">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-copy-primary">Email address</label>
            <input 
              type="email" 
              placeholder="you@university.edu" 
              className="w-full h-11 bg-white/5 border border-edge-hover rounded-md px-3 text-copy-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-copy-primary">Password</label>
              <Link href="#" className="text-sm text-accent hover:text-accent-light transition-colors">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full h-11 bg-white/5 border border-edge-hover rounded-md px-3 text-copy-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          
          <Button className="w-full mt-6" size="lg">Sign In</Button>
          
          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-edge"></div>
            <span className="flex-shrink-0 px-4 text-copy-muted text-sm uppercase tracking-wider">Or continue with</span>
            <div className="flex-grow border-t border-edge"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="w-full">Google</Button>
            <Button variant="secondary" className="w-full">GitHub</Button>
          </div>
        </CardContent>
        <CardFooter className="justify-center border-t border-edge/50 pt-6">
          <p className="text-sm text-copy-secondary">
            Don't have an account? <Link href="/signup" className="text-accent hover:text-accent-light font-medium">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
