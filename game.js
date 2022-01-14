'use strict'

let level=1;
const colors=['blue','green','red','yellow']
let autoColor=[];
let userColor=[];
//random number generator
const randNo=function () {
    return  Math.floor(Math.random()*4);
}
//fuction for button animation
const animationFlash=function (id,clss) {
    $("#"+id).addClass(clss);
    setInterval(() => {
        $("#"+id).removeClass(clss);  
    }, 100);
}
//function that fills autoColor array with computer's sequense
const autoFiller=function (rand) {
    const randomNo=rand;
    const audio= new Audio('sounds/'+colors[randomNo]+'.mp3');
    audio.play();
    animationFlash(colors[randomNo],'pressed');
    autoColor.push(colors[randomNo]);
    $("#level-title").text('Level '+level);
}
//function to compare two arays
const compareArr=function (arr1,arr2) {
    for (var i = 0; i < arr1.length; i++) {
        //if(arr1.length!==arr2.length) return false;
        if(arr1[i]!==arr2[i]) return false;
    }
}
//function that takes a system or button press input and plays the coresponding sound 
const playSound=function (sound) {
    const audio= new Audio('sounds/'+sound+'.mp3');
    audio.play();
}
//function that adds event listener for keypress to start the game and removes it after
  const addListener=function (document,event) {      
  return  $('#'+document).on(event,function(){
      autoColor=[];
      userColor=[];
      level=1;
        autoFiller(randNo());
        $('#'+document).unbind();
    })
  }

  addListener('body','keydown');
  addListener('start','click');
//buton click ebent listener
$('.btn').click(function (e) {
    const buttonId=e.target.id;
    userColor.push(buttonId)
    //checks if the game hasn't been initialised
    if (autoColor.length!== 0) {

          //compare userColor and auto color
        if(compareArr(userColor,autoColor)===undefined){
            // play the correct button sound
            playSound(buttonId);
            //make button flash
            animationFlash(buttonId,'pressed');
            if (userColor.length===autoColor.length) {
            level++
            setTimeout(() => {
                autoFiller(randNo());   
            }, 1000);
            userColor=[];
        }
        }else{
            $("#level-title").text('Game Over, Press Any Key to Restart');
            addListener('body','keydown');
            addListener('start','click');
            playSound('wrong');
            animationFlash('body','game-over'); 
        }
   
    } else {
        $("#level-title").text('Game Over, Press Any Key to Restart');
        addListener('body','keydown');;
        addListener('start','click');
        playSound('wrong');
        animationFlash('body','game-over');
    }
})
