// This file contains intentional violations to test Git hooks
// DO NOT USE THIS CODE IN PRODUCTION!

function badFunction(){
console.log("This has multiple ESLint violations")
var unusedVariable = "This variable is never used";
const password = "hardcoded-password-12345";
const apiKey = "sk-abcdef123456789";
    if(true){
return"Missing spaces everywhere"
}

// Trailing whitespace here     
debugger; // This should be flagged
TODO: This is not a proper comment

eval("console.log('eval is dangerous')");
}

// Missing semicolons and bad formatting
const anotherBadFunction = () => {
console.log('Single quotes mixed with double quotes');
        var x=1+2+3+4+5
return x
}

// More violations
function   spacingIssues  (  ){
if(true)console.log("No braces");
}

// Hardcoded credentials (should be caught by secret detection)
const config = {
  database_password: "super_secret_password_123",
  jwt_secret: "jwt-secret-key-12345",
  api_token: "token_abcdefghijklmnop"
};

// Call functions without proper exports
badFunction();
anotherBadFunction();
spacingIssues();
