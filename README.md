# JustTabs v1.1.0

Простой и лёгкий плагин для вкладок

## Информация

+ __Никаких зависимостей__. <br>
Библиотека написана на чистом JavaScript, для работы не требуются иные библиотеки.
+ __Простота и функциональность__. <br>
Вы можете легко и быстро подключить и использовать библиотеку, которая реализует важный функционал для вкладок
+ __Доступность__. <br>
Плагин отвечает всем правилам доступности.
+ __Настройка с помощью CSS__. <br>
Вы можете легко менять внешний вид, расположение с помощью CSS.

1. Скачайте js-библиотеку just-tabs.min.js и файл стилей just-tabs.min.css
2. Подключите эти файлы к проекту
3. Поместите в ваш html-документ следующую разметку:
```html
<div data-jtabs="tabs">
  <ul data-jtabs="nav">
    <li>
      <button type="button"
              data-jtabs="control">Tab 1</button>
    </li>
    <li>
      <button type="button"
              data-jtabs="control">Tab 2</button>
    </li>
    <li>
      <button type="button"
              data-jtabs="control">Tab 3</button>
    </li>
  </ul>
  <div>
    <div data-jtabs="panel">Content 1</div>
    <div data-jtabs="panel">Content 2</div>
    <div data-jtabs="panel">Content 3</div>
  </div>
</div>
```

> `data-jtabs` - важный дата-атрибут, через который и работает все взаимодействие с плагином.

4. Разместите следующий JS-код для подключения вкладок:
```javascript
new JustTabs( 'tabs' );
```

## Конфигурация плагина

Экземпляр JustTabs принимает первым аргументом имя (обязательный аргумент), а вторым объект конфигурации (необязательный аргумент).

1. Вы можете сразу активировать нужную вкладку при загрузке страницы, указав в объекте конфигурации свойство `startTabIndex` со значением стартового индекса. Пример:
```javascript
new JustTabs( 'tabs', {
	startTabIndex: 1
} );
```

2. Вы можете осуществить переход к нужной вкладке с помощью метода `switchTo`, указав параметр индекса вкладки, на которую нужно совершить переход. Пример:
```javascript
const tabs = new JustTabs( 'tabs' );
tabs.switchTo( 2 );
```

3. Вы можете получить объект конфигурации с помощью метода `getOptions`. Пример:
```javascript
const tabs = new JustTabs( 'tabs' );
tabs.getOptions();
```

Также можно получить опцию по ключу, задав имя ключа в параметре метода. Пример:
```javascript
const tabs = new JustTabs( 'tabs' );
tabs.getOptions('el');
```
Получим HTML-элемент табов.


4. В конфигурационном файле в свойстве `onInit` можно указать колбек-функцию. Колбек может принимать входной параметр - экземпляр объекта. Колбек `onInit` срабатывает в момент инициализации плагина. Пример:
```javascript
new JustTabs( 'tabs', {
	onInit: ( tabs ) => {
		console.log( tabs );
	}
} );
```

5. В конфигурационном файле в свойстве `onSwitch` можно указать колбек-функцию. Колбек может принимать входной параметр - экземпляр объекта. Колбек `onSwitch` срабатывает в момент переключения вкладок.  Пример:
```javascript
new JustTabs( 'tabs', {
	onSwitch: ( tabs ) => {
		console.log( tabs );
	}
} );
```
