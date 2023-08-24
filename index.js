// changing the form title
document.getElementById("edit-form-title").addEventListener("click", function() {
    var formTitle = document.getElementById("form-title");
    var newFormTitle = document.createElement("input");
    newFormTitle.className = "form-title-text";
    newFormTitle.type = "text";
    newFormTitle.value = formTitle.innerText;
    formTitle.innerHTML = "";
    formTitle.appendChild(newFormTitle);

    newFormTitle.addEventListener("blur", function(){
        var updatedTitle = newFormTitle.value;
        formTitle.removeChild(newFormTitle);
        formTitle.innerText = updatedTitle;
    });
    newFormTitle.focus();
});

// Question for the input field
function addQuestionLabel(text, elementType, className, blurCallback) {
    var question = document.createElement(elementType);
    question.textContent = text;
    question.className = className;

    question.addEventListener("click", function () {
        var inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = question.textContent;
        question.innerHTML = "";
        question.appendChild(inputElement);

        inputElement.addEventListener("blur", function () {
            var updatedText = inputElement.value;
            question.removeChild(inputElement);
            question.textContent = updatedText;
            if (question.textContent == "") {
                alert("Please fill the required field");
                question.textContent = "Write Something Here";
            }
            if (blurCallback) {
                blurCallback(updatedText);
            }
        });
        inputElement.focus();
    });
    
    return question;
}
var counter = 1;
// Adding new input field
document.getElementById("addField").addEventListener("click", function () {
    document.getElementById('input-container').style.display = 'block';
    var inputContainer = document.getElementById("input-container");

    var inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";

    var questionLabel = addQuestionLabel("Write Something Here", "h4", "question-label");
    inputWrapper.appendChild(questionLabel);

    var inputType = document.getElementById("inputType");
    var value = inputType.value;

    // if (value != "select" && value != "textarea") {
    if (value === "text") {
        var input = document.createElement("input");
        input.type = value;
        input.placeholder = "Enter here";
        input.className = "form-control";

        input.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault(); 
            }
        });
    }

    if (value === "select") {
        var input = document.createElement("select");
        input.id = "dropdown";
        input.name = "dropdown";
        input.className = "selection";

        var addOption = document.createElement("button");
        addOption.className = "dropdown-add";
        addOption.textContent = "+";

        var optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.placeholder = "Enter the label";
        optionInput.className = "form-control";

        var valueInput = document.createElement("input");
        valueInput.type = "text";
        valueInput.placeholder = "Enter the value";
        valueInput.className = "form-control";

        addOption.addEventListener("click", function (event) {
            event.preventDefault();

            var optionValue = optionInput.value.trim();
            var valueDropdown = valueInput.value.trim();
            
            inputWrapper.appendChild(optionInput);
            inputWrapper.appendChild(valueInput);
            inputWrapper.appendChild(addOption);

            if (optionValue !== "" && valueDropdown !== "") {
                var option = document.createElement("option");
                option.value = valueDropdown.toLowerCase();
                option.text = optionValue;
                input.appendChild(option);
                optionInput.value = "";
                valueInput.value = "";
            }
        });
    }
    // console.log(value); 
    if (value === "textarea") {
        var textarea = document.createElement("textarea");
        textarea.className = "textarea";
        textarea.placeholder = "Enter here";
        textarea.style.resize = "none";
        textarea.style.overflow = "hidden";
        textarea.style.height = "100px";
        textarea.addEventListener("input", function () {
            textarea.style.height = "auto";
            textarea.style.height = (textarea.scrollHeight) + "px";
        });
        inputWrapper.appendChild(textarea);
    }
    
    if (value === "radio") {
        var radioWrapper = document.createElement("div");
        radioWrapper.className = "radio-wrapper";
    
        var addRadio = document.createElement("button");
        addRadio.textContent = "+";
        addRadio.className = "dropdown-add";

        var radioValueInput = document.createElement("input");
        radioValueInput.type = "text";
        radioValueInput.className = "form-control"; 
        radioValueInput.placeholder = "Enter the option value";
    
        var radioLabelInput = document.createElement("input");
        radioLabelInput.type = "text";
        radioLabelInput.className = "form-control"; 
        radioLabelInput.placeholder = "Enter the option label";
    
        inputWrapper.appendChild(radioValueInput);  
        inputWrapper.appendChild(radioLabelInput);
        inputWrapper.appendChild(addRadio);
        
        var radioGroupName = "radioGroup" + counter;
        counter++;
        // console.log(radioGroupName);
    
        addRadio.addEventListener("click", function (event) {
            event.preventDefault();
    
            var radioValue = radioValueInput.value.trim();
            var radioLabel = radioLabelInput.value.trim();
    
            if (radioValue !== "" && radioLabel !== "") {
                var input = document.createElement("input");
                input.type = "radio";
                input.name = radioGroupName;
                input.id = radioValue.toLowerCase();
                input.value = radioValue.toLowerCase();
    
                var label = document.createElement("label");
                label.for = radioValue.toLowerCase();
                label.textContent = radioLabel;
    
                radioWrapper.appendChild(input);
                radioWrapper.appendChild(label);
                var newline = document.createElement("br");
                radioWrapper.appendChild(newline);
    
                radioValueInput.value = "";
                radioLabelInput.value = "";
            }
        });
    }
    
    if(value == "checkbox"){
        var checkboxWrapper = document.createElement("div");
        checkboxWrapper.className = "checkbox-wrapper";

        var addCheckbox = document.createElement("button");
        addCheckbox.textContent = "+";
        addCheckbox.className = "dropdown-add";
        
        var checkboxValueInput = document.createElement("input");
        checkboxValueInput.type = "text";
        checkboxValueInput.className = "form-control";
        checkboxValueInput.placeholder = "Enter the value";

        var checkboxLabelInput = document.createElement("input");
        checkboxLabelInput.type = "text";
        checkboxLabelInput.className = "form-control";
        checkboxLabelInput.placeholder = "Enter the label";

        var checkboxIdInput = document.createElement("input");
        checkboxIdInput.type = "text";
        checkboxIdInput.className = "form-control";
        checkboxIdInput.placeholder = "Enter the ID";

        inputWrapper.appendChild(checkboxValueInput);  
        inputWrapper.appendChild(checkboxLabelInput);
        inputWrapper.appendChild(checkboxIdInput);
        inputWrapper.appendChild(addCheckbox);

        addCheckbox.addEventListener("click", function() {
            event.preventDefault();
    
            var checkboxValue = checkboxValueInput.value.trim();
            var checkboxLabel = checkboxLabelInput.value.trim();
            var checkboxID = checkboxIdInput.value.trim();
    
            if (checkboxValue !== "" && checkboxLabel !== "" && checkboxID !== "") {
                var input = document.createElement("input");
                input.type = "checkbox";
                input.name = checkboxID.toLowerCase();
                input.id = checkboxID.toLowerCase();
                input.value = checkboxValue.toLowerCase();
    
                var label = document.createElement("label");
                label.for = checkboxID.toLowerCase();
                label.textContent = checkboxLabel;
    
                checkboxWrapper.appendChild(input);
                checkboxWrapper.appendChild(label);
                var newline = document.createElement("br");
                checkboxWrapper.appendChild(newline);
    
                checkboxValueInput.value = "";
                checkboxLabelInput.value = "";
                checkboxIdInput.value = "";
            }
        });
    }


    var removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.className = "removeField";

    if (value === "text" || value === "select") {
        inputWrapper.appendChild(input);
    }
    
    if (value == "select") {
        inputWrapper.appendChild(addOption);
    }

    inputWrapper.appendChild(removeButton);
    inputContainer.appendChild(inputWrapper);
    if(value == "radio"){
        inputContainer.appendChild(radioWrapper);
    }
    if(value == "checkbox"){
        inputContainer.appendChild(checkboxWrapper);
    }

    removeButton.addEventListener("click", function () {
        inputWrapper.remove();
        if(value == "radio"){
            radioWrapper.remove();
        }
        if(value == "checkbox"){
            checkboxWrapper.remove();
        }
    });
});
