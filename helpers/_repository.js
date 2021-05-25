const fs = require('fs');

exports.getData = () => {
    return JSON.stringify(fs.readFileSync(path.resolve('public/dist/data.json'), 'utf8'));
}

exports.setData = data => {
    fs.writeFileSync(path.resolve('public/dist/data.json'), JSON.stringify(result));
}