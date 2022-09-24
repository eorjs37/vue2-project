# vue2 교육

## 실행순서

### npm install

```
npm install
```

### npm run serve

```
npm run serve
```

## lifeCycle

### created

> 인스턴스 생성되고 data접근은 가능하나 dom api 사용은 불가능하다

### mounted

> 인스턴스 생성되고 data접근은 가능하고 dom api 사용 가능

### updated

> data 변경될때 마다 동작하지만, watch나 computed 사용하는게 낫다.

### destroyed

> 인스턴스 소멸될때 사용된다.

## Computed 속성과 Watch 속성

### computed

> 계산된 속성을 사용하기 위해 사용된다.

### watch

> data 변경될때 사용된다.

## 부모컴퍼넌트와 자식컴퍼넌트 통신
