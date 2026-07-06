import { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../../modules/auth/mutation/useLogin';
import { KeyRound, Mail, Eye, EyeOff, Bot } from 'lucide-react';

type LoginFormValues = {
  email: string;
  password: string;
};

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

function LoginPage() {
  const navigate = useNavigate();
  const { mutateAsync: loginMutation, isPending: isLoginPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: Partial<Record<keyof LoginFormValues, string>> = {};

      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Enter a valid email address';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      }

      return errors;
    },
    onSubmit: async (values, { setStatus, resetForm }) => {
      setStatus(undefined);
      try {
        await loginMutation(values);
        resetForm();
        navigate('/dashboard');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to log in';
        setStatus(message);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-app px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col items-center mb-6">
          <div className="bg-primary/15 p-3 rounded-xl border border-primary/20 mb-3">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-neutral text-xs mt-1">Sign in to chat with your AI Personas</p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className="flex flex-col gap-5 relative z-10"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral" />
              <input
                name="email"
                type="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="you@example.com"
                className={`w-full rounded-xl border bg-tertiary pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral/70 outline-none transition-all duration-200
                  ${formik.touched.email && formik.errors.email
                    ? 'border-danger focus:border-danger focus:ring-1 focus:ring-danger'
                    : 'border-border focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <span className="text-danger text-xs mt-0.5">{formik.errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Your password"
                className={`w-full rounded-xl border bg-tertiary pl-10 pr-12 py-3 text-sm text-white placeholder:text-neutral/70 outline-none transition-all duration-200
                  ${formik.touched.password && formik.errors.password
                    ? 'border-danger focus:border-danger focus:ring-1 focus:ring-danger'
                    : 'border-border focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <span className="text-danger text-xs mt-0.5">{formik.errors.password}</span>
            )}
          </div>

          {formik.status && (
            <div
              role="alert"
              className="rounded-xl border border-danger/20 bg-danger/10 px-4 py-3 text-xs font-medium text-danger animate-in fade-in slide-in-from-top-1"
            >
              {formik.status}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoginPending}
            className="w-full rounded-xl bg-primary hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 px-4 py-3 text-sm font-semibold text-white mt-2 shadow-lg shadow-primary/20 hover:shadow-primary/30"
          >
            {isLoginPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="pt-4 border-t border-border/40 text-center">
          <p className="text-neutral text-xs">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary font-semibold hover:text-primary-200 transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
