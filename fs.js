// let person = {
//     firstName : "John",
//     lastName  : "Doe",
//     age     : 50,
//     eyeColor  : "blue"
//   }
  
//   console.log(person);
function outer()
{
  var a=7;
  function inner()
  {
    console.log(a);
  }
  a=10;
  return inner;
}
var c=outer();
console.log(c);
c();