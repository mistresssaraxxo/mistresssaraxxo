let apiUrl = 'https://ipinfo.io/json?token=1d5ef26d3b6e66';
let consoleDiv = document.getElementById("console");
let consoleContent = document.querySelector(".console-content");
let hackMessage = document.getElementById("hackMessage");
let blinkingPrompt = document.getElementById("blinkingPrompt");

let txt = [
    "sudo apt-get update\nUpdate complete",
    "sudo apt-get install Sara-Malware\Sara-malware installed",
    "Sara-ware scan --ip #IPADDR\nIP scan: 1520 vulnerabilities found",
    "Sara-ware scan --location #City, #Region, #Country\nLocation scan: 3 threats",
    "Sara-ware scan --provider #Provider\nProvider scan: 6 threats",
    "ping -c 4 #IPADDR\n4 packets transmitted, 4 received",
    "traceroute #IPADDR\ntraceroute to #IPADDR\n1 10.0.0.1 1ms\n2 #IPADDR 2ms",
    "whois #IPADDR\nOrganization: #Provider",
    "nmap -sS -O #IPADDR\n22/tcp open ssh\nOS detected",
    "Sara-ware exploit --target #IPADDR\nExploiting #IPADDR\nShell access granted",
    "Sara-ware exploit --vulnerabilities --target #IPADDR\nExploiting vulnerabilities\nDone",
    "Sara-ware exploit --get-shell --target #IPADDR\nGetting shell access\nAccess granted",
    "sudo Sara-ware install-backdoor --target #IPADDR\nBackdoor installed",
    "sudo Sara-ware remove --target #IPADDR\nAva-ware removed",
    "scp Sara-ware-backdoor #IPADDR:/tmp/\nFile transferred",
    "ssh #IPADDR 'chmod +x /tmp/Sara-ware-backdoor && /tmp/Sara-ware-backdoor'\nBackdoor running",
    "cat /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:/home/user:/bin/bash",
    "cat /etc/shadow\nroot:*:18966:::\nuser:*:18966:::",
    "sudo rm -rf / --no-preserve-root\nrm: dangerous operation",
    "connect\nConnecting..."
];

let currentIndex = 0;

function typeLine(line, callback) {
    let charIndex = 0;
    let p = document.createElement("p");
    p.textContent = "SaraHack:~$ ";
    consoleContent.appendChild(p);

    function typeChar() {
        p.textContent += line[charIndex];
        charIndex++;
        if (charIndex < line.length) {
            setTimeout(typeChar, 50);
        } else {
            p.classList.remove("typing-effect");
            callback();
        }
        consoleDiv.scrollTop = consoleDiv.scrollHeight; // Scroll to bottom
    }

    p.classList.add("typing-effect");
    typeChar();
}

function typeNextLine(callback) {
    if (currentIndex < txt.length) {
        typeLine(txt[currentIndex], () => {
            currentIndex++;
            setTimeout(() => typeNextLine(callback), 500);
        });
    } else {
        callback();
    }
}

window.onload = () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            blinkingPrompt.style.display = 'none';
            txt = replacePlaceholders(txt, data);
            typeNextLine(() => {
                setTimeout(() => {
                    hackMessage.style.display = 'block';
                }, 1000);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
};

// Function to replace placeholders with fetched data
function replacePlaceholders(textArray, data) {
    return textArray.map(line => {
        line = line.replace(/#IPADDR/g, data.ip);
        line = line.replace(/#Country/g, data.country);
        line = line.replace(/#City/g, data.city);
        line = line.replace(/#Region/g, data.region);
        line = line.replace(/#Provider/g, data.org);
        return line;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('myTitle');
    
    // Change the style properties
    title.style.color = 'blue'; // Change text color
    title.style.fontSize = '2em'; // Change font size
    title.style.textAlign = 'center'; // Center the text
    title.style.fontFamily = 'Arial, sans-serif'; // Change font family
    title.style.border = '2px solid black'; // Add a border
    title.style.padding = '10px'; // Add some padding
    title.style.backgroundColor = '#f0f0f0'; // Change background color
});
