import { MathService } from './math.service';

describe('MathService', () => {
  let service: MathService;

  beforeEach(() => {
    service = new MathService();
  });

  it('should return the sum of two numbers', () => {
    expect(service.sum(2, 3)).toEqual(5);
  });

  it('should return the product of two numbers', () => {
    expect(service.multiply(2, 3)).toEqual(6);
  });
});
