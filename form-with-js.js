const form_errors = [];

function loadHandler() {
    nameValidation();
    emailValidation();
    reasonValidation();
    messageValidation();

    maskInvalidChars(document.getElementById("name"), /[A-Za-z0-9\s]/);
    maskInvalidChars(document.getElementById("reason"), /[A-Za-z0-9\s]/);
    maskInvalidChars(document.getElementById("email"), /[A-Za-z0-9@._-]/);

    setupCharCounter();
    setupFormErrorCapture();
}

function nameValidation () {
    const name = document.getElementById("name");
    const info = document.getElementById("info");

    name.addEventListener("input", () => {
        name.setCustomValidity("");
        if (!name.checkValidity()) {
            showNameError();
        } else {
            info.textContent = "";
        }
    });
}

function showNameError () {
    const name = document.getElementById("name");
    const info = document.getElementById("info");
    let infomsg;

    if (name.validity.tooShort) {
        infomsg = "Name must be at least 2 characters.";
    } else if (name.validity.patternMismatch) {
        infomsg = "Only alphanumeric characters allowed.";
    } else if (name.validity.valueMissing) {
        infomsg = "Name is required.";
    }

    name.setCustomValidity(infomsg);
    info.textContent = infomsg;

    form_errors.push({
        field: "name",
        value: name.value,
        error: infomsg,
    });
}

function emailValidation() {
    const email = document.getElementById("email");
    const info = document.getElementById("info");

    email.addEventListener("input", () => {
        email.setCustomValidity("");
        if (!email.checkValidity()) {
            showEmailError();
        } else {
            info.textContent = "";
        }
    });
}

function showEmailError() {
    const email = document.getElementById("email");
    const info = document.getElementById("info");
    let infomsg;

    if (email.validity.tooShort) {
        infomsg = "Email must be at least 2 characters.";
    } else if (email.validity.patternMismatch) {
        infomsg = "Email must contain @ and a domain.";
    } else if (email.validity.valueMissing) {
        infomsg = "Email is required.";
    }

    email.setCustomValidity(infomsg);
    info.textContent = infomsg;

    form_errors.push({
        field: "email",
        value: email.value,
        error: infomsg,
    });
}


function reasonValidation() {
    const reason = document.getElementById("reason");
    const info = document.getElementById("info");

    reason.addEventListener("input", () => {
        reason.setCustomValidity("");
        if (!reason.checkValidity()) {
            showReasonError();
        } else {
            info.textContent = "";
        }
    });
}

function showReasonError() {
    const reason = document.getElementById("reason");
    const info = document.getElementById("info");
    let infomsg;

    if (reason.validity.tooShort) {
        infomsg = "Reason must be at least 2 characters.";
    } else if (reason.validity.patternMismatch) {
        infomsg = "Only alphanumeric characters allowed.";
    } else if (reason.validity.valueMissing) {
        infomsg = "Reason is required.";
    }

    reason.setCustomValidity(infomsg);
    info.textContent = infomsg;

    form_errors.push({
        field: "reason",
        value: reason.value,
        error: infomsg,
    });
}


function messageValidation() {
    const message = document.getElementById("message");
    const info = document.getElementById("info");

    message.addEventListener("input", () => {
        message.setCustomValidity("");
        if (!message.checkValidity()) {
            showMessageError();
        } else {
            info.textContent = "";
        }
    });
}

function showMessageError() {
    const message = document.getElementById("message");
    const info = document.getElementById("info");
    let infomsg;

    if (message.validity.tooShort) {
        infomsg = "Message must be at least 5 characters.";
    } else if (message.validity.valueMissing) {
        infomsg = "Message is required.";
    }

    message.setCustomValidity(infomsg);
    info.textContent = infomsg;

    form_errors.push({
        field: "message",
        value: message.value,
        error: infomsg,
    });
}


function setupCharCounter() {
    const message = document.getElementById("message");
    const counter = document.getElementById("charCount");
    const max = message.maxLength; 
    message.addEventListener("input", () => {
        const len = message.value.length;
        counter.textContent = `${len} / ${max}`;
        if (len > max) {
            message.value = message.value.slice(0, max);
            return; 
        }
        counter.style.color = "gray";
        if (len >= max * 0.8 && len < max) {
            counter.style.color = "orange";
        } else if (len >= max) {
            counter.style.color = "red";
            message.style.backgroundColor = "#f8d7da";
            const info = document.getElementById("info");
            info.textContent = "Message exceeded maximum allowed characters.";
            form_errors.push({
                field: "message",
                value: message.value,
                error: "Exceeded maximum characters",
            });
            setTimeout(() => {
                message.style.backgroundColor = "";
                info.textContent = "";
            }, 2000);
            message.setCustomValidity("Message exceeded maximum allowed characters.");
        }
    });
}

function maskInvalidChars(field, pattern) {
    const error = document.getElementById("error");
    field.addEventListener("input", () => {
        const value = field.value;
        const lastChar = value.slice(-1);
        if (!lastChar) return; 
        if (!pattern.test(lastChar)) {
            field.style.backgroundColor = "#f8d7da";
            setTimeout(() => field.style.backgroundColor = "", 350);
            error.textContent = `Illegal character typed in ${field.name}`;
            setTimeout(() => {
                error.textContent = "";
            }, 2000);
        }
    });
}

function setupFormErrorCapture() {
    const form = document.getElementById("contactform");
    form.addEventListener("submit", (event) => {
        document.getElementById("form_errors").value = JSON.stringify(form_errors);
    });
}

window.addEventListener("DOMContentLoaded", loadHandler); 