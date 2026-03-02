/**
 * Build the Twitch IRC command string.
 * @param {string} command - The command name (e.g. 'ggp')
 * @param {string} account - The target account
 * @param {string} amount - The GP amount
 * @returns {string} The formatted command (e.g. '!ggp account 3000')
 */
export function buildSendCommand(command, account, amount) {
  return `!${command} ${account} ${amount}`;
}

/**
 * Extract the first column values from parsed Excel JSON data.
 * @param {Array<Object>} jsonData - Parsed Excel rows
 * @returns {string[]} Array of first-column values
 */
export function parseExcelFirstColumn(jsonData) {
  return jsonData.map(obj => Object.values(obj)[0]);
}

/**
 * Build a report row for the download spreadsheet.
 * @param {string} account - The account that was given GP
 * @param {string[]} originalAccounts - The original list from Excel
 * @returns {{ '已給帳號': string, '是否在原本的EXCEL': string }}
 */
export function buildReportRow(account, originalAccounts) {
  return {
    '已給帳號': account,
    '是否在原本的EXCEL': originalAccounts.includes(account) ? 'V' : ''
  };
}

/**
 * Parse an IRC message to check if it's a valid command echo.
 * @param {string} message - The IRC message
 * @param {string} expectedCommand - The expected command name
 * @returns {{ command: string, account: string } | null} Parsed result or null
 */
export function parseCommandEcho(message, expectedCommand) {
  if (!message || !message.startsWith('!')) return null;
  const args = message.slice(1).split(' ');
  const command = args.shift();
  if (command !== expectedCommand || args.length < 2) return null;
  return { command, account: args[0] };
}

/**
 * Check if all accounts have been processed.
 * @param {number} givenCount - Number of accounts processed so far
 * @param {number} totalCount - Total accounts to process
 * @returns {boolean}
 */
export function isProcessingComplete(givenCount, totalCount) {
  return givenCount >= totalCount;
}
