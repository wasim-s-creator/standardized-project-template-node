function badFunction() {
    let unusedVar = 42
    console.log("Hello world")
}

var unusedVariable = "This variable is never used"

function spacingIssues ( )  {
   console.log ("Spacing is bad" );
}

const anotherBadFunction = () => {
        var x=1+2+3+4+5
        console.log(x )
}

if(true)console.log("No braces");

badFunction();
anotherBadFunction();
spacingIssues();
