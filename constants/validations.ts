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
  const emailRegex = /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}|(?:\[(?:(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:?(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)\]))$/;
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

export const sanitizeEmail = (email: string): { sanitized: string, hadInvalidChars: boolean } => {
  let sanitized = email.replace(/\s/g, '');

  const hadInvalidChars = !isValidEmail(sanitized);

  return { sanitized, hadInvalidChars };
};

