export const isValidPhoneNumber = (phone: string): boolean => {
    return /^[0-9]{10}$/.test(phone);
  };
  
  export const isValidLada = (lada: string): boolean => {
    return /^[0-9]{1,3}$/.test(lada);
  };
  
  export const sanitizePhoneNumber = (phone: string): string => {
    return phone.replace(/[^0-9]/g, '').slice(0, 10);
  };
  
  export const sanitizeLada = (lada: string): string => {
    return lada.replace(/[^0-9]/g, '').slice(0, 3);
  };
  