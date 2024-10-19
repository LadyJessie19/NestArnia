import { validateCpf } from '../validate-cpf.utils';

describe.skip('Utils - Validate CPF', () => {
  it('should return a true for a valid cpf', () => {
    const validCpf = '12345678909';
    const result = validateCpf(validCpf);
    expect(result).toBe(true);
  });

  it('should return a false for a invalid cpf', () => {
    const invalidCpf = '12345678900';
    const result = validateCpf(invalidCpf);
    expect(result).toBe(false);
  });
});
