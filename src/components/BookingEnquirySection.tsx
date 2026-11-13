import { useState, useEffect, FormEvent } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  Phone,
  MapPin,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { COURT_PACKAGES, COACHING_PACKAGES } from '../config/packagesData';
import { AthleticReveal } from './MotionPrimitives';

export type EnquiryService = 'Book a Court' | 'Coaching Session';
export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

interface BookingEnquirySectionProps {
  selectedService: EnquiryService;
  selectedPackage?: string;
  onServiceChange: (service: EnquiryService) => void;
  onPackageChange?: (pkg: string) => void;
}

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  service: EnquiryService;
  selectedPackage: string;
  preferredDate: string;
  preferredTime: string;
  skillLevel: SkillLevel;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
}

type SubmissionState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'submitted_live'; payload: FormValues }
  | { status: 'preview_ready'; payload: FormValues }
  | { status: 'error'; message: string };

function getTodayLocalISO(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function BookingEnquirySection({
  selectedService,
  selectedPackage = '',
  onServiceChange,
  onPackageChange,
}: BookingEnquirySectionProps) {
  const todayISO = getTodayLocalISO();

  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    phone: '',
    service: selectedService,
    selectedPackage: selectedPackage || (selectedService === 'Book a Court' ? 'Single Session' : 'First Spark'),
    preferredDate: '',
    preferredTime: '',
    skillLevel: 'Beginner',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submission, setSubmission] = useState<SubmissionState>({ status: 'idle' });
  const [copied, setCopied] = useState(false);

  // Sync external service selection (e.g. Hero, Panel, or Package CTA buttons)
  useEffect(() => {
    setValues((prev) => {
      const nextPackage = selectedPackage || prev.selectedPackage;
      return {
        ...prev,
        service: selectedService,
        selectedPackage: nextPackage,
      };
    });
  }, [selectedService, selectedPackage]);

  const packageOptions =
    values.service === 'Book a Court'
      ? [
          ...COURT_PACKAGES.map((p) => p.name),
          'Custom / General Court Booking',
        ]
      : [
          ...COACHING_PACKAGES.map((p) => p.name),
          'Custom / General Coaching Enquiry',
        ];

  const validate = (draft: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!draft.fullName.trim() || draft.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!draft.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(draft.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const phoneCleaned = draft.phone.trim();
    const digitsOnly = phoneCleaned.replace(/\D/g, '');
    const phoneFormatValid = /^[+\d\s\-()]+$/.test(phoneCleaned);
    if (!phoneCleaned) {
      nextErrors.phone = 'Please enter a phone number.';
    } else if (!phoneFormatValid || digitsOnly.length < 7 || digitsOnly.length > 15) {
      nextErrors.phone = 'Enter a valid phone number (7–15 digits, e.g. +971 54 140 0964).';
    }

    if (draft.preferredDate && draft.preferredDate < todayISO) {
      nextErrors.preferredDate = 'Please select today or a future date.';
    }

    return nextErrors;
  };

  const handleFieldChange = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) => {
    const updated = { ...values, [field]: value };

    if (field === 'service') {
      const nextService = value as EnquiryService;
      onServiceChange(nextService);
      // Auto-adjust package default for the new service if current package does not fit
      const validOptions =
        nextService === 'Book a Court'
          ? COURT_PACKAGES.map((p) => p.name)
          : COACHING_PACKAGES.map((p) => p.name);
      if (!validOptions.includes(updated.selectedPackage)) {
        updated.selectedPackage = validOptions[0];
        onPackageChange?.(validOptions[0]);
      }
    }

    if (field === 'selectedPackage') {
      onPackageChange?.(value as string);
    }

    setValues(updated);

    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      preferredDate: true,
    });

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmission({ status: 'submitting' });

    const endpoint = siteConfig.bookingIntegration?.endpoint?.trim();

    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            submittedAt: new Date().toISOString(),
            source: 'spark-pickleball-web',
          }),
        });

        if (!response.ok) {
          throw new Error(`Enquiry endpoint returned status ${response.status}`);
        }

        setSubmission({ status: 'submitted_live', payload: values });
      } catch (err) {
        setSubmission({
          status: 'error',
          message:
            err instanceof Error
              ? err.message
              : 'Unable to reach the configured booking endpoint. Please try again.',
        });
      }
      return;
    }

    // No backend endpoint configured: show loading briefly, then present honest preview summary
    await new Promise((resolve) => setTimeout(resolve, 450));
    setSubmission({ status: 'preview_ready', payload: values });
  };

  const handleReset = () => {
    setSubmission({ status: 'idle' });
    setCopied(false);
    setTouched({});
    setErrors({});
    setValues({
      fullName: '',
      email: '',
      phone: '',
      service: selectedService,
      selectedPackage: selectedService === 'Book a Court' ? 'Single Session' : 'First Spark',
      preferredDate: '',
      preferredTime: '',
      skillLevel: 'Beginner',
      message: '',
    });
  };

  const handleCopySummary = async (payload: FormValues) => {
    const summaryText = [
      'SPARK Pickleball — Booking Enquiry',
      `Name: ${payload.fullName}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone}`,
      `Service: ${payload.service}`,
      `Package: ${payload.selectedPackage}`,
      `Preferred Date: ${payload.preferredDate || 'Flexible'}`,
      `Preferred Time: ${payload.preferredTime || 'Flexible'}`,
      `Skill Level: ${payload.skillLevel}`,
      payload.message ? `Message: ${payload.message}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // restricted clipboard fallback
    }
  };

  const whatsappUrl = `https://wa.me/${siteConfig.brand.phoneRaw.replace('+', '')}?text=${encodeURIComponent(
    `Hello SPARK Pickleball! I would like to enquire about ${values.selectedPackage || values.service}.`
  )}`;

  const inputBaseClass =
    'w-full bg-[#08090B] border border-white/20 px-4 py-3 text-sm text-white placeholder-[#C5C8CE]/45 focus:outline-none focus:border-[#ED1725] transition-colors';

  return (
    <section
      id="enquiry"
      aria-label="Booking Enquiry and Contact"
      className="relative bg-[#08090B] py-20 sm:py-24 lg:py-32 overflow-hidden border-t border-white/10"
    >
      {/* Background Photograph with Deep Dark Overlay */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/images/enquiry-court-bg.jpg"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-[#08090B]/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090B] via-transparent to-[#08090B]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-2xl">
          {/* Left Side: Red Diagonal Geometric Panel with Direct Contact Info */}
          <div className="lg:col-span-5 min-w-0 relative bg-[#111216] overflow-hidden">
            {/* Deep Red Geometric Backing Layer */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute inset-y-0 left-0 right-4 bg-[#A60E19]"
            />

            {/* Primary Spark Red Diagonal Panel */}
            <div className="relative h-full bg-[#ED1725] clip-diagonal-enquiry px-7 sm:px-10 lg:px-12 py-12 sm:py-16 lg:py-20 flex flex-col justify-between">
              <AthleticReveal>
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-[2px] w-7 bg-white" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
                    GET STARTED
                  </span>
                </div>

                <h2 className="font-athletic text-[2.75rem] sm:text-[4.25rem] xl:text-[5.25rem] leading-[0.87] text-white mb-6">
                  <span className="block">BOOKING</span>
                  <span className="block">ENQUIRY.</span>
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-white/95 max-w-sm mb-8">
                  Ready to get on court or book a coaching package? Share your details and
                  we&apos;ll help you take the next step.
                </p>

                {/* Direct Line & WhatsApp Actions */}
                <div className="space-y-4 max-w-sm">
                  <div className="bg-[#08090B]/35 border border-white/20 p-4 backdrop-blur-sm">
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/80 block mb-1">
                      Direct Line &amp; WhatsApp
                    </span>
                    <a
                      href={`tel:${siteConfig.brand.phoneRaw}`}
                      className="font-athletic text-2xl text-white hover:text-white/80 transition-colors block mb-2"
                    >
                      {siteConfig.brand.phone}
                    </a>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${siteConfig.brand.phoneRaw}`}
                        className="inline-flex items-center gap-1.5 bg-white text-[#08090B] hover:bg-[#08090B] hover:text-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Call</span>
                      </a>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-white text-white hover:bg-white hover:text-[#08090B] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div className="bg-[#08090B]/35 border border-white/20 p-4 backdrop-blur-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-white/80 block">
                          Venue Location
                        </span>
                        <p className="text-xs text-white/95 leading-snug mt-0.5">
                          {siteConfig.brand.address}
                        </p>
                        <a
                          href={siteConfig.brand.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[0.6875rem] text-white underline underline-offset-2 hover:text-white/80 mt-1.5"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AthleticReveal>

              <div className="pt-8 mt-8 border-t border-white/25 max-w-xs">
                <p className="text-xs uppercase tracking-[0.16em] text-white/90 leading-relaxed">
                  Court bookings &amp; coaching enquiries in Dubai &mdash; no payment required at enquiry stage.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Polished Dark Form with Package Field */}
          <div className="lg:col-span-7 min-w-0 bg-[#111216] border border-white/15 lg:border-l-0 p-6 sm:p-10 lg:p-12 xl:p-14">
            {submission.status === 'submitted_live' ||
            submission.status === 'preview_ready' ? (
              <div className="h-full flex flex-col justify-center py-6">
                <div className="inline-flex items-center gap-3 text-[#ED1725] mb-4">
                  <CheckCircle2 className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.22em]">
                    {submission.status === 'submitted_live'
                      ? 'ENQUIRY SENT'
                      : 'ENQUIRY VALIDATED (INTEGRATION PREVIEW)'}
                  </span>
                </div>

                <h3 className="font-athletic text-4xl sm:text-5xl text-white mb-3">
                  {submission.status === 'submitted_live'
                    ? 'THANK YOU — ENQUIRY RECEIVED.'
                    : 'YOUR ENQUIRY IS READY.'}
                </h3>

                <p className="text-sm leading-relaxed text-[#C5C8CE] mb-6 max-w-lg">
                  {submission.status === 'submitted_live'
                    ? 'Your details have been submitted to our booking endpoint. Our team will follow up regarding court availability, coaching packages, and next steps.'
                    : 'All fields have been validated. No live backend booking API is connected yet (configure VITE_BOOKING_API_URL in .env to deliver submissions directly to your server).'}
                </p>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 border-y border-white/15 py-5 mb-7 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.15em] text-[#C5C8CE]/60">
                      Name
                    </dt>
                    <dd className="text-white font-medium mt-0.5">
                      {submission.payload.fullName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.15em] text-[#C5C8CE]/60">
                      Service &amp; Package
                    </dt>
                    <dd className="text-white font-medium mt-0.5">
                      {submission.payload.service} &mdash; {submission.payload.selectedPackage}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.15em] text-[#C5C8CE]/60">
                      Email
                    </dt>
                    <dd className="text-white font-medium mt-0.5">
                      {submission.payload.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.15em] text-[#C5C8CE]/60">
                      Phone
                    </dt>
                    <dd className="text-white font-medium mt-0.5">
                      {submission.payload.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.15em] text-[#C5C8CE]/60">
                      Preferred Date &amp; Time
                    </dt>
                    <dd className="text-white font-medium mt-0.5">
                      {submission.payload.preferredDate || 'Flexible'}
                      {submission.payload.preferredTime
                        ? ` at ${submission.payload.preferredTime}`
                        : ''}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.15em] text-[#C5C8CE]/60">
                      Skill Level
                    </dt>
                    <dd className="text-white font-medium mt-0.5">
                      {submission.payload.skillLevel}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleCopySummary(submission.payload)}
                    className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#ED1725]" aria-hidden="true" />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 bg-[#ED1725] hover:bg-[#A60E19] text-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
                  >
                    <span>Send Another Enquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {submission.status === 'error' && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 border border-[#ED1725] bg-[#ED1725]/10 px-4 py-3 text-sm text-white"
                  >
                    <AlertCircle className="w-5 h-5 text-[#ED1725] shrink-0 mt-0.5" />
                    <span>{submission.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="enquiry-full-name"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                    >
                      Full Name <span className="text-[#ED1725]">*</span>
                    </label>
                    <input
                      id="enquiry-full-name"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      value={values.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                      className={`${inputBaseClass} ${
                        errors.fullName ? 'border-[#ED1725]' : ''
                      }`}
                    />
                    {errors.fullName && (
                      <p id="error-full-name" className="mt-1.5 text-xs text-[#ED1725]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="enquiry-email"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                    >
                      Email Address <span className="text-[#ED1725]">*</span>
                    </label>
                    <input
                      id="enquiry-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                      className={`${inputBaseClass} ${
                        errors.email ? 'border-[#ED1725]' : ''
                      }`}
                    />
                    {errors.email && (
                      <p id="error-email" className="mt-1.5 text-xs text-[#ED1725]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                    >
                      Phone Number <span className="text-[#ED1725]">*</span>
                    </label>
                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+971 54 140 0964"
                      value={values.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'error-phone' : undefined}
                      className={`${inputBaseClass} ${
                        errors.phone ? 'border-[#ED1725]' : ''
                      }`}
                    />
                    {errors.phone && (
                      <p id="error-phone" className="mt-1.5 text-xs text-[#ED1725]">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Service Category */}
                  <div>
                    <label
                      htmlFor="enquiry-service"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                    >
                      Service Category
                    </label>
                    <select
                      id="enquiry-service"
                      name="service"
                      value={values.service}
                      onChange={(e) =>
                        handleFieldChange('service', e.target.value as EnquiryService)
                      }
                      className={inputBaseClass}
                    >
                      <option value="Book a Court">Book a Court</option>
                      <option value="Coaching Session">Coaching Session</option>
                    </select>
                  </div>

                  {/* Package Selector (NEW - Preselects Package) */}
                  <div>
                    <label
                      htmlFor="enquiry-package"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                    >
                      Selected Package
                    </label>
                    <select
                      id="enquiry-package"
                      name="selectedPackage"
                      value={values.selectedPackage}
                      onChange={(e) =>
                        handleFieldChange('selectedPackage', e.target.value)
                      }
                      className={inputBaseClass}
                    >
                      {packageOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Skill Level */}
                  <div>
                    <label
                      htmlFor="enquiry-skill"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                    >
                      Skill Level
                    </label>
                    <select
                      id="enquiry-skill"
                      name="skillLevel"
                      value={values.skillLevel}
                      onChange={(e) =>
                        handleFieldChange('skillLevel', e.target.value as SkillLevel)
                      }
                      className={inputBaseClass}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label
                      htmlFor="enquiry-date"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                    >
                      Preferred Date
                    </label>
                    <input
                      id="enquiry-date"
                      name="preferredDate"
                      type="date"
                      min={todayISO}
                      value={values.preferredDate}
                      onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
                      onBlur={() => handleBlur('preferredDate')}
                      aria-invalid={Boolean(errors.preferredDate)}
                      aria-describedby={
                        errors.preferredDate ? 'error-date' : undefined
                      }
                      className={`${inputBaseClass} dark-picker ${
                        errors.preferredDate ? 'border-[#ED1725]' : ''
                      }`}
                    />
                    {errors.preferredDate && (
                      <p id="error-date" className="mt-1.5 text-xs text-[#ED1725]">
                        {errors.preferredDate}
                      </p>
                    )}
                  </div>

                  {/* Preferred Time */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="enquiry-time"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                    >
                      Preferred Time
                    </label>
                    <input
                      id="enquiry-time"
                      name="preferredTime"
                      type="time"
                      value={values.preferredTime}
                      onChange={(e) => handleFieldChange('preferredTime', e.target.value)}
                      className={`${inputBaseClass} dark-picker`}
                    />
                  </div>

                  {/* Additional Message */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="enquiry-message"
                      className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#C5C8CE] mb-2"
                    >
                      Additional Message{' '}
                      <span className="text-[#C5C8CE]/50 font-normal normal-case tracking-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="enquiry-message"
                      name="message"
                      rows={3}
                      placeholder="Group size, preferred court setup, or specific coaching goals..."
                      value={values.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                      className={`${inputBaseClass} resize-y min-h-[88px]`}
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={submission.status === 'submitting'}
                    className="group inline-flex items-center justify-center gap-3 bg-[#ED1725] hover:bg-[#A60E19] disabled:opacity-65 text-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {submission.status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Processing Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-300 ease-athletic group-hover:translate-x-1.5"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </button>

                  <span className="text-xs text-[#C5C8CE]/65">
                    Required fields marked <span className="text-[#ED1725]">*</span>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
