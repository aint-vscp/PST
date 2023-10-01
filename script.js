var loadingScreen = document.querySelector('.loading_screen');
var main_screen = document.querySelector('.main_screen');

loadingScreen.addEventListener('animationend', function() {
    loadingScreen.classList.add('end');
    
    setTimeout(function() {
        loadingScreen.style.display = 'none';
    }, 1000); 
});

const passwordInput = document.getElementById("passwordInput");
const colorIndicator = document.getElementById("colorIndicator");
const suggestionText = document.getElementById("suggestion");

const commonPasswords = [
    "password",
    "123456",
    "qwerty",
    "abc123",
    "123456789",
    "12345",
    "qwerty123",
    "1q2w3e",
    "12345678",
    "111111",
    "1234567890",
    "123",
    "zxczxczxc",
    "pogiako",
    "pogi123",
    "picture1",
    "111111",
    "senha",
    "admin",
    "letmein",
    "guest",
    "col123456",
    "1234",
    "000000",
    "555555",
    "666666",
    "123321",
    "654321",
    "7777777",
    "D1lakiss",
    "777777",
    "110110jp",
    "1111",
    "987654321",
    "121212",
    "gizli",
    "abc123",
    "112233",
    "azerty",
    "159753",
    "1q2w3e4r",
    "54321",
    "pass@123",
    "222222",
    "qwertyuiop",
    "qwerty123",
    "qazwsx",
    "vip",
    "asdasd",
    "123qwe",
    "123654",
    "iloveyou",
    "a1b2c3",
    "999999",
    "Groupd2013",
    "1q2w3e",
    "usr",
    "Liman1000",
    "1111111",
    "333333",
    "123123123",
    "9136668099",
    "11111111",
    "1qaz2wsx",
    "password1",
    "mar20lt",
    "987654321",
    "gfhjkm",
    "159357",
    "abcd1234",
    "131313",
    "789456",
    "luzit2000",
    "aaaaaa",
    "zxcvbnm",
    "asdfghjkl",
    "1234qwer",
    "88888888",
    "dragon",
    "987654",
    "888888",
    "qwe123",
    "football",
    "3601",
    "asdfgh",
    "master",
    "samsung",
    "12345678910",
    "killer",
    "1237895",
    "1234561",
    "12344321",
    "daniel",
    "000000",
    "444444",
    "101010",
    "qazwsxedc",
    "789456123",
    "super123",
    "qwer1234",
    "123456789a",
    "823477aA",
    "147258369",
    "unknown",
    "98765",
    "q1w2e3r4",
    "232323",
    "102030",
    "12341234",
];

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;

    if (password.trim() === "") {
        updateColorIndicator("Empty");
        suggestionText.innerText = "Please enter a password.";
        return;
    }
    
    if (isCommonPassword(password) || isRepeatingPattern(password)) {
        updateColorIndicator("Common");
        suggestionText.innerText = "This password is commonly used or has a repeating pattern. Please choose a stronger password.";
        return;
    }

    const strength = getPasswordStrength(password);
    updateColorIndicator(strength);
    updateSuggestions(strength);
});

function isCommonPassword(password) {
    const normalizedPassword = password.toLowerCase();
    return commonPasswords.includes(normalizedPassword);
}

function isRepeatingPattern(password) {
    const pattern = /^(.+?)\1+$/; // Regular expression to detect repeating patterns
    return pattern.test(password);
}

function getPasswordStrength(password) {
    const lengthScore = password.length >= 8 ? 2 : 0;
    const lowercaseScore = /[a-z]/.test(password) ? 1 : 0;
    const uppercaseScore = /[A-Z]/.test(password) ? 1 : 0;
    const digitScore = /[0-9]/.test(password) ? 1 : 0;
    const symbolScore = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password) ? 2 : 0;

    const totalScore = lengthScore + lowercaseScore + uppercaseScore + digitScore + symbolScore;

    if (totalScore < 3) {
        return "Weak";
    } else if (totalScore < 5) {
        return "Medium";
    } else {
        return "Strong";
    }
}

function updateColorIndicator(strength) {
    colorIndicator.className = "colorIndicator";
    if (strength === "Empty" || strength === "Common") {
        colorIndicator.classList.add("gray");
    } else if (strength === "Weak") {
        colorIndicator.classList.add("red");
    } else if (strength === "Medium") {
        colorIndicator.classList.add("yellow");
    } else {
        colorIndicator.classList.add("green");
    }
}

function updateSuggestions(strength) {
    suggestionText.innerText = `Suggestions for a ${strength} password:\n`;

    if (strength === "Weak") {
        suggestionText.innerText += "- Use a longer password.\n";
        suggestionText.innerText += "- Include uppercase and lowercase letters.\n";
        suggestionText.innerText += "- Include numbers and special characters.\n";
    } else if (strength === "Medium") {
        suggestionText.innerText += "- Consider using a longer passphrase.\n";
        suggestionText.innerText += "- Add more special characters for extra complexity.\n";
    } else if (strength === "Common") {
        suggestionText.innerText += "- Choose a password that is not commonly used.\n";
    } else {
        suggestionText.innerText += "- Great job! Your password is strong.\n";
    }
}