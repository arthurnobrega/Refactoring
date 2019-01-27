import invoices from './invoices.json';
import plays from './plays.json';
import statement, { htmlStatement }from '.';

test('returns text statement', () => {
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

test('returns html statement', () => {
  const bill = htmlStatement(invoices[0], plays);

  expect(bill).toEqualWithCompressedWhitespace(`
    <h1>Statement for BigCo</h1>
    <table>
     <tr><th>play</th><th>seats</th><th>cost</th></tr>
     <tr><td>Hamlet</td>55<td></td><td>$650.00</td></tr>
     <tr><td>As You Like It</td>35<td></td><td>$580.00</td></tr>
     <tr><td>Othello</td>40<td></td><td>$500.00</td></tr>
    </table>
    <p>Amount owed is <em>$1,730.00</em></p>
    <p>You earned <em>47</em> credits</p>
  `);
});
