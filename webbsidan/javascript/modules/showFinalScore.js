export function showFinalScore(imageContainer, question1, scoreCounter) {

    imageContainer.innerHTML = ""; //ta bort bilden till sista scoreSidan
    const button = document.createElement("button");
    button.classList.add("endbutton");
    button.textContent = "Back to start";
    question1.textContent = "Quiz is done!";
    const finalText = document.createElement("div");
    finalText.textContent = `You scored ${scoreCounter} out of 8`;
    finalText.classList.add("finalText");
    imageContainer.style.flexDirection = "column";
    imageContainer.style.display = "flex";
    imageContainer.style.justifyContent = "center";
    imageContainer.style.alignItems = "center";
    imageContainer.appendChild(finalText);
    imageContainer.appendChild(button);

    return button
}