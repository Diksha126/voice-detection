
var screen1 = document.getElementById("first-screen");
var screen2 = document.getElementById("second-screen");
var screen3 = document.getElementById("third-screen");
var screenmid=document.getElementById("mid-screen");
var screen4 = document.getElementById("fourth-screen");
var contorls = document.getElementById("control");
var videoElem = document.getElementById("final_video");


function gotoScreen2(){
    screen1.style.display="none";
    screen2.style.display="block";
    setTimeout(()=> {
        screen2.style.display='none';
        screenmid.style.display='block';
    },2500);
  }

function gotoScreen3(){
    screenmid.style.display="none";
    screen3.style.display="block";
}




let selectedButtons = [];

document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll('.option');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            toggleSelection(button);
        });
    });
});

function toggleSelection(button) {
    const maxSelection = 2;

    if (button.classList.contains('selected')) {
        // Deselect the button if already selected
        button.classList.remove('selected');
        selectedButtons = selectedButtons.filter(btn => btn !== button);
    } else {
        // Select the button if less than 2 are selected
        if (selectedButtons.length < maxSelection) {
            button.classList.add('selected');
            selectedButtons.push(button);
        }
    }

    updateButtonState();
}

function updateButtonState() {
    const buttons = document.querySelectorAll('.option');
    const maxSelection = 2;
    
    buttons.forEach(button => {
        if (!button.classList.contains('selected') && selectedButtons.length >= maxSelection) {
            button.disabled = true;
            setTimeout(()=>{
                choose_style();
                console.log('navigated to 4th');
                screen3.style.display="none";
                screen4.style.display="block";
            },1200);
            
        } else {
            button.disabled = false;
        }
    });

    
}
//function to get the options selected and show the image as per the combination
var style='';
const rustic1='./assets/Rustic 1.png';
const rustic2='./assets/Rustic 2.png';
const modern1='./assets/Modern 1.png';
const modern2='./assets/Modern 2.png';
const minimalist1='./assets/Minimalist 1.png';
const minimalist2='./assets/Minimalist 2.png';
const bohemian1='./assets/Bohemian 1.png';
const bohemian2='./assets/Bohemian 2.png';

function choose_style(){
      var chosen_option=[]
      var list=document.querySelectorAll('.option.selected');
      
      for(i=0;i<list.length;i++){
        chosen_option.push(list[i].innerText); }
      if((chosen_option.includes('Simple') && chosen_option.includes('Natural')) || (chosen_option.includes('Luxurious') && chosen_option.includes('Natural')))
      {
        document.querySelector('#signstyle').setAttribute('src',rustic1); 
        style='rustic1';
      }

      else if((chosen_option.includes('Sleek') && chosen_option.includes('Vibrant')) || (chosen_option.includes('Sleek') && chosen_option.includes('Luxurious')))
      {
        document.querySelector('#signstyle').setAttribute('src',modern1);
        style='modern1';
      }

      else if((chosen_option.includes('Simple') && chosen_option.includes('Sleek')) || (chosen_option.includes('Simple') && chosen_option.includes('Luxurious')))
      {
        document.querySelector('#signstyle').setAttribute('src',minimalist1);
        style='minimalist1';
      }

      else if((chosen_option.includes('Vibrant') && chosen_option.includes('Natural')) || (chosen_option.includes('Vibrant') && chosen_option.includes('Luxurious')) || (chosen_option.includes('Simple') && chosen_option.includes('Vibrant')))
       {
        document.querySelector('#signstyle').setAttribute('src',bohemian1);
        style='bohemian1';
       }
}


function refreshImage(){
  
       if(style=='rustic1')
       {
        document.querySelector('#signstyle').setAttribute('src',rustic2); 
        style='rustic2';
       }
       else if(style=='rustic2')
       {
        document.querySelector('#signstyle').setAttribute('src',rustic1); 
        style='rustic1';
       }
       else if(style=='modern1')
       {
        document.querySelector('#signstyle').setAttribute('src',modern2);
        style='modern2';
       }
       else if(style=='modern2')
        {
         document.querySelector('#signstyle').setAttribute('src',modern1);
         style='modern1';
        }
       else if(style=='minimalist1'){
        document.querySelector('#signstyle').setAttribute('src',minimalist2); 
        style='minimalist2';
       }
       else if(style=='minimalist2'){
        document.querySelector('#signstyle').setAttribute('src',minimalist1); 
        style='minimalist1';
       }
       else if(style=='bohemian1')
       {
        document.querySelector('#signstyle').setAttribute('src',bohemian2); 
        style='bohemian2';
      }
      else if(style=='bohemian2')
        {
         document.querySelector('#signstyle').setAttribute('src',bohemian1); 
         style='bohemian1';
       }


}

//voice detection logic starts
function downloadImage(){

document.getElementById('downloadIcon').addEventListener('click', function() {
  const image = document.getElementById('signstyle');
  const imageUrl = image.src;

  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set canvas dimensions to match the image
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw the image on the canvas
  const img = new Image();
  img.crossOrigin = 'anonymous'; // Handle cross-origin issues if needed
  img.onload = function() {
      ctx.drawImage(img, 0, 0);

      // Create a link to download the image
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png'); // Convert canvas to data URL
      link.download = 'downloaded_image.png'; // Specify the file name

      // Programmatically click the link to trigger the download
      link.click();
  };
  img.src = imageUrl; // Start loading the image
});


}
document.querySelector('.audio').addEventListener('click', function() {
  voiceDetection();
});

function voiceDetection() {
  let taapped = true;
  
  try {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.start();
    recognition.continuous = true;

    recognition.onstart = function() {
      console.log('Voice recognition activated. Try speaking into the microphone.');
    };

    recognition.onresult = function(event) {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      console.log(transcript);
      const mobileRepeatBug = (current === 1 && transcript === event.results[0][0].transcript);

      if (!mobileRepeatBug) {
        const noteContent = transcript;
        console.log(noteContent);
        readChar(noteContent);
      }
    };

    recognition.onerror = function(event) {
      if (event.error === 'no-speech') {
        console.log('No speech was detected. Try again.');
      } else {
        console.error('Error occurred in recognition: ' + event.error);
      }
    };
    
  } catch (e) {
    console.error(e);
    document.querySelector('.no-browser-support').style.display = 'block';
  }
}

function readChar(text) {
  text = text.toLowerCase().trim();
  console.log(text);
  if(text=='my signature'){
    gotoScreen2();
  }
}


