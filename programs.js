function initProgram(e){
   /* // Example usage
    const basicProgram = new Program(e);
    basicProgram.run();
    basicProgram.close();

    const consoleProgram = new ConsoleProgram('Console Program', 'Command Line');
    consoleProgram.createWindow();
    consoleProgram.run();
    consoleProgram.close();*/
    programList[e].run()


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
        this.zIndex
    }

    run() {
        console.log(`Running ${this.name} program...`);
        this.id = runningPrograms.length
        runningPrograms.push(this)
    }

    createWindow() {
        console.log(`Creating ${this.consoleType} console window for ${this.name} program...`);


        // Create the main div element
        this.window = document.createElement("div");
        this.window.id = this.name;
        this.window.className = "window";
        this.window.style.width = this.width;
        this.window.style.height = this.height;
        this.window.style.top = this.top;
        this.window.style.left = this.left;

        // Create the window-top div element
        let windowTop = document.createElement("div");
        windowTop.className = "window-top";

        // Create three button elements and append them to the window-top div
        let greenButton = document.createElement("button");
        greenButton.className = "round green";
        windowTop.appendChild(greenButton);

        let yellowButton = document.createElement("button");
        yellowButton.className = "round yellow";
        windowTop.appendChild(yellowButton);

        let redButton = document.createElement("button");
        redButton.className = "close round red";
        windowTop.appendChild(redButton);

        // Append the child elements to the main div
        this.window.appendChild(windowTop);
    

        // Insert the main div into the body
        document.body.appendChild(this.window);

        // Window drag
        
        let $jWindow = $(this.window);

        $jWindow.draggable({ handle: "div.window-top" });

        // Window resize
        $jWindow.resizable({ handles: "all", alsoresize: ".window-content" });

        // Window close
        //$('.windowclose').on("dblclick", function () { $(this).parents('div.window').hide(); });
        $jWindow.on("click", ".close:first", function () {
            $(this).closest('.window').remove();
        });
        

        // Window click-to-bring-to-top
        (function() {
            var highest = 100;

            $.fn.selectWindow = function() {
                // Make top
                this.css('z-index', ++highest);
                // Make this window selected and others not
                this.addClass('selectedwindow');
                $jWindow.not(this).each(function(){
                    $(this).removeClass('selectedwindow');
                });
            };
        })();
        $jWindow.mousedown(function() {
            $(this).selectWindow();
        });

        //this.bringToTop()

    }

    /*bringToTop(){
        runningPrograms.splice(this.zIndex,1)

        runningPrograms.push(this)

    }*/


    close() {
        console.log(`${this.name} program closed.`);
    }
}


class ConsoleProgram extends Program {
    constructor(name, consoleType) {
        super(name);
        this.window;
        this.width = "450px";
        this.height="250px"
        this.top = "50%";
        this.left = "50%";
        this.consoleType = consoleType;
    }

    createWindow() {
        super.createWindow()
        // Create the window-content div element
        let windowContent = document.createElement("div");
        windowContent.className = "window-content";
        windowContent.innerHTML = "&gt; Welcome to the WindOS console<br />&gt;<br />&gt;&gt; B/";

        // Create the input element
        let inputElement = document.createElement("input");
        inputElement.className = "window-input";
        inputElement.type = "text";

        this.window.appendChild(windowContent);
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
        this.width;
        this.height;
        this.top = "50%";
        this.left = "50%";
    }
    

    createWindow() {
        super.createWindow()
        // Create the container div
        let calculatorContainer = document.createElement("div");
        calculatorContainer.className = "calculator-container";
      
      
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
              onclickFunction = "programList.Calculator.calculateResult()";
            } else if (buttonValue === "C") {
              onclickFunction = "programList.Calculator.clearDisplay()";
            } else {
              onclickFunction = `programList.Calculator.appendToDisplay('${buttonValue}')`;
            }
      
            cell.appendChild(createButton(buttonValue, new Function(onclickFunction)));
          }
        }
      
        // Append elements to the container div
        calculatorContainer.appendChild(this.display);
        calculatorContainer.appendChild(table);
      
        // Append the container div to the body or any other desired location
        this.window.appendChild(calculatorContainer);
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
        this.textarea.rows = 20;
        this.textarea.cols = 70;
        /*this.textarea.style.width="100%"
        this.textarea.style.height="100%"*/
    
        // Append the textarea to the body or another HTML element
        this.window.appendChild(this.textarea);
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
        this.width = "500px";
        this.height = "500px";
        this.top = "20%";
        this.left = "20%";
        this.canvas;
    }
    
    createWindow() {
        super.createWindow()
        this.canvas = document.createElement('canvas');
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.window.appendChild(this.canvas);

        this.context = this.canvas.getContext('2d');
        this.context.strokeStyle = "red"

        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
    }

    startDrawing(e) {
        this.isDrawing = true;
        this.context.beginPath();
        this.context.moveTo(e.clientX - this.window.offsetLeft, e.clientY - this.window.offsetTop);
    }

    draw(e) {
        if (!this.isDrawing) return;

        this.context.lineTo(e.clientX - this.window.offsetLeft, e.clientY - this.window.offsetTop);
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



var programList = {
    "Console": new ConsoleProgram('Console Program', 'Command Line'),
    "Calculator": new Calculator('Calculator'),
    "Notepad": new Notepad('Notepad'),
    "Paint": new Paint('Paint')
}
