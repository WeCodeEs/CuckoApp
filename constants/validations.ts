export const isValidPhoneNumber = (phone: string): boolean => {
  return /^[0-9]{10}$/.test(phone);
};

export const isValidLada = (lada: string): boolean => {
  return /^[0-9]{1,3}$/.test(lada);
};

export const isValidName = (name: string): boolean => {
  const nameRegex = /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+(?: [A-Za-zÁÉÍÓÚÜáéíóúüÑñ]+)*$/;
  return nameRegex.test(name.trim());
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const sanitizePhoneNumber = (phone: string): string => {
  return phone.replace(/[^0-9]/g, '').slice(0, 10);
};

export const sanitizeLada = (lada: string): string => {
  return lada.replace(/[^0-9]/g, '').slice(0, 3);
};

export const sanitizeName = (name: string, isFinal: boolean = false): { sanitized: string, hadInvalidChars: boolean } => {
  const beforeSanitization = name;

  let sanitized = name.replace(/\s{2,}/g, ' ');

  if (isFinal) {
    sanitized = sanitized.trim(); 
  }

  const hadInvalidChars = /[^A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s-]/.test(beforeSanitization) || beforeSanitization !== sanitized;

  return { sanitized, hadInvalidChars };
};

