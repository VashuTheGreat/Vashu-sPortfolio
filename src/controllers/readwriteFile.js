
const fs=require("fs")
function readFile(filename){
    try {
        if (!fs.existsSync(filename)) {
            return [];
        }
        const data = fs.readFileSync(filename, 'utf-8').trim();
        if (!data) {
            return [];
        }
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        return [];
    }
}



function writeFile(data, filename){

    const jsonData = readFile(filename);
        
    jsonData.push(data);
        
    fs.writeFile(filename, JSON.stringify(jsonData, null, 2), (writeErr) => {
        if (writeErr) {
            console.error( writeErr);
        }
    });

}

module.exports={readFile,writeFile}