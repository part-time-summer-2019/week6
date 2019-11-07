# Devtools, Destructuring, Async-Await, Import/Export 

## Topics Covered
### 1) Devtools
[Setting Functions within HTML elements](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Event_handlers)
- You may add eventHandlers inline to your HTML elements, however, this is only recommended for very simple applications. For more complex applications, this type of format can become very hard to manage
```HTML
<p onClick="makeGreen()">×BREAK×DOWN×</p>
```

[The different ways to Console something](https://developer.mozilla.org/en-US/docs/Web/API/console)
- we visited topic on day 2 briefly, but please read as a reminder

### 2) Destructuring
[What is destructuring?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- Destructuring takes on the same concept as the spread operator. It is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables
```javascript
let a, b, rest;
[a, b] = [10, 20];

console.log(a);
// expected output: 10

console.log(b);
// expected output: 20

[a, b, ...rest] = [10, 20, 30, 40, 50];

console.log(rest);
// expected output: [30,40,50]
```

[How to destructure an object?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring)
```javascript
  // Destructuring is the process of extracting data from arrays, object, and maps, and sets into their own variables
  const person = {
    first: 'Gabby',
    last: 'Tan',
    country: 'USA',
    city: 'Brooklyn',
    instagram: '@gabriel_v_tan'
  };

  // this is how we destructure an object. It is the equivalent of writing:
  // const first = person.first; const last = person.last; const twitter = person.twitter
  const { first, last, instagram } = person;
  console.log(first)
  // Output: Gabby
  console.log(last)
  // Output: Tan
  console.log(instagram)
  // Output: @gabriel.v.tan
```

[Destructured variables take the default values of an object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Default_values)

[How to destructure an array?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring)
```javascript
  const details = ['Gabby Tan', 123, 'gabbytan.com'];
  // when you destructure an array you have to use '[]', objects will require '{}'
  // Here we don't have to use the index position of a given detail 
  const [name, id, website] = details;
  console.log(name, id, website);

```


### 3) Async-Await
[What is Async-Await?](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await#The_basics_of_asyncawait)
- These features basically act as syntactic sugar on top of promises, making async code easier to write and to read afterwards. 

[How to create async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- First of all we have the async keyword, which you put in front of a function declaration to turn it into an async function. 
```javascript
async function hello() { return "Hello" };
hello();
```

[Where can you use Await functions?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- The real advantage of async functions becomes apparent when you combine it with the await keyword. This can be put in front of any async promise-based function to make the code execution pause on that line until the promise fulfills, then the fulfillment value is returned. Here is a trivial example:
```javascript
async function hello() {
  return greeting = await Promise.resolve("Hello");
};

hello().then(alert);
```

### 4) Imports and Exports
Javascript code can and should not all be written in one file. Instead code should be split up into multiple files with each file holding a logical section of code together. The code written in different files can then be `export`ed for use in other files that would them `import` them in.

[Export](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export)
- Javascript code can be written in different files (modules)
- Items (functions, variables, classes) in these files can be exported for use by code in other files

[Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- As a counterpart to the export, code that is exported can also be imported in other Javascript files
- Items (functions, variables, classes) can be imported, renamed via imports, and used.


