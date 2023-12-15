const typingText = document.querySelector(".typing-text p"),
    inputField = document.querySelector(".wrapper .input-field");

let charIndex = 0;

const randomParagraph = () => {
    let randomIndex = Math.floor(Math.random() * paragraphs.length)
    paragraphs[randomIndex].split('').forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

const initTyping = () => {
    const charecters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split('')[charIndex];

    if (charecters[charIndex].innerText === typedChar) {

        console.log("correct");
    } else {
        console.log("incorrect");

    }
    charIndex++;
}

randomParagraph();
inputField.addEventListener("input", initTyping);