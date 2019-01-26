import { map, equals } from "ramda";
import { matcherHint, printReceived, printExpected } from "jest-matcher-utils";
import diff from "jest-diff";

const replaceWhitespace = str => str.replace(/\s+/g, ` `).trim();
const compressWhitespace = map(replaceWhitespace);

const name = "toEqualWithCompressedWhitespace";

expect.extend({
  toEqualWithCompressedWhitespace(received, expected) {
    const [
      receivedWithCompresssedWhitespace,
      expectedWithCompresssedWhitespace
    ] = compressWhitespace([received, expected]);
    const pass = equals(
      receivedWithCompresssedWhitespace,
      expectedWithCompresssedWhitespace
    );
    const message = pass
      ? () =>
          `${matcherHint(`.not.${name}`)}\n\n` +
          `Uncompressed expected value:\n` +
          `  ${printExpected(expected)}\n` +
          `Expected value with compressed whitespace to not equal:\n` +
          `  ${printExpected(expectedWithCompresssedWhitespace)}\n` +
          `Uncompressed received value:\n` +
          `  ${printReceived(received)}\n` +
          `Received value with compressed whitespace:\n` +
          `  ${printReceived(receivedWithCompresssedWhitespace)}`
      : () => {
          const diffString = diff(
            expectedWithCompresssedWhitespace,
            receivedWithCompresssedWhitespace,
            {
              expand: this.expand
            }
          );
          return (
            `${matcherHint(`.${name}`)}\n\n` +
            `Uncompressed expected value:\n` +
            `  ${printExpected(expected)}\n` +
            `Expected value with compressed whitespace to equal:\n` +
            `  ${printExpected(expectedWithCompresssedWhitespace)}\n` +
            `Uncompressed received value:\n` +
            `  ${printReceived(received)}\n` +
            `Received value with compressed whitespace:\n` +
            `  ${printReceived(receivedWithCompresssedWhitespace)}${
              diffString ? `\n\nDifference:\n\n${diffString}` : ``
            }`
          );
        };
    return {
      actual: received,
      expected,
      message,
      name,
      pass
    };
  }
});
