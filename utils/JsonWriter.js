const fs = require('fs');
const path = require('path');

class JsonWriter {
    static savePRNumber(prNumber) {

        const filePath = path.join(__dirname, '..', 'testdata.json');

        let data = {};

        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }

        data.addLine = data.addLine || {};
        data.approvers = data.approvers || {};

        // Save same value in both places
        data.addLine.prNumber = prNumber;
        data.approvers.number = prNumber;

        fs.writeFileSync(
            filePath,
            JSON.stringify(data, null, 4)
        );

        console.log("PR Number saved:", prNumber);
        console.log("Approver Number saved:", prNumber);
    }



} module.exports = JsonWriter;
