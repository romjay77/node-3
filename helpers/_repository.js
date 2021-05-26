const fs = require('fs');
const path = require('path');
var _data;

exports.cachedData = () => {
    if (!_data) {
        _data = getData();
    }    
    return _data;
}

exports.getData = getData;
function getData () {
    return JSON.parse(fs.readFileSync(path.resolve('./data.json'), 'utf8'));
}

exports.setData = data => {
    _data = data
    fs.writeFileSync(path.resolve('./data.json'), JSON.stringify(data));
}

exports.refreshData = () => {
    _data = getData();
}