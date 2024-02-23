import { formatter } from './index';

describe('Index', () => {
  describe('formatter', () => {
    it('should return format number', () => {
      expect(formatter.format(1)).toEqual('$1.00');
      expect(formatter.format(10)).toEqual('$10.00');
      expect(formatter.format(100)).toEqual('$100.00');
      expect(formatter.format(100.8)).toEqual('$100.80');
      expect(formatter.format(2000)).toEqual('$2,000.00');
      expect(formatter.format(2000.1)).toEqual('$2,000.10');
      expect(formatter.format(2000.9)).toEqual('$2,000.90');
    });
  });
});
