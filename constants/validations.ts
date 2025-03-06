export const isValidPhoneNumber = (phone: string): boolean => {
  return /^[0-9]{10}$/.test(phone);
};

export const isValidLada = (lada: string): boolean => {
  return /^[0-9]{1,3}$/.test(lada);
};

export const isValidName = (name: string): boolean => {
  const nameRegex = /^(?! )[A-Za-zÁÉÍÓÚÜáéíóúü]+(?: [A-Za-zÁÉÍÓÚÜáéíóúü]+)*(?<! )$/;
  return nameRegex.test(name);
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
  
  let sanitized = name.replace(/[^A-Za-zÁÉÍÓÚÜáéíóúü\s'-]/g, '');

  if (isFinal) {
    sanitized = sanitized.replace(/\s+/g, ' ').trim();
  }

  const hadInvalidChars = beforeSanitization.replace(/\s/g, '') !== sanitized.replace(/\s/g, '');

  return { sanitized, hadInvalidChars };
};

export const sanitizeEmail = (email: string): { sanitized: string, hadInvalidChars: boolean } => {
  const beforeSanitization = email;

  let sanitized = email.replace(/[^a-zA-Z0-9!#$%&'*+/=?^_`{|}~@.-]/g, ''); 

  sanitized = sanitized.replace(/\s/g, '');

  const hadInvalidChars = beforeSanitization !== sanitized;

  return { sanitized, hadInvalidChars };
};
