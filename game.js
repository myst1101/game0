//global variables array
var clickedArray = [];
var time = 0;
var started = false;
var interval;
var ready = true;
var numCompleted = 0;
//functions definition
function reveal(cell){
    cell.style.backgroundColor = "red";
    cell.innerHTML = cell.value;
    cell.clicked = true;
}
function startTimer(){
    if (started == false){
        interval = setInterval(function(){
            time++;
            document.getElementById("timer").innerHTML = "Time Elapsed: "+ time;
        }, 1000);
        started = true;
    }
    
}
function hide(cell){
    cell.style.backgroundColor = "green";
    cell.innerHTML = "";
    cell.clicked = false;
}
function complete(cell){
    numCompleted++;
    cell.completed = true;
    cell.style.backgroundColor = "blue";
}
setUp();

//initialize the random arrays function for the various cells
function randomValues(){
    var values = [1,1,2,2,3,3,4,4,5,5,6,6];
    values.sort(function(item){
        return 0.5 - Math.random();
    })
    return values;
}
// initialize the various cells to hold the values and respond to events with the setup function
function setUp(){
    var grid = document.getElementsByTagName("td");
    var values = randomValues();
    for(var i = 0; i < grid.length; i++){
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = values[i];
        cell.addEventListener("mouseenter", function(){
            if (this.completed == false && this.clicked == false){
                this.style.background = "grey";
            }
        })
        cell.addEventListener("mouseleave", function(){
            if (this.completed == false && this.clicked == false){
                this.style.background = "green";
            }
        })
        cell.addEventListener("click", function(){
            if(ready == false){
                return;
            }
            startTimer();
            if(this.clicked == false && this.completed == false){
                clickedArray.push(this);
                reveal(this);
            }
            
        if(clickedArray.length == 2){
            if(clickedArray[0].value == clickedArray[1].value){
                complete(clickedArray[0]);
                complete(clickedArray[1]);
                clickedArray = [];
                if(numCompleted == 12){
                    alert("You won in "+ time + "   seconds");
                    clearInterval(interval);
                }
            } else {
                ready = false;
                document.getElementById("gridtable").style.border = "5px solid red";
                setTimeout(function(){
                    hide(clickedArray[0]);
                    hide(clickedArray[1]);
                    clickedArray = [];
                    ready = true;
                    document.getElementById("gridtable").style.border = "5px solid black";
                }, 500);
            } 

            
        }
        })
    }
    document.addEventListener("keypress", function(event){
        if(event.key > 0 && event.key < 13){
            grid[event.key - 1].click();
        }
    });
    document.getElementById("restart").addEventListener("click", function(){
        location.reload();
    });
}