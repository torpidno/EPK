import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import confetti from 'canvas-confetti';

export interface BookingFormData {
  name: string;
  email: string;
  message: string;
}

export interface BookingFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export interface UseBookingFormResult {
  data: BookingFormData;
  errors: BookingFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  resetForm: () => void;
}

export const useBookingForm = (onSubmitSuccess?: () => void): UseBookingFormResult => {
  const [data, setData] = useState<BookingFormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Field change handler
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name as keyof BookingFormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  // Form validation
  const validate = useCallback((): boolean => {
    const tempErrors: BookingFormErrors = {};
    if (!data.name.trim()) {
      tempErrors.name = 'Arrangörsnamn krävs.';
    }
    
    if (!data.email.trim()) {
      tempErrors.email = 'E-postadress krävs.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      tempErrors.email = 'Ange en giltig e-postadress.';
    }
    
    if (!data.message.trim()) {
      tempErrors.message = 'Meddelande kan inte vara tomt.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }, [data]);

  // Submit handler
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger high-fidelity confetti effect!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f2ff', '#e1fdff', '#ffb4ab', '#131313']
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (err) {
      setIsSubmitting(false);
      console.error('Submit error:', err);
    }
  }, [validate, onSubmitSuccess]);

  // Reset form helper
  const resetForm = useCallback(() => {
    setData({ name: '', email: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
  }, []);

  return {
    data,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
    resetForm
  };
};
