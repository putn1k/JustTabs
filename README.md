# JustTabs v0.1.1

Простой и лёгкий плагин для табов

## Информация

Плагин написан на основе плагина [Graph-tabs](https://github.com/maxdenaro/graph-tabs)

+ __Никаких зависимостей__.  Библиотека написана на чистом JavaScript, для работы не требуются иные библиотеки.
+ __Простота и функциональность__. Вы можете легко и быстро подключить и использовать библиотеку, которая реализует важный функционал для табов
+ __Доступность__. Табы отвечают всем правилам доступности.
+ __Настройка с помощью CSS__. Вы можете легко менять внешний вид, расположение с помощью CSS.

1. Скачайте js-библиотеку justTabs.min.js и файл стилей justTabs.min.css
2. Подключите эти файлы к проекту
```html
  <link rel="stylesheet" href="justTabs/justTabs.min.css">
  <script src="justTabs/justTabs.min.js" defer></script>
```
3. Поместите в ваш html-документ следующую разметку:
```html
<div data-tabs="tabs-name">
  <ul data-tabs="nav">
    <li><button type="button" data-tabs="btn">1 Tab</button></li>
    <li><button type="button" data-tabs="btn">2 Tab</button></li>
    <li><button type="button" data-tabs="btn">3 Tab</button></li>
  </ul>
  <div>
    <div data-tabs="panel">Content 1</div>
    <div data-tabs="panel">Content 2</div>
    <div data-tabs="panel">Content 3</div>
  </div>
</div>
```

> `data-tabs` - важный дата-атрибут, через который и работает все взаимодействие с плагином. Значение этого атрибута должно быть уникальным для страницы.

4. Разместите следующий JS-код для подключения табов:
```javascript
const tabs = new JustTabs('tabs-name');
```

## Методы и свойства

1. Вы можете сразу активировать нужный таб при загрузке страницы или любом другом событии с помощью метода `switchTabs`. Пример:
```javascript
tabs.switchTabs(document.querySelector('#tabs-name2'));
```

2. Событие `isChanged` - срабатывает в момент переключения табов. Может принимать входной параметр - объект табов. Пример:
```javascript
const tabs = new JustTabs('tabs-name', {
	isChanged: (tabs) => {
		console.log(tabs);
	}
});
```

3. Установка класса активной кнопке таба 
```javascript
const tabs = new JustTabs('tabs-name', {
  activeBtnClass: 'new_active_btn_class'
});
```

4. Установка класса активной панели 
```javascript
const tabs = new JustTabs('tabs-name', {
  activePanelClass: 'new_active_panel_class'
});
```
