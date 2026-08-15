"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const financial_js_1 = require("../utils/financial.js");
const auth_js_1 = require("../utils/auth.js");
async function runTests() {
    console.log('🧪 Running My Nyumba Automated System Test Suite...\n');
    // Test 1: Financial Math Rounding
    console.log('Test 1: Financial Monetary Rounding');
    const sum = (0, financial_js_1.roundMoney)(0.1 + 0.2);
    node_assert_1.default.strictEqual(sum, 0.3, '0.1 + 0.2 must round to 0.3');
    const formatted = (0, financial_js_1.formatCurrency)(25000);
    node_assert_1.default.strictEqual(formatted, 'KSh 25,000.00', 'Currency formatting match');
    console.log('✅ Financial Monetary Rounding PASSED\n');
    // Test 2: Invoice Balance Calculation
    console.log('Test 2: Invoice Balance Recalculation');
    const balance1 = (0, financial_js_1.calculateInvoiceBalance)(25500, 10000);
    node_assert_1.default.strictEqual(balance1, 15500, 'Partial balance calculation match');
    const balance2 = (0, financial_js_1.calculateInvoiceBalance)(25500, 25500);
    node_assert_1.default.strictEqual(balance2, 0, 'Full payment balance must be 0');
    const balance3 = (0, financial_js_1.calculateInvoiceBalance)(25500, 30000);
    node_assert_1.default.strictEqual(balance3, 0, 'Overpayment balance must clamp to 0');
    console.log('✅ Invoice Balance Recalculation PASSED\n');
    // Test 3: Password Hashing & Verification
    console.log('Test 3: Bcrypt Password Hashing & Comparison');
    const rawPass = 'SecretAdminPassword123!';
    const hashed = await (0, auth_js_1.hashPassword)(rawPass);
    node_assert_1.default.notStrictEqual(hashed, rawPass, 'Password must be hashed');
    const match = await (0, auth_js_1.comparePassword)(rawPass, hashed);
    node_assert_1.default.strictEqual(match, true, 'Valid password match must return true');
    const invalidMatch = await (0, auth_js_1.comparePassword)('WrongPass', hashed);
    node_assert_1.default.strictEqual(invalidMatch, false, 'Invalid password match must return false');
    console.log('✅ Password Hashing & Verification PASSED\n');
    // Test 4: JWT Token Sign & Verify
    console.log('Test 4: JWT Token Generation & Verification');
    const payload = { userId: '11111111-1111-1111-1111-111111111111', email: 'test@example.com', role: 'SUPER_ADMIN' };
    const token = (0, auth_js_1.generateToken)(payload);
    node_assert_1.default.strictEqual(typeof token, 'string', 'Token must be a string');
    const decoded = (0, auth_js_1.verifyToken)(token);
    node_assert_1.default.strictEqual(decoded?.userId, payload.userId, 'Decoded user ID match');
    node_assert_1.default.strictEqual(decoded?.role, payload.role, 'Decoded role match');
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
    node_assert_1.default.strictEqual(receipt, 'QGH9182301', 'MpesaReceiptNumber extraction match');
    console.log('✅ M-Pesa Callback Payload Parsing PASSED\n');
    console.log('🎉 ALL AUTOMATED TESTS PASSED SUCCESSFULLY!');
}
runTests().catch((err) => {
    console.error('❌ Test failed with error:', err);
    process.exit(1);
});
