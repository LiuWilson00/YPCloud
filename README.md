# Hello world template

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```



## vuetify using ##

1. v-spacer 將物件至該行最底




## vuetify from Json ##

1. create a Component in src/component/FormComponents
    (have a template in this folder)

2. import and insert new Component at CoustomForm

3. setting rules.js



## L1 target ##

https://codepen.io/wilson-wei-liu/pen/dyPJVRd

1. targets:css 選擇器 .Dom Node.Javascript Object.Array
2. translateX: 位移x座標
3. round : Object數值四捨五入至第幾位
4. easing : 動畫函數

使用後範例如下:

``` JavaScript
anime({
  targets: '.css-selector-demo .el',
  translateX: 250
});

```

===============================

## L2 PROPERTIES ##

https://codepen.io/wilson-wei-liu/pen/RwNMmWK 



animate可以設定target的css做成動畫(類似css3)


1. CSS
其中每個屬性從

Snake Case 變成 Camel Case
命名方式詳見:https://shunnien.github.io/2017/06/07/naming-conventions/

例如:

``` javascript
anime({
  targets:'.item1',
  left:'240px',
  backgroundColor:'#333642',
  borderRadius:['0%', '50%'],
  easing: 'easeInOutQuad'
  
})
```

2. CSS TRANSFORMS

3. OBJECT PROPERTIES

4. DOM ATTRIBUTES

5. SVG ATTRIBUTES

## L3 PROPERTY PARAMETERS ##

https://codepen.io/wilson-wei-liu/pen/RwNMmWK 

1. duration

2. delay

3. easing

4. SPECIFIC PROPERTY PARAMETERS

```javascript
anime({
  targets: '.specific-prop-params-demo .el',
  translateX: {
    value: 250,
    duration: 800
  },
  rotate: {
    value: 360,
    duration: 1800,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 2,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutQuart'
  },
  delay: 250 // All properties except 'scale' inherit 250ms delay
});

```

5. FUNCTION BASED

```javascript

anime({
  targets: '.function-based-params-demo .el',
  translateX: 270,
  direction: 'alternate',
  loop: true,
  delay: function(el, i, l) {
    return i * 100;
  },
  endDelay: function(el, i, l) {
    return (l - i) * 100;
  }
});


```


## L4 ANIMATION PARAMETERS ##


https://codepen.io/wilson-wei-liu/pen/gObzrVK


1. DIRECTION
2. LOOP
3. AUTOPLAY


## L5 VALUE ##


https://codepen.io/wilson-wei-liu/pen/gObzrVK

1. RELATIVE
2. FUNCTION BASED VALUES


## L6 KEYFRAMES ##

https://codepen.io/wilson-wei-liu/pen/JjovLep

類似於CSS3的 KEYFRAMES 但功能更為強大(可利用FUNCTION動態調整動畫)

