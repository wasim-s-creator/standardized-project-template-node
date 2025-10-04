function badExample(badParam) {
  const _unusedVar = 5;
  if (badParam) {
    console.log('Bad code with "double quotes" and missing semicolons');
    return 'No semicolons and inconsistent indent';
  } else {
    const _anotherVar = 10;
    console.log('Another bad line'); // no-console is off, so no warning here
  }

  for (let i = 0; i < 10; i++) {
    console.log('Loop ' + i);
  }
  const badVar = 1;
  return badVar;
}
badExample(1);
module.exports = badExample;
