export function maskCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);

  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
  }

  return digits.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
}

export function maskCarPlate(value: string): string {
  const cleaned = value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 7);

  if (/^[A-Z]{3}[0-9]{4}$/.test(cleaned)) {
    return cleaned.replace(/([A-Z]{3})([0-9]{4})/, '$1-$2');
  }

  return cleaned;
}

export function unmask(value: string): string {
  return value.replace(/\D/g, '');
}

export function unmaskCarPlate(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
