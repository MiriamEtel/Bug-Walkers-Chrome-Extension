// מספר החיפושיות
const numberOfBugs = 10;

// בדיקה שהתוסף נטען
console.log("✅ Bug Walkers extension loaded!");

// קביעת Overflow כדי למנוע מהחיפושיות לצאת מהמסך
document.body.style.overflow = "hidden";

// קבלת כתובת התמונה
const bugImage = chrome.runtime.getURL("bug.png");
console.log("✅ Bug image path:", bugImage);

// בדיקת טעינת התמונה
const imgTest = new Image();
imgTest.src = bugImage;
imgTest.onload = () => console.log("✅ התמונה נטענת בהצלחה!");
imgTest.onerror = () => console.error("❌ שגיאה בטעינת התמונה! ודא שהתמונה 'bug.png' נמצאת בתיקייה");

// פונקציה ליצירת חיפושית
function createBug() {
    // בדיקה שהתמונה מגיעה מכתובת חוקית
    if (!bugImage.startsWith("chrome-extension://")) {
        console.error("❌ ניסיון לטעון תמונה ממקור לא חוקי!");
        return;
    }

    const bug = document.createElement("img");
    bug.src = bugImage;
    bug.classList.add("bug");

    bug.onload = () => {
        console.log("✅ חיפושית נוספה לדף!");
        document.body.appendChild(bug);

        // מיקום ראשוני במרכז המסך
        bug.style.position = "absolute";
        bug.style.left = `${window.innerWidth / 2}px`;
        bug.style.top = `${window.innerHeight / 2}px`;

        moveBug(bug);
    };

    bug.onerror = () => console.error("❌ שגיאה בטעינת החיפושית!");
}

// פונקציה להזזת החיפושיות עם הגבלה למסך
function moveBug(bug) {
    setInterval(() => {
        const maxX = window.innerWidth - 50; // מגביל לרוחב המסך
        const maxY = window.innerHeight - 100; // מגביל לגובה המסך

        let x = Math.max(10, Math.random() * maxX);
        let y = Math.max(10, Math.random() * maxY);

        bug.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`;
    }, Math.random() * 2000 + 1000);
}

// יצירת חיפושיות
for (let i = 0; i < numberOfBugs; i++) {
    createBug();
}
