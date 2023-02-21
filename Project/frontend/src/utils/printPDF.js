import jsPDF from "jspdf";
import "jspdf-autotable";

const printPDF = (data = [], title, fileName) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const headers = [Object.keys(data[0])];
    const tableData = data.map(obj => Object.values(obj))

    let content = {
        startY: 50,
        head: headers,
        body: tableData
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(`${fileName}.pdf`)
}

export default printPDF;