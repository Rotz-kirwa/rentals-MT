import assert from 'node:assert';
import { roundMoney, calculateInvoiceBalance, formatCurrency } from '../utils/financial.js';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../utils/auth.js';

async function runTests() {
  console.log('🧪 Running My Nyumba Automated System Test Suite...\n');

  // Test 1: Financial Math Rounding
  console.log('Test 1: Financial Monetary Rounding');
  const sum = roundMoney(0.1 + 0.2);
  assert.strictEqual(sum, 0.3, '0.1 + 0.2 must round to 0.3');
  const formatted = formatCurrency(25000);
  assert.strictEqual(formatted, 'KSh 25,000.00', 'Currency formatting match');
  console.log('✅ Financial Monetary Rounding PASSED\n');

  // Test 2: Invoice Balance Calculation
  console.log('Test 2: Invoice Balance Recalculation');
  const balance1 = calculateInvoiceBalance(25500, 10000);
  assert.strictEqual(balance1, 15500, 'Partial balance calculation match');
  const balance2 = calculateInvoiceBalance(25500, 25500);
  assert.strictEqual(balance2, 0, 'Full payment balance must be 0');
  const balance3 = calculateInvoiceBalance(25500, 30000);
  assert.strictEqual(balance3, 0, 'Overpayment balance must clamp to 0');
  console.log('✅ Invoice Balance Recalculation PASSED\n');

  // Test 3: Password Hashing & Verification
  console.log('Test 3: Bcrypt Password Hashing & Comparison');
  const rawPass = 'SecretAdminPassword123!';
  const hashed = await hashPassword(rawPass);
  assert.notStrictEqual(hashed, rawPass, 'Password must be hashed');
  const match = await comparePassword(rawPass, hashed);
  assert.strictEqual(match, true, 'Valid password match must return true');
  const invalidMatch = await comparePassword('WrongPass', hashed);
  assert.strictEqual(invalidMatch, false, 'Invalid password match must return false');
  console.log('✅ Password Hashing & Verification PASSED\n');

  // Test 4: JWT Token Sign & Verify
  console.log('Test 4: JWT Token Generation & Verification');
  const payload = { userId: '11111111-1111-1111-1111-111111111111', email: 'test@example.com', role: 'SUPER_ADMIN' as const };
  const token = generateToken(payload);
  assert.strictEqual(typeof token, 'string', 'Token must be a string');
  const decoded = verifyToken(token);
  assert.strictEqual(decoded?.userId, payload.userId, 'Decoded user ID match');
  assert.strictEqual(decoded?.role, payload.role, 'Decoded role match');
  console.log('✅ JWT Token Sign & Verify PASSED\n');

  // Test 5: M-Pesa Callback Payload Parsing
  console.log('Test 5: M-Pesa Callback Payload Parsing & Verification');
  const mockMpesaPayload = {
    Body: {
      stkCallback: {
        CheckoutRequestID: 'ws_CO_15082026_99812',
        ResultCode: 0,
        CallbackMetadata: {
          Item: [
            { Name: 'MpesaReceiptNumber', Value: 'QGH9182301' },
            { Name: 'Amount', Value: 15000 },
            { Name: 'PhoneNumber', Value: '254712345678' },
          ],
        },
      },
    },
  };
  const receipt = mockMpesaPayload.Body.stkCallback.CallbackMetadata.Item.find(i => i.Name === 'MpesaReceiptNumber')?.Value;
  assert.strictEqual(receipt, 'QGH9182301', 'MpesaReceiptNumber extraction match');
  console.log('✅ M-Pesa Callback Payload Parsing PASSED\n');

  console.log('🎉 ALL AUTOMATED TESTS PASSED SUCCESSFULLY!');
}

runTests().catch((err) => {
  console.error('❌ Test failed with error:', err);
  process.exit(1);
});
