
import React, { useState, useEffect, useCallback } from 'react';
import { VerificationStep } from './types';
import { Icons, SOCIAL_CONFIG } from './constants';
import StepButton from './components/StepButton';

const App: React.FC = () => {
  const [step, setStep] = useState<VerificationStep>(VerificationStep.IDLE);
  const [timer, setTimer] = useState<number>(10);
  const [showCanvaLink, setShowCanvaLink] = useState<boolean>(false);

  // Countdown logic
  useEffect(() => {
    let interval: any;
    if ((step === VerificationStep.IG_FOLLOWING || step === VerificationStep.TIKTOK_FOLLOWING) && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      if (step === VerificationStep.IG_FOLLOWING) {
        setStep(VerificationStep.IG_DONE);
      } else if (step === VerificationStep.TIKTOK_FOLLOWING) {
        setStep(VerificationStep.UNLOCKED);
        setTimeout(() => setShowCanvaLink(true), 300);
      }
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleFollowIG = useCallback(() => {
    window.open(SOCIAL_CONFIG.igUrl, '_blank');
    setStep(VerificationStep.IG_FOLLOWING);
    setTimer(10);
  }, []);

  const handleFollowTikTok = useCallback(() => {
    window.open(SOCIAL_CONFIG.tiktokUrl, '_blank');
    setStep(VerificationStep.TIKTOK_FOLLOWING);
    setTimer(10);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Decorative Blobs */}
      <div className="blob -top-24 -left-24 animate-pulse" />
      <div className="blob -bottom-24 -right-24 animate-pulse" style={{ animationDelay: '1s', background: 'radial-gradient(circle, rgba(219, 39, 119, 0.1) 0%, rgba(219, 39, 119, 0) 70%)' }} />

      <div className="max-w-md w-full relative z-10">
        <div className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-2xl space-y-10 border-white/5">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full" />
              <div className="relative inline-flex p-5 rounded-3xl bg-slate-800 border border-slate-700 text-purple-400 shadow-xl">
                <Icons.Canva />
              </div>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Canva <span className="gradient-text">Pro</span>
              </h1>
              <p className="text-slate-400 text-base leading-relaxed font-medium">
                Dapatkan akses premium dengan verifikasi sosial media Anda. Cepat & Mudah.
              </p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="h-16 relative">
            {(step === VerificationStep.IG_FOLLOWING || step === VerificationStep.TIKTOK_FOLLOWING) ? (
              <div className="absolute inset-0 bg-blue-500/5 border border-blue-500/20 p-4 rounded-2xl flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                <div className="flex-shrink-0 w-3 h-3 rounded-full bg-blue-500 animate-ping" />
                <p className="text-blue-400 font-semibold text-sm leading-tight">
                  Verifikasi sedang berjalan...<br/>
                  <span className="text-[10px] font-bold uppercase opacity-60">Jangan tutup halaman ini</span>
                </p>
              </div>
            ) : step === VerificationStep.UNLOCKED ? (
              <div className="absolute inset-0 bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-4">
                <div className="p-1.5 bg-emerald-500 rounded-full text-slate-900">
                  <Icons.Check />
                </div>
                <p className="text-emerald-400 font-bold text-sm">Akses Terbuka! Silakan klaim link Anda.</p>
              </div>
            ) : null}
          </div>

          {/* Verification Steps */}
          <div className="space-y-4">
            <StepButton
              label="Follow Instagram"
              icon={<Icons.Instagram />}
              isActive={step === VerificationStep.IDLE}
              isCompleted={step !== VerificationStep.IDLE && step !== VerificationStep.IG_FOLLOWING}
              isLoading={step === VerificationStep.IG_FOLLOWING}
              timer={timer}
              onClick={handleFollowIG}
              disabled={step !== VerificationStep.IDLE}
            />

            <StepButton
              label="Follow TikTok"
              icon={<Icons.TikTok />}
              isActive={step === VerificationStep.IG_DONE}
              isCompleted={step === VerificationStep.UNLOCKED}
              isLoading={step === VerificationStep.TIKTOK_FOLLOWING}
              timer={timer}
              onClick={handleFollowTikTok}
              disabled={step !== VerificationStep.IG_DONE}
            />
          </div>

          {/* Unlocked Section */}
          {showCanvaLink && (
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-slate-900 rounded-2xl p-6 text-center space-y-5 border border-white/5">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white tracking-tight italic">READY TO DESIGN?</h3>
                    <p className="text-slate-500 text-sm font-medium">Klik tombol untuk masuk ke tim.</p>
                  </div>
                  
                  <a
                    href={SOCIAL_CONFIG.canvaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black rounded-xl text-base hover:scale-[1.02] transition-all shadow-xl shadow-purple-500/20 uppercase tracking-widest active:scale-95"
                  >
                    Klaim Canva Pro
                  </a>
                  
                  <div className="flex items-center justify-center gap-1.5 opacity-40">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">Slots Available Now</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Updated Footer */}
        <footer className="mt-12 text-center">
          <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity">
            &copy;2026 Amrz Creative. All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
