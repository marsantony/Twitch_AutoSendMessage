import { describe, it, expect } from 'vitest';
import {
  buildSendCommand,
  parseExcelFirstColumn,
  buildReportRow,
  parseCommandEcho,
  isProcessingComplete,
} from '../src/auto-send-utils.js';

describe('buildSendCommand', () => {
  it('should build a normal command string', () => {
    expect(buildSendCommand('ggp', 'testuser', '3000')).toBe('!ggp testuser 3000');
  });

  it('should work with a different command name', () => {
    expect(buildSendCommand('give', 'player1', '500')).toBe('!give player1 500');
  });

  it('should handle an empty account', () => {
    expect(buildSendCommand('ggp', '', '3000')).toBe('!ggp  3000');
  });
});

describe('parseExcelFirstColumn', () => {
  it('should extract first column values from named columns', () => {
    const data = [
      { Name: 'alice', Score: 100 },
      { Name: 'bob', Score: 200 },
    ];
    expect(parseExcelFirstColumn(data)).toEqual(['alice', 'bob']);
  });

  it('should handle single-column data', () => {
    const data = [{ Account: 'user1' }, { Account: 'user2' }];
    expect(parseExcelFirstColumn(data)).toEqual(['user1', 'user2']);
  });

  it('should return empty array for empty input', () => {
    expect(parseExcelFirstColumn([])).toEqual([]);
  });

  it('should only extract the first column when objects have multiple columns', () => {
    const data = [
      { ID: 'a1', Name: 'Alice', Age: 25 },
      { ID: 'b2', Name: 'Bob', Age: 30 },
    ];
    expect(parseExcelFirstColumn(data)).toEqual(['a1', 'b2']);
  });
});

describe('buildReportRow', () => {
  it('should mark V when account exists in original list', () => {
    const result = buildReportRow('alice', ['alice', 'bob', 'charlie']);
    expect(result).toEqual({ '已給帳號': 'alice', '是否在原本的EXCEL': 'V' });
  });

  it('should leave empty when account is not in original list', () => {
    const result = buildReportRow('dave', ['alice', 'bob', 'charlie']);
    expect(result).toEqual({ '已給帳號': 'dave', '是否在原本的EXCEL': '' });
  });
});

describe('parseCommandEcho', () => {
  it('should parse a valid command message', () => {
    const result = parseCommandEcho('!ggp testuser 3000', 'ggp');
    expect(result).toEqual({ command: 'ggp', account: 'testuser' });
  });

  it('should return null for wrong command name', () => {
    expect(parseCommandEcho('!give testuser 3000', 'ggp')).toBeNull();
  });

  it('should return null when args are missing', () => {
    expect(parseCommandEcho('!ggp', 'ggp')).toBeNull();
  });

  it('should return null when only one arg (account but no amount)', () => {
    expect(parseCommandEcho('!ggp testuser', 'ggp')).toBeNull();
  });

  it('should return null for empty message', () => {
    expect(parseCommandEcho('', 'ggp')).toBeNull();
  });

  it('should return null for null/undefined message', () => {
    expect(parseCommandEcho(null, 'ggp')).toBeNull();
    expect(parseCommandEcho(undefined, 'ggp')).toBeNull();
  });

  it('should return null for message without ! prefix', () => {
    expect(parseCommandEcho('ggp testuser 3000', 'ggp')).toBeNull();
  });
});

describe('isProcessingComplete', () => {
  it('should return false when given count is less than total', () => {
    expect(isProcessingComplete(3, 10)).toBe(false);
  });

  it('should return true when given count equals total', () => {
    expect(isProcessingComplete(10, 10)).toBe(true);
  });

  it('should return true when given count exceeds total', () => {
    expect(isProcessingComplete(12, 10)).toBe(true);
  });
});
