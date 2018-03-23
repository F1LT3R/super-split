import test from 'ava'
import superSplit from '.'

test('Split string by delimiter array, keep delimiters', t => {
	const str = 'I like to move it, move it.'
	const delimiters = ['to', 'it']
	const result = superSplit(str, delimiters)
	const expected = ['I like ', 'to', ' move ', 'it', ', move ', 'it', '.']
	t.deepEqual(result, expected)
})

test('Can split escaped code', t => {
	// eslint-disable-next-line unicorn/escape-case
	const str = 'I like to \u001b[34mmove it\u001b[39m, move it.'
	// eslint-disable-next-line unicorn/escape-case
	const delimiters = ['\u001b[34m', '\u001b[39m']
	const result = superSplit(str, delimiters)
	// eslint-disable-next-line unicorn/escape-case
	const expected = ['I like to ', '\u001b[34m', 'move it', '\u001b[39m', ', move it.']
	t.deepEqual(result, expected)
})

test('Simple to grokument', t => {
	const str = 'A+B-C'
	const delimiters = ['+', '-']
	const result = superSplit(str, delimiters)
	const expected = ['A', '+', 'B', '-', 'C']
	t.deepEqual(result, expected)
})

test('No delimiters lets value pass through', t => {
	const result = superSplit(true, [])
	t.true(result)
})

test('Non string/array value with delimiters returns false', t => {
	const result = superSplit(true, [' '])
	t.false(result)
})

test('Split array', t => {
	const ary = [':-)', 'o_O']
	const delimiters = ['-', '_']
	const result = superSplit(ary, delimiters)
	const expected = [':', '-', ')', 'o', '_', 'O']
	t.deepEqual(result, expected)
})

test('Make sure subRes filters out blank strings from the result', t => {
	const str = 'I like to move it, move it.'
	const delimiters = [' ', 'o', 'e']
	const result = superSplit(str, delimiters)
	const expected = ['I', ' ', 'lik', 'e', ' ', 't', 'o', ' ', 'm', 'o', 'v', 'e', ' ', 'it,', ' ', 'm', 'o', 'v', 'e', ' ', 'it.']
	t.deepEqual(result, expected)
})
