import invoices from "./invoices.json";
import plays from "./plays.json";
import { statement } from ".";

test("returns correct bill", () => {
  const bill = statement(invoices[0], plays);

  expect(bill).toEqualWithCompressedWhitespace(`
    Statement for BigCo
     Hamlet: $650.00 (55 seats)
     As You Like It: $580.00 (35 seats)
     Othello: $500.00 (40 seats)
    Amount owed is $1,730.00
    You earned 47 credits
  `);
});
