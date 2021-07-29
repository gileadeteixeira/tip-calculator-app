# Frontend Mentor - Tip calculator app solution

This is a solution to the <a href="https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX" target="_blank" >Tip calculator app challenge on Frontend Mentor</a>.

## Table of contents

- [Overview](#overview)
  - [Screenshot](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Extras](#extras)

## Overview

### Screenshots
<div>
<a href="https://user-images.githubusercontent.com/77688036/127518374-bf214045-9876-46fd-9a93-905a10ec661e.png" target="_blank" >
  <img height="450px" src="https://user-images.githubusercontent.com/77688036/127518374-bf214045-9876-46fd-9a93-905a10ec661e.png" alt="mobile_sreenshot">
</a>
<a href="https://user-images.githubusercontent.com/77688036/127518540-6bbd5ad0-35b4-41e7-a7d7-5460c4ca7f02.png" target="_blank" >
  <img height="450px" src="https://user-images.githubusercontent.com/77688036/127518540-6bbd5ad0-35b4-41e7-a7d7-5460c4ca7f02.png" alt="desktop_sreenshot">
</a>
</div>

### Links

- Solution URL: <a href="https://www.frontendmentor.io/solutions/responsive-site-using-html-css-and-javascript-KItbwMQlV" target="_blank" >My Solution</a>
- Live Site URL: <a href="https://gileadeteixeira.github.io/tip-calculator-app/" target="_blank" >Splitter</a>

## My process

### Built with

- Semantic HTML5 markup;
- CSS custom properties;
- Flexbox;
- Mobile-first workflow;
- JavaScript (no frameworks or libraries);
- GitFlow.

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

- **CSS**
  - Flexbox;
  - How to change placeholders;
  - How to change text insertion indicator;
  - How to change cursor appearance;
  - Multiple classes (.class.class);
  - Outline + Box-Shadow vs. Border.
- **HTML**
  - Div element.
- **JavaScript**
  - NaN and Infinity;
  - <a href="http://" target="_blank" >querySelectorAll()</a>;
  - How to handle DOM events;
  - <a href="http://" target="_blank" >Node.contains()</a>.

```css
/*To leave the container covering the useful screen in the mobile version*/
.container, html, .area {
    height: 100%;
    margin: 0;
}
```
```js
//I'm proud of my functions for inputs, in this format
input.addEventListener('keyup', event=>{});
//and I also really liked my Regular Expression (one of the only ones without "search" that worked) for hundred units
const commaRegex = /(\d)(?=(\d{3})+(?!\d))/g; //Application: 1000.00 => 1,000.00 for example
```

### Continued development

I want to learn more about **HTML DOM Events**, and improve the creation of **Regular Expressions** (mine almost never worked right).

### Useful resources

- <a href="https://keycode.info" target="_blank" >Keycode</a> - This helped me to get the JavaScript event keycodes. I've added it to my favorites list, to use when I need it.
- <a href="https://regex101.com" target="_blank" >Regex101</a> - I use this site to test my regular expressions. 
- <a href="https://www.w3schools.com/jsref/dom_obj_event.asp" target="_blank" >HTML DOM Events</a> - Here I discovered other events for inputs (besides the traditional ones: blur and focus). I want to know and use more options in the future.
- <a href="https://www.youtube.com/watch?v=dJjVr6Ya7B8" target="_blank" >GitFlow</a> (**pt-BR video** :brazil:) - I learned how to use GitFlow with this video.

## Author

- Frontend Mentor - <a href="https://www.frontendmentor.io/profile/gileadeteixeira" target="_blank" >@gileadeteixeira</a>
- LinkedIn - <a href="https://www.linkedin.com/in/gileade-teixeira-b86935204/" target="_blank" >@gileade-teixeira</a>

## Extras

- I did it without a team;
- Estimated Time vs. Completed Time (discounting hours "living" 😂):
  - ET - 2 days ___ CT - Almost 3 days;
  - Started on 7/26/2021, Completed on 07/29/2021.
