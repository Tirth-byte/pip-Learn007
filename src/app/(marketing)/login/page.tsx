"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Volume2, VolumeX, Building2 } from "lucide-react";
import { toast } from "sonner";
import { useAppContext } from "@/context/app-context";
import { motion, AnimatePresence } from "framer-motion";

function PipLearnLogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none">
      <path d="M24 8 L38 16 L24 24 L10 16 Z" fill="#000000" />
      <path d="M10 21 L24 29 L38 21 L38 24.5 L24 32.5 L10 24.5 Z" fill="#0066FF" />
      <path d="M10 29.5 L24 37.5 L38 29.5 L38 33 L24 41 L10 33 Z" fill="#000000" />
    </svg>
  );
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Validation state
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  
  // Video state
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { login } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const validateField = useCallback((field: string, value: string, currentMode = mode): string | undefined => {
    switch (field) {
      case "name":
        if (currentMode === "signup" && value.trim().length < 2) return "Name must be at least 2 characters";
        return undefined;
      case "email":
        if (!EMAIL_REGEX.test(value)) return "Please enter a valid email address";
        return undefined;
      case "password":
        if (value.length < 8) return "Password must be at least 8 characters";
        return undefined;
      default:
        return undefined;
    }
  }, [mode]);

  const handleBlur = useCallback((field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  }, [validateField]);

  const isFormValid = 
    (mode === "login" || name.trim().length >= 2) && 
    EMAIL_REGEX.test(email) && 
    password.length >= 8;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    // Force validation on all fields
    const newErrors = {
      name: mode === "signup" ? validateField("name", name) : undefined,
      email: validateField("email", email),
      password: validateField("password", password),
    };
    setErrors(newErrors);
    
    if (newErrors.name || newErrors.email || newErrors.password) return;
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    login({ name: mode === "login" ? "Welcome Back" : name, email });
    toast("Welcome! Setting up your workspace...");
    router.push("/home/");
  };

  const handleOAuth = (provider: string) => {
    toast(`Connecting to ${provider}...`);
    login({ name: `${provider} User`, email: `user@${provider.toLowerCase()}.com` });
    router.push("/home/");
  };

  const inputBaseClass = "w-full h-[52px] px-4 rounded-xl border bg-white text-[15px] text-[#111] placeholder:text-neutral-400 outline-none transition-all";
  
  // Field-specific helper
  const getFieldClass = (field: keyof FieldErrors) => {
    const hasError = (touched[field] || submitAttempted) && errors[field];
    if (hasError) {
      return `${inputBaseClass} border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/15`;
    }
    return `${inputBaseClass} border-black/12 focus:border-black focus:ring-4 focus:ring-black/10`;
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-[100svh] overflow-hidden bg-[#FCFCFA] selection:bg-neutral-200 selection:text-black">
      
      {/* LEFT: Cinematic Product Video (70-72%) */}
      <div className="product-video-stage relative w-full h-[30svh] md:h-full md:w-[70vw] lg:w-[72vw] shrink-0 bg-black overflow-hidden hidden md:block">
        
        {/* 1. Blurred Background Video (Preserves ratio without black bars) */}
        <video 
          src="/videos/piplearn-launch.mp4"
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover scale-[1.05] blur-[32px] opacity-80 pointer-events-none"
        />
        
        {/* 2. Sharp Foreground Video (Preserves full frame) */}
        <video 
          ref={videoRef}
          src="/videos/piplearn-launch.mp4"
          autoPlay muted={isMuted} loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />

        {/* 3. Removed edge gradients, leaving a perfectly sharp border */}
        
        {/* 4. Small Context Overlay */}
        <div className="absolute bottom-6 left-6 z-30 flex items-center gap-3">
          <button 
            onClick={() => setIsMuted(!isMuted)} 
            aria-label={isMuted ? "Unmute product video" : "Mute product video"}
            className="size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors border border-white/10 shadow-sm cursor-pointer"
          >
            {isMuted ? <VolumeX className="size-[16px]" /> : <Volume2 className="size-[16px]" />}
          </button>
          
          <div className="h-10 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-sm select-none">
            <span className="text-white text-[12px] font-semibold tracking-wider uppercase opacity-90">
              Live Product Preview
            </span>
          </div>
        </div>

        {/* 5. Video Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/20 z-30">
          <div 
            className="h-full bg-white/60 transition-all duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* MOBILE ONLY VIDEO PREVIEW */}
      <div className="product-video-stage relative w-full h-[28svh] shrink-0 bg-black overflow-hidden md:hidden">
        <video 
          src="/videos/piplearn-launch.mp4"
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover scale-[1.05] blur-[24px] opacity-80"
        />
        <video 
          src="/videos/piplearn-launch.mp4"
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-contain z-10"
        />
      </div>

      {/* RIGHT: Restrained Auth Panel */}
      <div className="flex-1 w-full md:w-[clamp(400px,29vw,470px)] md:shrink-0 h-[72svh] md:h-full bg-[#FCFCFA] relative z-40 flex flex-col justify-between overflow-y-auto border-t border-black/10 md:border-t-0 md:border-l md:border-[rgba(0,0,0,0.08)]">
        
        {/* Main form vertically centered optically (padding helps push it slightly up) */}
        <div className="w-full px-[clamp(32px,3vw,52px)] flex-1 flex flex-col pt-[12vh] pb-8 md:justify-center md:pt-0">
          <div className="w-full max-w-[360px] mx-auto md:mb-[4svh]">
            
            {/* Logo */}
            <div className="mb-[36px]">
              <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                <PipLearnLogoMark className="size-10" />
              </Link>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={mode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Heading */}
                <h1 className="text-[clamp(40px,3vw,48px)] leading-[1.02] tracking-[-0.025em] font-serif text-[#111] mb-2">
                  {mode === "login" ? "Welcome back." : "Create your account."}
                </h1>
                <p className="text-[16px] text-neutral-500 leading-relaxed mb-[36px]">
                  {mode === "login" ? "Continue building where you left off." : "Start learning by building real software."}
                </p>

                <form onSubmit={handleAuth} noValidate>
                  {mode === "signup" && (
                    <div className="mb-[18px]">
                      <label htmlFor="name" className="text-[13px] font-medium text-[#111] mb-[6px] block">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (touched.name) setErrors(prev => ({ ...prev, name: validateField("name", e.target.value) }));
                        }}
                        onBlur={() => handleBlur("name", name)}
                        className={getFieldClass("name")}
                      />
                      {(touched.name || submitAttempted) && errors.name && (
                        <p className="text-[13px] text-red-500 mt-[6px]">{errors.name}</p>
                      )}
                    </div>
                  )}

                  <div className="mb-[18px]">
                    <label htmlFor="email" className="text-[13px] font-medium text-[#111] mb-[6px] block">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (touched.email) setErrors(prev => ({ ...prev, email: validateField("email", e.target.value) }));
                      }}
                      onBlur={() => handleBlur("email", email)}
                      className={getFieldClass("email")}
                    />
                    {(touched.email || submitAttempted) && errors.email && (
                      <p className="text-[13px] text-red-500 mt-[6px]">{errors.email}</p>
                    )}
                  </div>

                  <div className="mb-[24px]">
                    <div className="flex items-center justify-between mb-[6px]">
                      <label htmlFor="password" className="text-[13px] font-medium text-[#111] block">
                        Password
                      </label>
                      {mode === "login" && (
                        <Link href="#" className="text-[12px] text-neutral-400 hover:text-black transition-colors font-medium">
                          Forgot password?
                        </Link>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (touched.password) setErrors(prev => ({ ...prev, password: validateField("password", e.target.value) }));
                        }}
                        onBlur={() => handleBlur("password", password)}
                        className={`${getFieldClass("password")} pr-[44px]`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-[4px] top-1/2 -translate-y-1/2 w-[36px] h-[36px] flex items-center justify-center text-neutral-400 hover:text-black transition-colors cursor-pointer rounded-lg"
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="size-[16px]" /> : <Eye className="size-[16px]" />}
                      </button>
                    </div>
                    {(touched.password || submitAttempted) && errors.password && (
                      <p className="text-[13px] text-red-500 mt-[6px]">{errors.password}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-[52px] bg-[#111] hover:bg-black disabled:bg-[#f1f1f1] disabled:text-neutral-400 disabled:cursor-not-allowed text-white font-semibold text-[15px] rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-[1px] hover:shadow-sm active:scale-[0.99] active:translate-y-0 active:shadow-none mb-[28px] cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <span>{mode === "login" ? "Continue" : "Create account"}</span>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-[20px]">
                  <div className="h-[1px] bg-black/[0.06] flex-1" />
                  <span className="text-[12px] text-neutral-400 font-medium uppercase tracking-wider">or</span>
                  <div className="h-[1px] bg-black/[0.06] flex-1" />
                </div>

                {/* Social Auth (3x2 Grid -> Clean 3-col Grid) */}
                <div className="grid grid-cols-3 gap-2 mb-[32px]">
                  <button onClick={() => handleOAuth("Google")} aria-label="Continue with Google" className="h-[44px] border border-black/10 rounded-xl bg-white hover:bg-black/[0.02] flex items-center justify-center transition-colors cursor-pointer">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </button>

                  <button onClick={() => handleOAuth("GitHub")} aria-label="Continue with GitHub" className="h-[44px] border border-black/10 rounded-xl bg-white hover:bg-black/[0.02] flex items-center justify-center transition-colors cursor-pointer text-[#111]">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </button>

                  <button onClick={() => handleOAuth("Apple")} aria-label="Continue with Apple" className="h-[44px] border border-black/10 rounded-xl bg-white hover:bg-black/[0.02] flex items-center justify-center transition-colors cursor-pointer text-[#111]">
                    <svg viewBox="0 0 384 512" className="w-[18px] h-[18px]" fill="currentColor">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                  </button>

                  <button onClick={() => handleOAuth("Microsoft")} aria-label="Continue with Microsoft" className="h-[44px] border border-black/10 rounded-xl bg-white hover:bg-black/[0.02] flex items-center justify-center transition-colors cursor-pointer">
                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
                      <rect x="2" y="2" width="9.5" height="9.5" fill="#F25022" />
                      <rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00" />
                      <rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
                      <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
                    </svg>
                  </button>

                  <button onClick={() => handleOAuth("Passkey")} aria-label="Continue with Passkey" className="h-[44px] border border-black/10 rounded-xl bg-white hover:bg-black/[0.02] flex items-center justify-center transition-colors cursor-pointer text-[#111]">
                    <svg viewBox="0 0 16 16" className="w-[18px] h-[18px]" fill="currentColor">
                      <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                    </svg>
                  </button>

                  <button onClick={() => handleOAuth("SSO")} aria-label="Continue with SSO" className="h-[44px] border border-black/10 rounded-xl bg-white hover:bg-black/[0.02] flex items-center justify-center transition-colors cursor-pointer text-[#111]">
                    <Building2 className="w-[18px] h-[18px]" />
                  </button>
                </div>

                <div className="text-center">
                  <button 
                    type="button" 
                    onClick={() => {
                      setMode(mode === 'login' ? 'signup' : 'login');
                      setErrors({});
                      setTouched({});
                      setSubmitAttempted(false);
                    }} 
                    className="text-[14px] text-neutral-500 hover:text-black transition-colors"
                  >
                    {mode === 'login' ? (
                      <>Don't have an account? <span className="text-black font-medium underline underline-offset-4 decoration-black/20 hover:decoration-black/40">Create account</span></>
                    ) : (
                      <>Already have an account? <span className="text-black font-medium underline underline-offset-4 decoration-black/20 hover:decoration-black/40">Sign in</span></>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Minimal Auth Footer */}
        <div className="w-full px-[clamp(32px,3vw,52px)] pb-6 flex items-center justify-start">
          <span className="text-[12px] font-medium text-neutral-400">© {new Date().getFullYear()} PipLearn</span>
        </div>
      </div>
    </div>
  );
}
