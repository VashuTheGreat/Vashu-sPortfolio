const PATH = require("path");
const fs = require("fs").promises;

const data_file_path = PATH.join(__dirname, '../db/data.json');
const other_data_file_path = PATH.join(__dirname, '../db/otherAct.json');

// Read file helper
async function readFile(filePath) {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

// Write file helper
async function writeFile(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Rank File for main data.json
async function rankFile(req, res) {
  const { pre_id, to_id } = req.query;
  if (!pre_id || !to_id) return res.status(400).send("pre_id and to_id required");

  try {
    const data = await readFile(data_file_path);

    const idx = data.findIndex(item => item.id === Number(pre_id));
    if (idx === -1) return res.status(404).send("pre_id not found");

    const item = data[idx];
    data.splice(idx, 1);

    item.id = Number(to_id);

    let insertIdx = data.findIndex(obj => obj.id >= item.id);
    if (insertIdx === -1) insertIdx = data.length;

    data.splice(insertIdx, 0, item);

    // Reassign ids 1,2,3...
    for (let i = 0; i < data.length; i++) {
      data[i].id = i + 1;
    }

    await writeFile(data_file_path, data); // ✅ await here

    res.send({ success: true, data });

  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
}

// Rank File for otherAct.json
async function otherrankFile(req, res) {
  const { pre_id, to_id } = req.query;
  if (!pre_id || !to_id) return res.status(400).send("pre_id and to_id required");

  try {
    const data = await readFile(other_data_file_path);

    const idx = data.findIndex(item => item.id === Number(pre_id));
    if (idx === -1) return res.status(404).send("pre_id not found");

    const item = data[idx];
    data.splice(idx, 1);

    item.id = Number(to_id);

    let insertIdx = data.findIndex(obj => obj.id >= item.id);
    if (insertIdx === -1) insertIdx = data.length;

    data.splice(insertIdx, 0, item);

    for (let i = 0; i < data.length; i++) {
      data[i].id = i + 1;
    }

    await writeFile(other_data_file_path, data);

    res.send({ success: true, data });

  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
}

module.exports = { rankFile, otherrankFile };
