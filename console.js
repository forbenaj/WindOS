function openConsole()
{// Create the main div element
var myWindow = document.createElement("div");
myWindow.id = "myConsole";
myWindow.className = "window";
myWindow.style.width = "250px";
myWindow.style.height = "400px";
myWindow.style.top = "550px";
myWindow.style.left = "240px";

// Create the window-top div element
var windowTop = document.createElement("div");
windowTop.className = "window-top";

// Create three button elements and append them to the window-top div
var greenButton = document.createElement("button");
greenButton.className = "round green";
windowTop.appendChild(greenButton);

var yellowButton = document.createElement("button");
yellowButton.className = "round yellow";
windowTop.appendChild(yellowButton);

var redButton = document.createElement("button");
redButton.className = "round red";
windowTop.appendChild(redButton);

// Create the window-content div element
var windowContent = document.createElement("div");
windowContent.className = "window-content";
windowContent.innerHTML = "&gt; Testing window number 1<br />&gt;<br />&gt;&gt; Hello World";

// Create the input element
var inputElement = document.createElement("input");
inputElement.className = "window-input";
inputElement.type = "text";

// Append the child elements to the main div
myWindow.appendChild(windowTop);
myWindow.appendChild(windowContent);
myWindow.appendChild(inputElement);

// Insert the main div into the body
document.body.appendChild(myWindow);
}