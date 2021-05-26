const fs = require('fs');
const path = require('path');

exports.getData = () => {
    return JSON.parse(fs.readFileSync(path.resolve('./data.json'), 'utf8'));
}

exports.setData = data => {
    fs.writeFileSync(path.resolve('./data.json'), JSON.stringify(data));
}