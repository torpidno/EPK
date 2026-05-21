import React from 'react';
import { useBookingForm } from '../hooks/useBookingForm';

export const BookingForm: React.FC = () => {
  const {
    data,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
    resetForm
  } = useBookingForm();

  if (isSubmitted) {
    return (
      <div className="bg-surface-container border-2 border-primary-container p-12 text-center transform -rotate-1 shadow-[8px_8px_0_0_rgba(0,242,255,1)] flex flex-col items-center gap-6 animate-pulse">
        <span className="material-symbols-outlined text-primary" style={{ fontSize: '72px' }}>
          task_alt
        </span>
        <h3 className="font-headline-md text-headline-md text-primary uppercase">Bokning Mottagen!</h3>
        <p className="font-body-md text-body-md text-on-surface">
          Tack! Vi har mottagit din förfrågan och återkommer så fort vi har slutat headbanga.
        </p>
        <button
          onClick={resetForm}
          className="mt-4 bg-primary-container text-on-primary-fixed font-label-caps text-label-caps px-6 py-3 uppercase hover:bg-transparent hover:text-primary-container border-2 border-primary-container transition-colors font-bold"
        >
          Skicka ny förfrågan
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container border border-white/10 p-8 transform rotate-1 shadow-[8px_8px_0_0_rgba(0,242,255,1)]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left" noValidate>
        {/* Name Input */}
        <div>
          <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">
            NAMN / ARRANGÖR
          </label>
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            className={`w-full bg-surface-dim border-0 border-b-2 text-on-surface px-4 py-3 focus:ring-0 transition-colors font-body-md ${
              errors.name ? 'border-error focus:border-error' : 'border-primary focus:border-white'
            }`}
            placeholder="Ditt namn"
            type="text"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-error text-sm font-label-caps mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">error</span> {errors.name}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">
            E-POST
          </label>
          <input
            name="email"
            value={data.email}
            onChange={handleChange}
            className={`w-full bg-surface-dim border-0 border-b-2 text-on-surface px-4 py-3 focus:ring-0 transition-colors font-body-md ${
              errors.email ? 'border-error focus:border-error' : 'border-primary focus:border-white'
            }`}
            placeholder="din@email.se"
            type="email"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-error text-sm font-label-caps mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">error</span> {errors.email}
            </p>
          )}
        </div>

        {/* Message Input */}
        <div>
          <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2">
            MEDDELANDE
          </label>
          <textarea
            name="message"
            value={data.message}
            onChange={handleChange}
            className={`w-full bg-surface-dim border-0 border-b-2 text-on-surface px-4 py-3 focus:ring-0 transition-colors font-body-md resize-none ${
              errors.message ? 'border-error focus:border-error' : 'border-primary focus:border-white'
            }`}
            placeholder="Datum, venue, budget..."
            rows={4}
            disabled={isSubmitting}
          ></textarea>
          {errors.message && (
            <p className="text-error text-sm font-label-caps mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">error</span> {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-primary-container text-on-primary-fixed font-label-caps text-label-caps px-8 py-4 uppercase border-2 border-primary-container hover:bg-transparent hover:text-primary-container transition-colors glitch-hover flex justify-center items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-on-primary-fixed" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              SÄNDER...
            </>
          ) : (
            'SKICKA FÖRFRÅGAN'
          )}
        </button>
      </form>
    </div>
  );
};
