# simple-vue-datepicker

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

Initially I tried to store every date as a moment.js instance but it didn't play well with vue's reactivity as it was unable to pick up the changes.
I probably could have added a couple of watchers but I feel like using strings for this is fine too since the datepicker accepts strings and returns strings.

I think that the code speaks for itself but I've added a couple of comments to places which I feel may be a little non-intuitive just in case.
