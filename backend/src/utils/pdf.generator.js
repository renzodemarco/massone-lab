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

      doc.registerFont("Calibri", "public/fonts/Calibri.ttf");
      doc.registerFont("Calibri-Bold", "public/fonts/Calibri-Bold.ttf");
      doc.registerFont("Calibri-Italic", "public/fonts/Calibri-Italic.ttf");

      // --- ENCABEZADO ---
      doc.image("public/images/logo.png", 400, 20, { fit: [150, 80], align: "right" });

      doc
        .fillColor("#99144d")
        .font("Calibri-Bold")
        .fontSize(16)
        .text("Laboratorio de Patología Veterinaria", 50, 40);

      doc
        .fontSize(14)
        .fillColor("#632b91")
        .font("Calibri-Bold")
        .text("Histopatología / Citología / Inmunohistoquímica", 50, 65);

      doc
        .fontSize(11)
        .fillColor("#000")
        .font("Calibri-Bold")
        .text(`Protocolo número: ${data.protocolNumber}`, 50, 100);

      const formattedDate = new Date(data.entryDate).toLocaleDateString("es-AR");

      doc
        .fontSize(11)
        .fillColor("#000")
        .font("Calibri-Bold")
        .text(`Fecha de recepción de la muestra: ${formattedDate}`, 50, 100, {
          width: doc.page.width - 100,
          align: "right"
        });

      doc.moveTo(50, 125).lineTo(550, 125).strokeColor("#632b91").lineWidth(0.2).stroke();

      doc
        .font("Calibri-Italic")
        .fontSize(12)
        .fillColor("#000")
        .text("“Ninguna cadena es más fuerte que el más débil de sus eslabones.”", 0, 140, {
          align: "center",
          width: doc.page.width
        });

      doc
        .font("Calibri-Bold")
        .fontSize(14)
        .fillColor("#99144d")
        .text("VETERINARIO/A:", 50, 170);

      doc
        .font("Calibri")
        .fillColor("#000")
        .text(`${data.veterinarian}`, 152, 170);

      doc.moveTo(50, 195).lineTo(550, 195).strokeColor("#632b91").lineWidth(0.2).stroke();

      doc
        .font("Calibri-Bold")
        .fontSize(14)
        .fillColor("#99144d")
        .text("PROPIETARIO/A o TUTOR/A:", 50, 215);

      doc
        .font("Calibri")
        .fillColor("#000")
        .text(`${data.patient.owner}`, 218, 215);

      doc.moveTo(50, 240).lineTo(550, 240).strokeColor("#632b91").lineWidth(0.2).stroke();

      doc
        .font("Calibri-Bold")
        .fontSize(14)
        .fillColor("#99144d")
        .text("DATOS DEL PACIENTE:", 50, 260);

      doc
        .font("Calibri-Bold")
        .fontSize(14)
        .fillColor("#000")
        .text("Nombre:", 300, 260);

      doc
        .font("Calibri")
        .fontSize(14)
        .fillColor("#000")
        .text(`${data.patient.name}`, 356, 260);

      doc
        .font("Calibri-Bold")
        .fontSize(12)
        .fillColor("#000")
        .text("Especie:", 50, 280);

      doc
        .font("Calibri")
        .fontSize(12)
        .fillColor("#000")
        .text(`${data.patient.species}`, 96, 280);

      doc
        .font("Calibri-Bold")
        .fontSize(12)
        .fillColor("#000")
        .text("Raza:", 300, 280);

      doc
        .font("Calibri")
        .fontSize(12)
        .fillColor("#000")
        .text(`${data.patient.breed}`, 331, 280);

      doc
        .font("Calibri-Bold")
        .fontSize(12)
        .fillColor("#000")
        .text("Edad:", 50, 296);

      doc
        .font("Calibri")
        .fontSize(12)
        .fillColor("#000")
        .text(`${data.patient.age}`, 83, 296);

      doc
        .font("Calibri-Bold")
        .fontSize(12)
        .fillColor("#000")
        .text("Color:", 300, 296);

      doc
        .font("Calibri")
        .fontSize(12)
        .fillColor("#000")
        .text(`${data.patient.color}`, 335, 296);

      doc
        .font("Calibri-Bold")
        .fontSize(12)
        .fillColor("#000")
        .text("Sexo:", 50, 312);

      const sexLabel = data.patient.sex === "unknown" ? "Desconocido" : data.patient.sex;
      const neuteredLabel =
        data.patient.neutered === "neutered"
          ? "SÃ­"
          : data.patient.neutered === "intact"
            ? "No"
            : "Desconocido";

      doc
        .font("Calibri")
        .fontSize(12)
        .fillColor("#000")
        .text(`${sexLabel}`, 81, 312);

      doc
        .font("Calibri-Bold")
        .fontSize(12)
        .fillColor("#000")
        .text("Castrado:", 300, 312);

      doc
        .font("Calibri")
        .fontSize(12)
        .fillColor("#000")
        .text(`${neuteredLabel}`, 352, 312);

      doc.moveTo(50, 335).lineTo(550, 335).strokeColor("#632b91").lineWidth(0.2).stroke();

      doc.x = 50;
      doc.y = 355;

      doc
        .font("Calibri-Bold")
        .fontSize(14)
        .fillColor("#99144d")
        .text("MATERIAL RECIBIDO Y DESCRIPCIÓN MACROSCÓPICA:");

      doc.y += 4;

      doc
        .font("Calibri")
        .fontSize(14)
        .fillColor("#000")
        .text(`${data.macroDescription}`, 60);

      doc.y += 16;

      doc
        .font("Calibri-Bold")
        .fontSize(14)
        .fillColor("#99144d")
        .text("DESCRIPCIÓN MICROSCÓPICA:", 50);

      doc.y += 4;

      doc
        .font("Calibri")
        .fontSize(14)
        .fillColor("#000")
        .text(`${data.microDescription}`, 60);

      doc.y += 16;

      doc
        .font("Calibri-Bold")
        .fontSize(14)
        .fillColor("#99144d")
        .text("DIAGNÓSTICO y/o COMENTARIOS:", 50);

      doc.y += 4;

      doc
        .font("Calibri")
        .fontSize(14)
        .fillColor("#000")
        .text(`${data.result}`, 60);

        doc.y += 30;


      // doc.fontSize(14).font("Calibri-Bold").fillColor("#632b91").text("Paciente", { underline: true });
      // doc.fontSize(12).font("Calibri").fillColor("black");
      // doc.text(`Nombre: ${data.patient.name}`);
      // doc.text(`Tutor: ${data.patient.owner}`);
      // doc.text(`Especie: ${data.patient.species}`);
      // doc.text(`Raza: ${data.patient.breed}`);
      // doc.text(`Edad: ${data.patient.age}`);
      // doc.text(`Sexo: ${data.patient.sex}`);
      // doc.text(`Color: ${data.patient.color}`);
      // doc.text(`Castrado: ${data.patient.neutered ? "Sí" : "No"}`);
      // doc.moveDown();

      // if (data.result) {
      //   doc.fontSize(14).fillColor("#632b91").font("Calibri-Bold").text("Diagnóstico", { underline: true });
      //   doc.fontSize(12).fillColor("black").font("Calibri").text(data.result, { align: "justify" });
      //   doc.moveDown();
      // }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
