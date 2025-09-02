import PDFDocument from "pdfkit";

export const generateCitoPDF = data => {
  return new Promise((resolve, reject) => {
    try {
      const buffers = [];
      const doc = new PDFDocument({
        size: "A4",
        margins: { top: 50, left: 50, right: 50, bottom: 50 }
      });

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // --- ENCABEZADO ---
      doc.image("public/images/logo.png", 400, 30, { fit: [150, 80], align: "right" });

      doc
        .fillColor("#99144d")
        .fontSize(20)
        .text("Laboratorio Massone", 50, 40);

      doc
        .fontSize(10)
        .fillColor("black")
        .text("Dra. Adriana Massone - M.P. 5417", 50, 65)
        .text("Informe de Cito / Histo / IHQ", 50, 80);

      doc.moveTo(50, 110).lineTo(550, 110).strokeColor("#99144d").stroke();
      doc.moveDown(2);

      // --- INFO DEL PROTOCOLO ---
      doc.fontSize(14).fillColor("#632b91").text("Datos del Protocolo", { underline: true });
      doc.moveDown(0.5);

      doc.fontSize(12).fillColor("black");
      doc.text(`Nro. Protocolo: ${data.protocolNumber}`);
      doc.text(`Tipo de estudio: ${data.studyType}`);
      doc.text(`Fecha de ingreso: ${data.entryDate.toLocaleDateString()}`);
      doc.text(`Fecha de entrega: ${data.dueDate?.toLocaleDateString() || "-"}`);
      doc.moveDown();

      // --- PACIENTE ---
      doc.fontSize(14).fillColor("#632b91").text("Paciente", { underline: true });
      doc.fontSize(12).fillColor("black");
      doc.text(`Nombre: ${data.patient.name}`);
      doc.text(`Tutor: ${data.patient.owner}`);
      doc.text(`Especie: ${data.patient.species}`);
      doc.text(`Raza: ${data.patient.breed}`);
      doc.text(`Edad: ${data.patient.age}`);
      doc.text(`Sexo: ${data.patient.sex}`);
      doc.text(`Color: ${data.patient.color}`);
      doc.text(`Castrado: ${data.patient.neutered ? "Sí" : "No"}`);
      doc.moveDown();

      // --- DESCRIPCIONES ---
      if (data.macroDescription) {
        doc.fontSize(14).fillColor("#632b91").text("Descripción Macroscópica", { underline: true });
        doc.fontSize(12).fillColor("black").text(data.macroDescription, { align: "justify" });
        doc.moveDown();
      }

      if (data.microDescription) {
        doc.fontSize(14).fillColor("#632b91").text("Descripción Microscópica", { underline: true });
        doc.fontSize(12).fillColor("black").text(data.microDescription, { align: "justify" });
        doc.moveDown();
      }

      if (data.result) {
        doc.fontSize(14).fillColor("#632b91").text("Diagnóstico", { underline: true });
        doc.fontSize(12).fillColor("black").text(data.result, { align: "justify" });
        doc.moveDown();
      }

      // --- PIE DE PÁGINA ---
      doc.fontSize(10).fillColor("gray")
        .text("Generado automáticamente por el sistema del Laboratorio Massone", 50, 780, { align: "center", width: 500 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
