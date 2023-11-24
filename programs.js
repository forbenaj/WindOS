function initialize(){
    for(let program in programList){

        let desktop = document.getElementById("Desktop")

        let icon = document.createElement("div")
        let image = document.createElement("div")
        let text = document.createElement("div")

        icon.ondblclick= ()=>initProgram(program)
        icon.id="consoleIcon"
        icon.className="icon"

        image.className="icon-image"

        text.className="icon-text"
        text.innerHTML=program

        icon.appendChild(image)
        icon.appendChild(text)

        desktop.appendChild(icon)

    }
}



function initProgram(e){
   /* // Example usage
    const basicProgram = new Program(e);
    basicProgram.run();
    basicProgram.close();

    const consoleProgram = new ConsoleProgram('Console Program', 'Command Line');
    consoleProgram.createWindow();
    consoleProgram.run();
    consoleProgram.close();*/


    let programInstance = new programList[e](e)

    programInstance.run()


}

runningPrograms = [
    {name:"WindOS",id:0}
]



// Program class
class Program {
    constructor(name) {
        this.name = name;
        this.id;
        this.window
        this.windowTop
        this.windowContent
        this.x = 500
        this.y = 500

        this.startX = 0;
        this.startY = 0;
        this.endX = 0;
        this.endY = 0;

        this.lastX = 0;
        this.lastY = 0;
        this.deltaX = 0;
        this.deltaY = 0;

        
        this.velX = 0;
        this.velY = 0;
        this.friction = 0.8
        this.bounceFactor = 0.7
    }

    run() {
        console.log(`Running ${this.name} program...`);
        this.id = runningPrograms.length
        runningPrograms.push(this)
    }

    createWindow() {
        console.log(`Creating ${this.consoleType} console window for ${this.name} program...`);

        this.windowContent = document.createElement("div");
        this.windowContent.className = "window-content";
        

        // Create the main div element
        this.window = document.createElement("div");
        this.window.id = this.name;
        this.window.className = "window";
        this.window.style.width = this.width+"px";
        this.window.style.height = this.height+"px";
        /*this.x = this.left
        this.y = this.top
        this.window.style.top = this.top;
        this.window.style.left = this.left;*/
        this.window.style.zIndex = runningPrograms.length-1

        // Create the window-top div element
        this.windowTop = document.createElement("div");
        this.windowTop.className = "window-top";


        let titleContainer = document.createElement("div");
        let titleText = document.createElement("p")
        titleContainer.className = "title"
        titleText.innerHTML = this.name

        titleContainer.appendChild(titleText)


        let buttons = document.createElement("div")
        buttons.className = "buttons"
        
        // Create three button elements and append them to the window-top div
        let greenButton = document.createElement("button");
        greenButton.className = "round green";
        buttons.appendChild(greenButton);

        let yellowButton = document.createElement("button");
        yellowButton.className = "round yellow";
        buttons.appendChild(yellowButton);

        let redButton = document.createElement("button");
        redButton.className = "close round red";
        buttons.appendChild(redButton);

        this.windowTop.append(titleContainer)
        this.windowTop.appendChild(buttons)

        // Append the child elements to the main div
        this.window.appendChild(this.windowTop);
        this.window.appendChild(this.windowContent);

        // Insert the main div into the body
        document.body.appendChild(this.window);

        let $jWindow = $(this.window);

        // Window resize
        $jWindow.resizable({ handles: "all", alsoresize: ".window-content" });

        // Window close
        //$('.windowclose').on("dblclick", function () { $(this).parents('div.window').hide(); });
        $jWindow.on("click", ".close:first", function () {
            $(this).closest('.window').remove();
        });
        
        $jWindow.mousedown(() => {
            this.bringToTop();
        });



        // Listen to mouse

        let isMouseDown = false;

        this.windowTop.addEventListener("mousedown", (e) => {
            isMouseDown = true;
        });


        document.addEventListener("mousemove", (event)=>{
            event.preventDefault();
            if(isMouseDown){
                this.startX = this.lastX;
                this.startY = this.lastY;
                this.endX = event.clientX
                this.endY = event.clientY

                this.deltaX = this.endX - this.startX 
                this.deltaY = this.endY - this.startY

                this.lastX = this.endX;
                this.lastY = this.endY
            }
            else{
                this.lastX = event.clientX
                this.lastY = event.clientY
            }
        })

        document.addEventListener("mouseup", () => {
            if (isMouseDown) {
                isMouseDown=false
            }
        })
        this.update()

    }

    update(){
        
        this.velX += this.deltaX*0.25
        this.velY += this.deltaY*0.25

        this.velX *= this.friction
        this.velY *= this.friction

        /*this.window.style.left = this.window.style.left - this.velX +" px";
        this.window.style.top = this.window.style.top - this.velY + " px";*/

        this.x += this.velX
        this.y += this.velY

        this.window.style.left = this.x + "px";
        this.window.style.top = this.y + "px";

        this.window.width

        this.deltaX *= 0.97
        this.deltaY *= 0.97

        
        // Get the dimensions of the viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (this.x < 0) {
            this.velX = Math.abs(this.velX) * this.bounceFactor;
            this.x = 0;
            this.deltaX*=-1* this.bounceFactor
        }
        if (this.x > viewportWidth - this.width) {
            this.velX = -Math.abs(this.velX) * this.bounceFactor;
            this.x = viewportWidth - this.width;
            this.deltaX*=-1* this.bounceFactor
        }

        if (this.y < 0) {
            this.velY = Math.abs(this.velY) * this.bounceFactor;
            this.y = 0;
            this.deltaY*=-1* this.bounceFactor
        }
        if (this.y > viewportHeight - this.height) {
            this.velY = -Math.abs(this.velY) * this.bounceFactor;
            this.y = viewportHeight - this.height;
            this.deltaY*=-1* this.bounceFactor
        }
        
        this.width =     this.window.offsetWidth 
        this.height =     this.window.offsetHeight

        requestAnimationFrame(() => this.update());
        
    }

    bringToTop(){
        runningPrograms.splice(this.window.style.zIndex,1)

        runningPrograms.push(this)

        for (let i = 0; i < runningPrograms.length; i++) {
            let program = runningPrograms[i];
            if(program.window){
                program.window.style.zIndex = i
            }
        }


    }


    close() {
        console.log(`${this.name} program closed.`);
    }
}


class ConsoleProgram extends Program {
    constructor(name, consoleType) {
        super(name);
        this.window;
        this.windowContent;
        this.width = "450";
        this.height="250"
        this.top = "50%";
        this.left = "50%";
        this.consoleType = consoleType;
    }

    createWindow() {
        super.createWindow()
        // Create the window-content div element
        this.windowContent.innerHTML = "&gt; Welcome to the WindOS console<br />&gt;<br />&gt;&gt; B/";

        // Create the input element
        let inputElement = document.createElement("input");
        inputElement.className = "window-input";
        inputElement.type = "text";

        this.window.appendChild(inputElement);
    }

    run() {
        super.run();
        console.log(`Console program is running on ${this.consoleType} console.`);
        this.createWindow()
    }
}



class Calculator extends Program {
    constructor(name) {
        super(name);
        this.window;
        this.windowContent;
        this.width;
        this.height;
        this.top = "50%";
        this.left = "50%";
    }
    

    createWindow() {
        super.createWindow()
      
        // Create the display input
        this.display = document.createElement("input");
        this.display.type = "text";
        this.display.id = "display";
        this.display.disabled = true;
      
        // Create the table
        let table = document.createElement("table");
      
        // Define the button values and their respective onclick functions
        const buttons = [
          "7", "8", "9", "/",
          "4", "5", "6", "-",
          "1", "2", "3", "+",
          "0", ".", "=", "C"
        ];
      
        // Helper function to create button elements
        function createButton(value, onclickFunction) {
          let button = document.createElement("input");
          button.type = "button";
          button.value = value;
          button.onclick = onclickFunction;
          return button;
        }
      
        // Loop through button values and create rows and cells
        for (let i = 0; i < 4; i++) {
          let row = table.insertRow();
      
          for (let j = 0; j < 4; j++) {
            let cell = row.insertCell();
            let buttonValue = buttons[i * 4 + j];
            let onclickFunction;
      
            if (buttonValue === "=") {
              onclickFunction =  () => this.calculateResult();
            } else if (buttonValue === "C") {
              onclickFunction = () => this.clearDisplay();
            } else {
              onclickFunction = () => this.appendToDisplay(buttonValue);
            }
      
            cell.appendChild(createButton(buttonValue, onclickFunction));
          }
        }
      
        // Append elements to the container div
        this.windowContent.appendChild(this.display);
        this.windowContent.appendChild(table);
      
      }

    appendToDisplay(value) {
        this.display.value += value;
    }

    clearDisplay() {
        this.display.value = '';
    }

    calculateResult() {
        try {
            this.display.value = eval(this.display.value);
        } catch (error) {
            this.display.value = 'Error';
        }
    }

    run() {
        super.run();
        console.log(`${this.name} program is running.`);
        this.createWindow()
    }
}


class Notepad extends Program {
    constructor(name) {
        super(name);
        this.window;
        this.windowContent;
        this.width = "500px";
        this.height = "300px";
        this.top = "50%";
        this.left = "50%";
        this.textarea;
    }
    

    createWindow() {
        super.createWindow()
        this.textarea = document.createElement("textarea");

        // Set attributes for the textarea
        this.textarea.id = "dynamicTextarea";
        this.textarea.name = "dynamicText";
        /*this.textarea.rows = 20;
        this.textarea.cols = 70;*/
        this.textarea.style.width="100%"
        this.textarea.style.height="100%"
        this.textarea.style.boxSizing="border-box"
        this.textarea.style.resize="none"
        this.textarea.style.fontFamily="Comic Sans MS"
    
        // Append the textarea to the body or another HTML element
        this.windowContent.appendChild(this.textarea);
      }

    run() {
        super.run();
        console.log(`${this.name} program is running.`);
        this.createWindow()
    }
}



class Paint extends Program {
    constructor(name) {
        super(name);
        this.window;
        this.windowContent;
        this.width = "500px";
        this.height = "500px";
        this.top = "20%";
        this.left = "20%";
        this.canvas;
    }
    
    createWindow() {
        super.createWindow()
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.windowContent.appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');
        this.context.strokeStyle = "black"
        this.context.fillStyle = "white"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.context.beginPath();

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.context.moveTo(x, y);
    }

    draw(e) {
        if (!this.isDrawing) return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.context.lineTo(x, y);
        this.context.stroke();
    }

    stopDrawing() {
        this.isDrawing = false;
    }


    run() {
        super.run();
        console.log(`${this.name} program is running.`);
        this.createWindow()
    }
}



/*var programList = {
    "Console": new ConsoleProgram('Console Program', 'Command Line'),
    "Calculator": new Calculator('Calculator'),
    "Notepad": new Notepad('Notepad'),
    "Paint": new Paint('Paint')
}*/

var programList = {
    "Console": ConsoleProgram,
    "Calculator": Calculator,
    "Notepad": Notepad,
    "Paint": Paint
}
