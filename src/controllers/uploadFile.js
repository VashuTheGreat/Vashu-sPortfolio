const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../public");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
function getFileName() {
    try {
        const filePath = path.join(__dirname, "../db/.env.json");
        const data = fs.readFileSync(filePath, "utf8");
        const jsonData = JSON.parse(data);
        return jsonData[0]?.RESUME || "vashu_resume.pdf"; 
    } catch (err) {
        console.error("Error reading filename from JSON:", err);
        return "vashu_resume.pdf"; 
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); 
    },
    filename: function (req, file, cb) {
        const filename = getFileName();
        cb(null, filename);
    }
});

const upload = multer({ storage });

module.exports = upload;
