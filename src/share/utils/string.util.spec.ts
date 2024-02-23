import { StringUtil } from '../../share/utils/string.util';

describe('StringUtil', () => {
  describe('genRandomString', () => {
    it('should return', () => {
      expect(StringUtil.genRandomString(2)?.length).toEqual(2);
      expect(StringUtil.genRandomString(3)?.length).toEqual(3);
      expect(StringUtil.genRandomString(4)?.length).toEqual(4);
      expect(StringUtil.genRandomString(5)?.length).toEqual(5);
    });
  });

  describe('mysqlRealEscapeString', () => {
    expect(StringUtil.mysqlRealEscapeString('huynhdn')).toEqual('huynhdn');
    expect(StringUtil.mysqlRealEscapeString('\0e')).toEqual('\\0e');
    expect(StringUtil.mysqlRealEscapeString('\x08h')).toEqual('\\bh');
    expect(StringUtil.mysqlRealEscapeString('\x09h')).toEqual('\\th');

    expect(StringUtil.mysqlRealEscapeString('\x1ah')).toEqual('\\zh');
    expect(StringUtil.mysqlRealEscapeString('\nh')).toEqual('\\nh');
    expect(StringUtil.mysqlRealEscapeString('\rh')).toEqual('\\rh');

    expect(StringUtil.mysqlRealEscapeString('_')).toEqual('\\_');
    expect(StringUtil.mysqlRealEscapeString('"')).toEqual('\\"');
    expect(StringUtil.mysqlRealEscapeString('\\')).toEqual('\\\\');
    expect(StringUtil.mysqlRealEscapeString('%')).toEqual('\\%');
  });
});
