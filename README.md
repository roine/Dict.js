[![Build Status](https://travis-ci.org/roine/Dict.js.svg?branch=master)](https://travis-ci.org/roine/Dict.js)

# Dict.js

## Introduction
Inspired by [Elm][elm] `Dict`, Dict simplifies the access and manipulation to array of objects. 
Dict.js does not mutate the collection instead it returns a new collection.


## Installation
```bash
npm install @roine/dict --save
```
## Usage
If you have a data collection shape like follow (array of object with a unique identifier), keep reading:
```javascript
const games = [
  { id: "12245", title: "Bloody Roar" },
  { id: "12459", title: "The unholy war" },
];
```
You will most likely need to read/update it, you could use filter/reduce/find for the millionth
time. Or you could use `Dict`

### Insert
```javascript
const gameDict = Dict.fromArray(games)
gameDict.insert({ id: "12998", title: "Rival schools" });

gameDict.toArray() 
// returns
[
  { id: "12245", title: "Bloody Roar" },
  { id: "12459", title: "The unholy war" },
  { id: "12998", title: "Rival schools" }
];
```
Insert doesn't just append a new entry, if an entry with the same `id` is found it replaces that entry
```javascript
gameDict.insert({ id: "12245", title: "Sould Calibur" });

gameDict.toArray() 
//returns
[
  { id: "12245", title: "Sould Calibur" },
  { id: "12459", title: "The unholy war" },
  { id: "12998", title: "Rival schools" }
];
```

### Update
Great, but what if you want to update part of an entry instead
```javascript
gameDict.update("12245", entry => ({ ...entry, developer: "Bandai Namco Studios" }));

gameDict.toArray() 
// returns
[
  { id: "12245", title: "Sould Calibur", developer: "Bandai Namco Studios" },
  { id: "12459", title: "The unholy war" },
  { id: "12998", title: "Rival schools" }
];
```
We might also want to update an entry if found otherwise do nothing
```javascript
gameDict
  .update("12459", entry => {
    if (entry) {
      return { ...entry, developer: "Toys for Rob" };
    } else {
      return entry;
    }
  })
  .update("non-existent", entry => {
    if (entry) {
      return { ...entry, developer: "EA Games" };
    } else {
      return entry;
    }
  });

gameDict.toArray() 
// returns
[
  { id: "12245", title: "Sould Calibur", developer: "Bandai Namco Studios" },
  { id: "12459", title: "The unholy war", developer: "Toys for Rob" },
  { id: "12998", title: "Rival schools" },
];
```

### Remove
You can also remove an entry:
```javascript
gameDict.remove("12245")

gameDict.toArray() 
// Returns
[
  { id: "12459", title: "The unholy war", developer: "Toys for Rob" },
  { id: "12998", title: "Rival schools" }
];
```

### get
You need to read a specific entry? Use get.
```javascript
gameDict.get("12459")
// Returns 
{ id: "12459", title: "The unholy war", developer: "Toys for Rob" }
```
Easy, right!

[elm]: http://elm-lang.org/
