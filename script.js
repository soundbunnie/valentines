let noClicks = 0;
let previousNumber;
let maxClicksExceeded = false
const maxNoClicks = 4;
const minNoScale = 0.65;
let buttonClicked = false
let noScale = 1;
let yesScale = 1; // This now tracks the scaling factor directly
const gifElement = document.getElementById("togepi-gif");
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const buttonContainer = document.querySelector(".btn-container");
const yesButtonStyle = window.getComputedStyle(yesButton);
const maxYesWidth = parseFloat(yesButtonStyle.maxWidth);

// array of gifs - in order
const gifs = ["assets/images/cant-sleep-pokemon.gif", "assets/images/pikachu-capri-sun-sad-pikachu.gif", "assets/images/pikachu-sad.gif", "assets/images/sad-pikachu.gif"];
// array of messages
const buttonMessages = ["you sure?", "please", "PLEASE PLEASE", "PLEASE PLEASE PLEASE", "with a cherry on top..?", "hamster dance?", "THINK OF THE HAMSTERS", "BUILDING SEVEN"];

function rollMessage(){
    buttonText = Math.floor(Math.random() * buttonMessages.length)
    previousNumber = buttonText
}
// no button clicked
noButton.addEventListener("click", () => {
    if (noClicks < maxNoClicks) {
        // change image
        gifElement.src = gifs[noClicks];
    }
    else if (noClicks >= maxNoClicks) {
        noClicks = 0;
        gifElement.src = gifs[noClicks];
        maxClicksExceeded = true;
    }

    // change no button text
    rollMessage()
    if (!buttonClicked){
        noButton.textContent = buttonMessages[0];
        buttonClicked = true;
        buttonMessages.shift();
    }
    else if (buttonClicked && !maxClicksExceeded){
        noButton.textContent = buttonMessages[noClicks];
    }
    else if (buttonClicked){
        if (buttonText = previousNumber){
            rollMessage();
            noButton.textContent = buttonMessages[buttonText];
        }
        else {
            noButton.textContent = buttonMessages[buttonText];
        }
    }

    // Adjust button width to fit text
    noButton.style.width = 'auto';
    noButton.style.width = `${noButton.scrollWidth}px`;

    // decrease the size of the no button
    if (noScale > minNoScale) {
        noScale -= 0.1;
        noButton.style.transform = `scale(${noScale})`;
    }

    // Calculate the scaled width of the yesButton
    const baseWidth = parseFloat(yesButtonStyle.width);
    const scaledWidth = baseWidth * yesScale; // Reflects the actual visual size of the button

    console.log(`Scaled Width: ${scaledWidth}, Max Width: ${maxYesWidth}`);

    // Check if the scaled width is less than the max width
    if (scaledWidth < maxYesWidth) {
        yesScale += 0.5; // Increment scale by a smaller step
        yesButton.style.transform = `scale(${yesScale})`;

        // Get the current gap scale factor from CSS
        const rootStyles = getComputedStyle(document.documentElement);
        const gapScaleFactor = parseFloat(rootStyles.getPropertyValue("--gap-scale-factor")) || 250;

        // Adjust the gap dynamically
        const currentGap = parseFloat(buttonContainer.style.gap) || 20;
        const newGap = Math.sqrt(currentGap * gapScaleFactor); // Scale based on the factor
        buttonContainer.style.gap = `${newGap}px`;
    }

    // increment the number of clicks
    noClicks++;
});
