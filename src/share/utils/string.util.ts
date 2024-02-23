import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class StringUtil {
  /**
   * generates a random string
   * @function genRandomString
   * @param {number} length - Length of the random string.
   */
  public static genRandomString(length: number): string {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  public static mysqlRealEscapeString(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%\_]/g, function (char) {
      switch (char) {
        case '\0':
          return '\\0';
        case '\x08':
          return '\\b';
        case '\x09':
          return '\\t';
        case '\x1a':
          return '\\z';
        case '\n':
          return '\\n';
        case '\r':
          return '\\r';
        case '_':
        case '"':
        case "'":
        case '\\':
        case '%':
          return '\\' + char;
      }
    });
  }
}
