
const fs = require('fs');
const PATH = require('path');

const data_file_path = PATH.join(__dirname, '../db/data.json');
const other_data_file_path=PATH.join(__dirname,"../db/otherAct.json")

const {readFile,writeFile}=require("./readwriteFile")



function writeAll(array,filename) {
    try {
        fs.writeFileSync(filename, JSON.stringify(array, null, 2), 'utf-8');
    } catch (err) {
        console.error(err);
    }
}




function delete_by_id(req, res) {
    const id = parseInt(req.params?.id || req.body?.id, 10);
    if (Number.isNaN(id)) return res.status(400).send('Invalid id');

    const data = readFile(data_file_path);
    const newData = data.filter((item) => item.id !== id);
    newData.forEach((item, i) => (item.id = i + 1));
    writeAll(newData,data_file_path);
    return res.redirect('/');
}

function update_by_id(req, res) {
    const id = parseInt(req.params?.id || req.body?.id, 10);
    if (Number.isNaN(id)) return res.status(400).send('Invalid id');

    const data = readFile(data_file_path);
    const idx = data.findIndex((item) => item.id === id);
    if (idx === -1) return res.status(404).send('Not found');

    const updated = { ...data[idx], ...req.body, id };
    data[idx] = updated;
    writeAll(data,data_file_path);
    return res.redirect('/');
}

function otherdelete_by_id(req, res) {
    const id = parseInt(req.params?.id || req.body?.id, 10);
    if (Number.isNaN(id)) return res.status(400).send('Invalid id');

    const data = readFile(other_data_file_path);
    const newData = data.filter((item) => item.id !== id);
    newData.forEach((item, i) => (item.id = i + 1));
    writeAll(newData,other_data_file_path);
    return res.redirect('/');
}

function otherupdate_by_id(req, res) {
    const id = parseInt(req.params?.id || req.body?.id, 10);
    if (Number.isNaN(id)) return res.status(400).send('Invalid id');

    const data = readFile(other_data_file_path);
    const idx = data.findIndex((item) => item.id === id);
    if (idx === -1) return res.status(404).send('Not found');

    const updated = { ...data[idx], ...req.body, id };
    data[idx] = updated;
    writeAll(data,other_data_file_path);
    return res.redirect('/');
}

module.exports = { delete_by_id, update_by_id,otherdelete_by_id,otherupdate_by_id };
