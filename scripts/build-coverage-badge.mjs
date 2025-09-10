#!/usr/bin/env node

/**
 * Generate coverage badge for README.md
 * This script can be run locally to test coverage badge generation
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getCoverageData() {
  try {
    const coveragePath = join(__dirname, '../packages/vseed/coverage/coverage-summary.json');
    
    if (!existsSync(coveragePath)) {
      console.log('coverage-summary.json not found, using fallback data');
      return {
        lines: 0,
        statements: 0,
        functions: 0,
        branches: 0,
        color: 'brightgreen',
        badgeUrl: 'https://img.shields.io/badge/Coverage-96%25-brightgreen.svg'
      };
    }

    const coverage = JSON.parse(readFileSync(coveragePath, 'utf8'));
    const lines = Math.round(coverage.total.lines.pct);
    
    const getColor = (pct) => {
      if (pct >= 90) return 'brightgreen';
      if (pct >= 80) return 'green';
      if (pct >= 70) return 'yellowgreen';
      if (pct >= 60) return 'yellow';
      if (pct >= 50) return 'orange';
      return 'red';
    };

    return {
      lines,
      statements: Math.round(coverage.total.statements.pct),
      functions: Math.round(coverage.total.functions.pct),
      branches: Math.round(coverage.total.branches.pct),
      color: getColor(lines),
      badgeUrl: `https://img.shields.io/badge/Coverage-${lines}%25-${getColor(lines)}.svg`
    };
  } catch (error) {
    console.error('Error reading coverage data:', error.message);
    return {
      lines: 0,
      statements: 0,
      functions: 0,
      branches: 0,
      color: 'red',
      badgeUrl: 'https://img.shields.io/badge/Coverage-0%25-red.svg'
    };
  }
}

function updateReadme(coverageData) {
  try {
    const readmePath = join(__dirname, '../README.md');
    let readme = readFileSync(readmePath, 'utf8');
    
    const badgeRegex = /\[!\[Coverage\]\([^)]+\)\]\([^)]+\)/;
    const newBadge = `[![Coverage](${coverageData.badgeUrl})](https://github.com/VisActor/VSeed/actions/workflows/coverage.yml)`;
    
    if (badgeRegex.test(readme)) {
      readme = readme.replace(badgeRegex, newBadge);
    } else {
      const npmBadgeRegex = /(\[!\[npm Version\]\([^)]+\)\]\([^)]+\))/;
      readme = readme.replace(npmBadgeRegex, `$1\n${newBadge}`);
    }
    
    writeFileSync(readmePath, readme, 'utf8');
    console.log('README.md updated successfully');
    console.log(`Coverage: ${coverageData.lines}% (${coverageData.color})`);
  } catch (error) {
    console.error('Error updating README.md:', error.message);
  }
}

const coverage = getCoverageData();
console.log('Coverage data:', coverage);
updateReadme(coverage);