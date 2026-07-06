import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../../modules/auth/mutation/useSignup';
import { User, Mail, KeyRound, Bot } from 'lucide-react';

type SignupFormValues = {
  fullname: string;
  email: string;
  password: string;
};

const initialValues: SignupFormValues = {
  fullname: '',
  email: '',
  password: '',
};

const SignupPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: signupMutation, isPending: isSignupPending } = useSignup();

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors: Partial<Record<keyof SignupFormValues, string>> = {};

      if (!values.fullname.trim()) {
        errors.fullname = 'Full name is required';
      }

      if (!values.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Enter a valid email address';
      }

      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }

      return errors;
    },
    onSubmit: async (values, { setStatus, resetForm }) => {
      setStatus(undefined);

      try {
        await signupMutation(values);
        resetForm();
        navigate('/login');
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to create account';
        setStatus(message);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-app px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border bg-card p-8 shadow-2xl relative overflow-hidden text-left">
        {/* Glow decoration */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col items-center mb-6">
          <div className="bg-primary/15 p-3 rounded-xl border border-primary/20 mb-3">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-white tracking-tight">
            Create Account
          </h1>
          <p className="text-neutral text-xs mt-1">Register to talk to custom AI Personas</p>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate className="flex flex-col gap-4 relative z-10">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-neutral uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral" />
              <input
                name="fullname"
                type="text"
                autoComplete="name"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Jane Doe"
                className={`w-full rounded-xl border bg-tertiary pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral/70 outline-none transition-all duration-200
                  ${formik.touched.fullname && formik.errors.fullname
                    ? 'border-danger focus:border-danger focus:ring-1 focus:ring-danger'
                    : 'border-border focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
              />
            </div>
            {formik.touched.fullname && formik.errors.fullname && (
              <span className="text-danger text-xs mt-0.5">{formik.errors.fullname}</span>
            )}
          </div>

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
                placeholder="jane@example.com"
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
                type="password"
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="At least 6 characters"
                className={`w-full rounded-xl border bg-tertiary pl-10 pr-4 py-3 text-sm text-white placeholder:text-neutral/70 outline-none transition-all duration-200
                  ${formik.touched.password && formik.errors.password
                    ? 'border-danger focus:border-danger focus:ring-1 focus:ring-danger'
                    : 'border-border focus:border-primary focus:ring-1 focus:ring-primary'
                  }`}
              />
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
            disabled={isSignupPending || formik.isSubmitting}
            className="w-full rounded-xl bg-primary hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 px-4 py-3 text-sm font-semibold text-white mt-2 shadow-lg shadow-primary/20 hover:shadow-primary/30"
          >
            {isSignupPending || formik.isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="pt-4 border-t border-border/40 text-center">
          <p className="text-neutral text-xs">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:text-primary-200 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
