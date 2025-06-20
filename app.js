const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const customTipInput = document.getElementById("custom-tip");
const tipRadioButtons = document.querySelectorAll("[type=radio][name=tip]");
const tipPerPersonOutput = document.getElementById("tip-per-person");
const totalPerPersonOutput = document.getElementById("total-per-person");
const billErrorMessage = document.getElementById("bill-error-message");
const peopleErrorMessage = document.getElementById("people-error-message");
const calculatorForm = document.getElementById("tip-calculator-form");
const resetButton = document.querySelector("[type=reset]");

console.log(billErrorMessage);

const calculateTipPercent = () => {
  let selectedTipValue = "";
  if (!customTipInput.value) {
    tipRadioButtons.forEach((radioButton) => {
      if (radioButton.checked) {
        selectedTipValue = radioButton.value;
      }
    });
  } else if (!isNaN(customTipInput.value) && customTipInput.value) {
    selectedTipValue = customTipInput.value;
  } else {
    return 0;
  }

  return parseFloat(selectedTipValue);
};

const calculateResult = () => {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);
  const tipPercent = calculateTipPercent();
  console.log(bill);
  console.log(people);
  console.log(tipPercent);

  const tip = (tipPercent * bill) / 100;
  const tipPerPerson = tip / people;
  const totalPerPerson = (bill + tip) / people;

  if (!isNaN(tipPerPerson) && !isNaN(totalPerPerson)) {
    tipPerPersonOutput.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalPerPersonOutput.textContent = `$${totalPerPerson.toFixed(2)}`;
  } else {
    tipPerPersonOutput.textContent = `$0.00`;
    totalPerPersonOutput.textContent = `$0.00`;
  }
};

const validateBillInput = () => {
  const bill = parseFloat(billInput.value);
  if (isNaN(bill)) {
    billErrorMessage.textContent = `Value is required`;
    billErrorMessage.classList.remove("hidden");
    billErrorMessage.setAttribute("aria-hidden", "false");
    billInput.closest(".input-container").classList.add("error");
  } else {
    billErrorMessage.textContent = ``;
    billErrorMessage.classList.add("hidden");
    billErrorMessage.setAttribute("aria-hidden", "true");
    billInput.closest(".input-container").classList.remove("error");
  }
};

const validatePeopleInput = () => {
  const people = parseInt(peopleInput.value);
  if (isNaN(people)) {
    peopleErrorMessage.textContent = `Value is required`;
    peopleErrorMessage.classList.remove("hidden");
    peopleErrorMessage.setAttribute("aria-hidden", "false");
    peopleInput.closest(".input-container").classList.add("error");
  } else if (people <= 0) {
    peopleErrorMessage.textContent = `Can't be 0`;
    peopleErrorMessage.classList.remove("hidden");
    peopleErrorMessage.setAttribute("aria-hidden", "false");
    peopleInput.closest(".input-container").classList.remove("error");
  } else {
    peopleErrorMessage.textContent = ``;
    peopleErrorMessage.classList.add("hidden");
    peopleErrorMessage.setAttribute("aria-hidden", "true");
    peopleInput.closest(".input-container").classList.remove("error");
  }
};

calculateResult();

tipRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", () => {
    if (radioButton.checked) {
      customTipInput.value = "";
      calculateResult();
    }
  });
});

customTipInput.addEventListener("focus", () => {
  tipRadioButtons.forEach((radioButton) => {
    radioButton.checked = false;
  });
});

customTipInput.addEventListener("input", calculateResult);
billInput.addEventListener("input", calculateResult);
billInput.addEventListener("input", validateBillInput);
billInput.addEventListener("blur", validateBillInput);
peopleInput.addEventListener("input", calculateResult);
peopleInput.addEventListener("input", validatePeopleInput);
peopleInput.addEventListener("blur", validatePeopleInput);
resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  calculatorForm.reset();
  calculateResult();

  // Clear Bill Input error messages
  billErrorMessage.textContent = ``;
  billErrorMessage.classList.add("hidden");
  billErrorMessage.setAttribute("aria-hidden", "true");
  billInput.closest(".input-container").classList.remove("error");

  // Clear People Input error messages
  peopleErrorMessage.textContent = ``;
  peopleErrorMessage.classList.add("hidden");
  peopleErrorMessage.setAttribute("aria-hidden", "true");
  peopleInput.closest(".input-container").classList.remove("error");
});
