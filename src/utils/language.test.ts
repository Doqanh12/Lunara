import test from 'node:test';
import assert from 'node:assert/strict';
import { getBilingualText, getText, extractParenthesizedText, PRODUCT_BILINGUAL_MAP } from './language.ts';

test('getText returns vi when language is vi, and en when language is en', () => {
  assert.equal(getText('Cửa hàng', 'Shop', 'vi'), 'Cửa hàng');
  assert.equal(getText('Cửa hàng', 'Shop', 'en'), 'Shop');
});

test('getBilingualText in Vietnamese mode prioritizes vi with empty secondary', () => {
  const result = getBilingualText('Cửa hàng', 'Shop', 'vi');
  assert.equal(result.primary, 'Cửa hàng');
  assert.equal(result.secondary, '');
});

test('getBilingualText in English mode prioritizes en with empty secondary', () => {
  const result = getBilingualText('Cửa hàng', 'Shop', 'en');
  assert.equal(result.primary, 'Shop');
  assert.equal(result.secondary, '');
});

test('extractParenthesizedText parses brackets into main and sub cleanly', () => {
  const parsed1 = extractParenthesizedText('Cửa hàng (Shop)');
  assert.equal(parsed1.main, 'Cửa hàng');
  assert.equal(parsed1.sub, 'Shop');

  const parsed2 = extractParenthesizedText('Trang chủ');
  assert.equal(parsed2.main, 'Trang chủ');
  assert.equal(parsed2.sub, '');
});

test('PRODUCT_BILINGUAL_MAP has entries for core products', () => {
  assert.ok(PRODUCT_BILINGUAL_MAP['prod-1']);
  assert.equal(PRODUCT_BILINGUAL_MAP['prod-1'].en, 'Aloe Vera Scrub');
  assert.equal(PRODUCT_BILINGUAL_MAP['prod-2'].en, 'Chamomile Serum');
  assert.equal(PRODUCT_BILINGUAL_MAP['prod-3'].en, 'Green tea toner');
  assert.equal(PRODUCT_BILINGUAL_MAP['prod-4'].en, 'Sun Veil SPF 50+');
});
