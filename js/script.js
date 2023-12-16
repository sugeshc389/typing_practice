const typingText = document.querySelector(".typing-text p"),
    inputField = document.querySelector(".wrapper .input-field"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    tryAgainBtn = document.querySelector("button"),
    cpmTag = document.querySelector(".cpm span");


let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

const randomParagraph = () => {
    let randomIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = "";
    paragraphs[randomIndex].split('').forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

const initTyping = () => {
    const charecters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split('')[charIndex];
    if (charIndex < charecters.length - 1 && timeLeft > 0) {
        if (!isTyping) {

            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            charIndex--;
            if (charecters[charIndex].classList.contains("incorrect")) {

                mistakes--;
            }
            charecters[charIndex].classList.remove("correct", "incorrect");

        } else {


            if (charecters[charIndex].innerText === typedChar) {
                charecters[charIndex].classList.add("correct");

            } else {
                mistakes++;
                charecters[charIndex].classList.add("incorrect");

            }
            charIndex++;

        }
        charecters.forEach(span => span.classList.remove("active"));
        charecters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerHTML = mistakes;
        wpmTag.innerHTML = wpm;
        cpmTag.innerHTML = charIndex - mistakes
    } else {
        inputField.value = "";
        clearInterval(timer);
    }

}

const initTimer = () => {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerHTML = timeLeft;
    } else {
        clearInterval(timer);
    }
}

const resetType = () => {
    randomParagraph();
    inputField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;

}


randomParagraph();
inputField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetType);