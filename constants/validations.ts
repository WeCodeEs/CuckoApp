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