import React, { useState } from "react";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Wrench, ShieldAlert, Mail, Lock, User as UserIcon } from "lucide-react";

interface LoginScreenProps {
  onLoginSuccess: (user: any) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fallback direct Gmail login for iframe testing
  const [directGmail, setDirectGmail] = useState("");
  const [showDirectInput, setShowDirectInput] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        onLoginSuccess(result.user);
      }
    } catch (err: any) {
      console.error("Google Auth error:", err);
      setError(
        "ລະບົບປ໊ອບອັບລັອກອິນຖືກບລັອກໃນ iFrame. ກະລຸນາໃຊ້ການປ້ອນ Gmail ໂດຍກົງດ້ານລຸ່ມເພື່ອທົດສອບ."
      );
      setShowDirectInput(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directGmail || !directGmail.includes("@")) {
      setError("ກະລຸນາປ້ອນທີ່ຢູ່ Gmail ທີ່ຖືກຕ້ອງ");
      return;
    }
    const mockUser = {
      uid: "direct_" + Date.now(),
      email: directGmail,
      displayName: directGmail.split("@")[0].toUpperCase(),
      photoURL: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZfEifqowFal6I90ndbd0OeQP3FDZ6YK7fXN5pJccPUnsWx6dAieXP_dZBDemXHOGYzUMsZngcbIy3fz6Ce786Ju1qqo9gDuwOl7VgfiynwIE8KZwuAOy8SuAlifIEq6e5smOKn-eZemgO8yvApnRR0Mi-Z7wiz1pTkb4j9lHola3Nlq4FKsylWv_bWQSK68_NX9Vp5jOfMUUVWGyp1rM3EoFi8o5xv7yc85iqifDaxp2c5UWcrrXDeQ",
    };
    onLoginSuccess(mockUser);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("ກະລຸນາກອກຂໍ້ມູນໃຫ້ຄົບຖ້ວນ");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: displayName || email.split("@")[0] });
        onLoginSuccess(cred.user);
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        onLoginSuccess(cred.user);
      }
    } catch (err: any) {
      console.error(err);
      setError("ລະຫັດຜ່ານ ຫຼື ອີເມວ ບໍ່ຖືກຕ້ອງ: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md bg-white border border-border-subtle p-8 rounded-xl shadow-md">
        {/* Uniqtek Brand Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-md mb-4 text-white">
            <Wrench className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-primary font-sans">UniqTek Co,. LTD</h2>
          <p className="text-sm text-gray-500 mt-1">
            ລະບົບຈັດການການບໍລິການສ້ອມແປງອຸປະກອນ &ຳຫຼວດວັດແທກ
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-primary border border-red-200 text-xs rounded-lg p-3.5 mb-5 flex gap-2.5 items-start">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">ຂໍ້ຜິດພາດ</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Gmail Direct Input Fallback / Mode selection */}
        {showDirectInput ? (
          <form onSubmit={handleDirectGmailSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                ເຂົ້າສູ່ລະບົບດ້ວຍ Gmail ໂດຍກົງ (iFrame Sandbox Bypass)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                  placeholder="ກະລຸນາປ້ອນ Gmail ຂອງທ່ານ..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-border-subtle rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface"
                  value={directGmail}
                  onChange={(e) => setDirectGmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-container text-white text-sm font-bold py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>ຢືນຢັນການເຂົ້າສູ່ລະບົບດ້ວຍ Gmail</span>
            </button>
            <button
              type="button"
              onClick={() => setShowDirectInput(false)}
              className="w-full text-center text-xs text-gray-500 hover:underline py-1"
            >
              ກັບໄປໃຊ້ປຸ່ມປ໊ອບອັບ / ອີເມວທຳມະດາ
            </button>
          </form>
        ) : (
          <div className="space-y-4 mb-6">
            {/* Primary Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-border-subtle text-sm font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-3 shadow-sm cursor-pointer active:scale-98"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>ເຂົ້າສູ່ລະບົບດ້ວຍ Gmail (Google Sign In)</span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-border-subtle"></div>
              <span className="mx-3 text-xs text-gray-400 font-sans">ຫຼື ໃຊ້ລະຫັດຜ່ານ</span>
              <div className="flex-1 border-t border-border-subtle"></div>
            </div>

            {/* Email/Password Auth Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ຊື່ຜູ້ໃຊ້</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2 bg-white border border-border-subtle rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface"
                      placeholder="ປ້ອນຊື່ຂອງທ່ານ..."
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ອີເມວ</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-2 bg-white border border-border-subtle rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ລະຫັດຜ່ານ</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="password"
                    className="w-full pl-10 pr-4 py-2 bg-white border border-border-subtle rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none text-sm text-on-surface"
                    placeholder="ປ້ອນລະຫັດຜ່ານ..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-container text-white text-sm font-bold py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{isSignUp ? "ລົງທະບຽນ" : "ເຂົ້າສູ່ລະບົບ"}</span>
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-primary hover:underline"
              >
                {isSignUp ? "ມີບັນຊີຢູ່ແລ້ວ? ເຂົ້າສູ່ລະບົບ" : "ຍັງບໍ່ມີບັນຊີ? ລົງທະບຽນໃໝ່"}
              </button>
            </div>

            <div className="text-center mt-2 pt-2 border-t border-dashed border-border-subtle">
              <button
                type="button"
                onClick={() => setShowDirectInput(true)}
                className="text-[11px] text-gray-500 hover:text-primary hover:underline"
              >
                ມີບັນຫາປ໊ອບອັບລັອກອິນ? ເຂົ້າສູ່ລະບົບດ້ວຍ Gmail ໂດຍກົງ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
