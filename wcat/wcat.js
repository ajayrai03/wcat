const fs=require("fs");

let inputArray=process.argv.slice(2);
let filesArr=[];
let optionsArr=[];  
for(let i=0;i<inputArray.length;i++)
{   let firstChar=inputArray[i].charAt(0);
    if(firstChar=='-')
    {
        optionsArr.push(inputArray[i]);
    }
    else {
    filesArr.push(inputArray[i]);
    }
}
//console.log(filesArr);
// check all files are present
for(let i=0;i<filesArr.length;i++)
{
    let doesExist=fs.existsSync(filesArr[i]);
    if(!doesExist)
    {
        console.log("files does not exist");
        process.exit();
    }
}
// content read and appending starts(other files)
let content="";
for(let i=0;i<filesArr.length;i++)
{
    let fileContent=fs.readFileSync(filesArr[i]);
    content+=fileContent+"\r\n";
}
console.log(content);
let contentArray=content.split("\r\n");
//console.table(contentArray);
//check if -s is present or not
let tempArr=[];
let isSPresent=optionsArr.includes("-s");
if(isSPresent)
{
    for(let i=1;i<contentArray.length;i++)
    {
        if(contentArray[i]=="" && contentArray[i-1]=="")
        {
            contentArray[i]=null;
        }
        else if (contentArray[i] == "" && contentArray[i - 1] == null) {
            contentArray[i] = null;
        }
    }
   // console.table(contentArray);

for(let i=0;i<contentArray.length;i++)
{
    if(contentArray[i]!=null)
    {
        tempArr.push(contentArray[i]);
    }
}
//console.log("data after removing extra lines\n",tempArr);
}
contentArray=tempArr;
let indexOfN=optionsArr.indexOf("-n");
let indexOfB=optionsArr.indexOf("-b");
// if -n and -b is not found, -1 is returned
let finalOption="";
// if both -n and -b are present
if(indexOfN!=-1 && indexOfB!=-1)
{
if(indexOfN<indexOfB)
{
    finalOption="-n";
}
else{
    finalOption="-b";
}
}
//either -n is present or -b is present
else{
    if(indexOfN!=-1)
    {
        finalOption="-n";
    }
    else if(indexOfB!=-1)
    {
        finalOption="-b";
    }
}
// calling of functions by evaluating finalOption
if(finalOption=="-n")
{
    modifyContentByN();
}
else if(finalOption=="-b")
{
    modifyContentByB();
}
function modifyContentByN()
{
    for(let i=0;i<contentArray.length;i++)
    {
        contentArray[i]=(i+1)+")"+contentArray[i];
    }
}
function modifyContentByB()
{
    let count=1;
    for(let i=0;i<contentArray.length;i++)
    {
        if(contentArray[i]!="")
        {
            contentArray[i]=count+")"+contentArray[i];
            count++;
        }
    }
}
console.log(contentArray);