const fs = require('fs');
const path = require('path');

class JsonWriter {

    static savePRNumber(prNumber) {

        const filePath = path.join(__dirname, '..', 'testdata.json');

        let data = {};

        if (fs.existsSync(filePath)) {
            data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }

        if (!data.addLine) {
            data.addLine = {};
        }

        data.addLine.prNumber = prNumber;

        fs.writeFileSync(
            filePath,
            JSON.stringify(data, null, 4)
        );

        console.log("PR Number saved:", prNumber);
    }

}

module.exports = JsonWriter;