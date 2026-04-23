export function normalizePhoneNumber(input: string): string {
    // Remove all non-digit characters
    const digits = input.replace(/\D/g, '');
  
    // If number starts with country code 250 and is followed by 7xx..., convert to local
    if (digits.startsWith('250') && digits.length === 12) {
      return '0' + digits.slice(3);
    }

    // if number starts with +250 and is followed by 7xx..., convert to local
    if (digits.startsWith('+250') && digits.length === 13) {
      return '0' + digits.slice(4);
    }
  
    // If already local (starts with 07 and has 10 digits), return as-is
    if (digits.startsWith('07') && digits.length === 10) {
      return digits;
    }
  
    // If it doesn't match expected formats, return null or throw error
    return ""; // or throw new Error('Invalid phone number format');
  }
  