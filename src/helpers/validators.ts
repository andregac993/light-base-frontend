export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');

  if (digits.length !== 11) return false;

  if (/^(\d)\1+$/.test(digits)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(digits[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(digits[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(digits[10]);
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}

export function isValidCarPlate(plate: string): boolean {
  const cleaned = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

  const oldFormat = /^[A-Z]{3}[0-9]{4}$/;
  const mercosurFormat = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

  return oldFormat.test(cleaned) || mercosurFormat.test(cleaned);
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 3;
}
