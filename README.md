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
Data often comes in that shape from APIs:
```
const games = [{id: "12245", title: "Bloody Roar"}, {id: "12459", title: "The unholy war"}]
```
You will most likely need to read/update it, you could use filter/reduce/find for the millionth
time. Or you could use Dict.js:
```
const gameDict = Dict.fromArray(games)
gameDict.insert({id: "12998", title: "Rival schools"})
gameDict.toArray() //[{id: "12245", title: "Bloody Roar"}, {id: "12459", title: "The unholy war"}, {id: "12998", title: "Rival schools"}]
```

[elm]: http://elm-lang.org/
