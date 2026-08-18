const fs = require('fs');
const path = require('path');

class JsonWriter {

    // =========================================================
    // Save PR Number
    // =========================================================

    static savePRNumber(prNumber) {

        const filePath =
            path.join(__dirname, '..', 'testdata.json');

        let data = {};

        if (fs.existsSync(filePath)) {
            data = JSON.parse(
                fs.readFileSync(filePath, 'utf8')
            );
        }

        data.addLine = data.addLine || {};
        data.approvers = data.approvers || {};

        // Save PR number
        data.addLine.prNumber = prNumber;
        data.approvers.number = prNumber;

        fs.writeFileSync(
            filePath,
            JSON.stringify(data, null, 4)
        );

        console.log(
            'PR Number saved:',
            prNumber
        );

        console.log(
            'Approver Number saved:',
            prNumber
        );
    }


    // =========================================================
    // Save PO Number
    // =========================================================

    static savePONumber(poNumber) {

        const filePath =
            path.join(__dirname, '..', 'testdata.json');

        let data = {};

        if (fs.existsSync(filePath)) {
            data = JSON.parse(
                fs.readFileSync(filePath, 'utf8')
            );
        }

        data.purchaseOrder =
            data.purchaseOrder || {};

        // Save PO number
        data.poapprover.poNumber = poNumber;

        fs.writeFileSync(
            filePath,
            JSON.stringify(data, null, 4)
        );

        console.log(
            'PO Number saved:',
            poNumber
        );
    }
}

module.exports = JsonWriter;