import { formatDate } from '../format-date.utils';

describe('formatDate', () => {
  it('should format isoString date to dd/mm/yyyy', () => {
    const date = '2024-10-14T12:30:00Z';
    const result = formatDate(date);
    expect(result).toBe('14/10/2024');
  });
});
