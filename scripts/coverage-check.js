#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

async function checkCoverage() {
  const coveragePath = path.join(
    process.cwd(),
    'coverage',
    'coverage-summary.json'
  );

  try {
    await fs.access(coveragePath);
  } catch {
    throw new Error('❌ No coverage report found. Run: npm run test:coverage');
  }

  const coverage = JSON.parse(await fs.readFile(coveragePath, 'utf8'));
  const { total } = coverage;

  console.log('\n📊 Coverage Summary:');
  console.log('─'.repeat(40));
  console.log(`Lines:      ${total.lines.pct}%`);
  console.log(`Functions:  ${total.functions.pct}%`);
  console.log(`Branches:   ${total.branches.pct}%`);
  console.log(`Statements: ${total.statements.pct}%`);
  console.log('─'.repeat(40));

  const thresholds = {
    lines: 70,
    functions: 70,
    branches: 65,
    statements: 70,
  };

  let failed = false;
  Object.entries(thresholds).forEach(([key, threshold]) => {
    if (total[key].pct < threshold) {
      console.log(`❌ ${key}: ${total[key].pct}% < ${threshold}%`);
      failed = true;
    } else {
      console.log(`✅ ${key}: ${total[key].pct}% >= ${threshold}%`);
    }
  });

  if (failed) {
    throw new Error(
      '❌ Coverage below minimum thresholds!\n💡 Add more tests to improve coverage.'
    );
  } else {
    console.log('\n✅ All coverage thresholds met!');
  }
}

checkCoverage().catch(err => {
  console.error(err.message);
  process.exit(1);
});
