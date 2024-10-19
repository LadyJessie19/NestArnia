import { MathService } from './math.service';

describe.skip('MathService', () => {
  let service: MathService;

  beforeEach(() => {
    service = new MathService();
  });

  it('should return a sum of two parameters', () => {
    const result = service.sum(2, 3);
    expect(result).toBe(5);
  });
});
