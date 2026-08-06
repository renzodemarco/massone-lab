import PDFDocument from "pdfkit";

const LABELS = {
  species: {
    canine: "Canino",
    feline: "Felino",
    equine: "Equino",
    bovine: "Bovino",
    porcine: "Porcino",
    other: "Otro"
  },
  sex: {
    macho: "Macho",
    hembra: "Hembra",
    unknown: "Desconocido"
  },
  neutered: {
    neutered: "Sí",
    entire: "No",
    unknown: "Desconocido"
  }
};

function normalizeValue(value, fallback = "-") {
  if (value === null || value === undefined) return fallback;
  const normalized = String(value).trim();
  return normalized || fallback;
}

function translateValue(group, value, fallback = "-") {
  return LABELS[group]?.[value] || normalizeValue(value, fallback);
}

export const generateCitoPDF = async (data) => {
  const buffers = [];
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 50, left: 50, right: 50, bottom: 30 }
  });

  doc.on("data", buffers.push.bind(buffers));

  const pdfEnd = new Promise((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(buffers)));
    doc.on("error", reject);
  });

  doc.registerFont("Calibri", "public/fonts/Calibri.ttf");
  doc.registerFont("Calibri-Bold", "public/fonts/Calibri-Bold.ttf");
  doc.registerFont("Calibri-Italic", "public/fonts/Calibri-Italic.ttf");

  const formattedDate = new Date(data.entryDate).toLocaleDateString("es-AR");
  const sexLabel = translateValue("sex", data.patient?.sex);
  const neuteredLabel = translateValue("neutered", data.patient?.neutered);
  const speciesLabel = translateValue("species", data.patient?.species);

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
    .text(`Protocolo número: ${normalizeValue(data.protocolNumber)}`, 50, 100);

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
    .text('"Ninguna cadena es más fuerte que el más débil de sus eslabones."', 0, 140, {
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
    .text(normalizeValue(data.veterinarian), 152, 170);

  doc.moveTo(50, 195).lineTo(550, 195).strokeColor("#632b91").lineWidth(0.2).stroke();

  doc
    .font("Calibri-Bold")
    .fontSize(14)
    .fillColor("#99144d")
    .text("PROPIETARIO/A o TUTOR/A:", 50, 215);

  doc
    .font("Calibri")
    .fillColor("#000")
    .text(normalizeValue(data.patient?.owner), 218, 215);

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
    .text(normalizeValue(data.patient?.name), 356, 260);

  doc
    .font("Calibri-Bold")
    .fontSize(12)
    .fillColor("#000")
    .text("Especie:", 50, 280);

  doc
    .font("Calibri")
    .fontSize(12)
    .fillColor("#000")
    .text(speciesLabel, 96, 280);

  doc
    .font("Calibri-Bold")
    .fontSize(12)
    .fillColor("#000")
    .text("Raza:", 300, 280);

  doc
    .font("Calibri")
    .fontSize(12)
    .fillColor("#000")
    .text(normalizeValue(data.patient?.breed), 331, 280);

  doc
    .font("Calibri-Bold")
    .fontSize(12)
    .fillColor("#000")
    .text("Edad:", 50, 296);

  doc
    .font("Calibri")
    .fontSize(12)
    .fillColor("#000")
    .text(normalizeValue(data.patient?.age), 83, 296);

  doc
    .font("Calibri-Bold")
    .fontSize(12)
    .fillColor("#000")
    .text("Color:", 300, 296);

  doc
    .font("Calibri")
    .fontSize(12)
    .fillColor("#000")
    .text(normalizeValue(data.patient?.color), 335, 296);

  doc
    .font("Calibri-Bold")
    .fontSize(12)
    .fillColor("#000")
    .text("Sexo:", 50, 312);

  doc
    .font("Calibri")
    .fontSize(12)
    .fillColor("#000")
    .text(sexLabel, 81, 312);

  doc
    .font("Calibri-Bold")
    .fontSize(12)
    .fillColor("#000")
    .text("Castrado:", 300, 312);

  doc
    .font("Calibri")
    .fontSize(12)
    .fillColor("#000")
    .text(neuteredLabel, 352, 312);

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
    .text(normalizeValue(data.macroDescription), 60);

  if (data.images?.length) {
    doc.y += 16;
    doc.font("Calibri-Bold").fontSize(14).fillColor("#99144d").text("IMÁGENES:", 50);
    doc.y += 8;

    const imageWidth = 230;
    const imageHeight = 200;
    const gap = 20;
    const startX = 50;
    const cols = 2;

    const imageBuffers = await Promise.all(
      data.images.map(async (image) => {
        const response = await fetch(image.secureUrl);
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
      })
    );

    const bottomMargin = 20;
    const pageBottom = doc.page.height - bottomMargin;
    const rows = Math.ceil(imageBuffers.length / cols);

    for (let row = 0; row < rows; row++) {
      
      if (doc.y + imageHeight > pageBottom) doc.addPage();

      const startY = doc.y;

      for (let col = 0; col < cols; col++) {
        const i = row * cols + col;
        if (i >= imageBuffers.length) break;

        const x = startX + col * (imageWidth + gap);
        doc.image(imageBuffers[i], x, startY, { fit: [imageWidth, imageHeight] });
      }

      doc.y = startY + imageHeight + 5;
    }

    doc.y += 10;
  }

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
    .text(normalizeValue(data.microDescription), 60);

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
    .text(normalizeValue(data.result), 60);

  doc.y += 30;

  doc.end();
  return pdfEnd;
}