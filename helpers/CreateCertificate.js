const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const createQr = require("./QRCreate");
const { CertificateTemplate } = require("../models");
const sharp = require("sharp");
const { CERTIFICATE_UNAVAILABLE } = require("../constants/ErrorKeys");

async function createCertificate({
  id,
  name,
  status,
  namePosition = 850,
  statusPosition = 1075,
  QRx = 700,
  QRy = 1325,
  baseUrl,
  CertificateTemplateId,
}) {
  try {
    const dataCertificateTemplate = await CertificateTemplate.findOne({
      where: { id: CertificateTemplateId },
    });
    if (!dataCertificateTemplate) throw { name: CERTIFICATE_UNAVAILABLE };
    QRx = dataCertificateTemplate?.QRx ? dataCertificateTemplate?.QRx : QRx;
    QRy = dataCertificateTemplate?.QRy ? dataCertificateTemplate?.QRy : QRy;
    namePosition = dataCertificateTemplate?.namePosition
      ? dataCertificateTemplate?.namePosition
      : namePosition;
    statusPosition = dataCertificateTemplate?.statusPosition
      ? dataCertificateTemplate?.statusPosition
      : statusPosition;
    console.log(Object.keys(dataCertificateTemplate?.dataValues));
    // console.log(dataCertificateTemplate);
    const imageCertificateTemplate = await sharp(
      Buffer.from(dataCertificateTemplate?.file)
    )
      .toFormat("png")
      .toBuffer();
    const templateImage = await loadImage(imageCertificateTemplate);
    const canvas = createCanvas(2970, 2100);
    const certificate = canvas.getContext("2d");
    certificate.drawImage(templateImage, 0, 0, 2970, 2100);

    const QRCode = await loadImage(
      await createQr(baseUrl, id, dataCertificateTemplate?.LogoId)
    );
    certificate.globalAlpha = 0.2;
    certificate.globalAlpha = 1;
    certificate.drawImage(QRCode, QRx, QRy, 400, 400);
    // console.log(QRCode);
    certificate.font = "100px arial";
    certificate.textAlign = "center";
    certificate.fillText(name.toUpperCase(), 2970 / 2, namePosition, 2970);

    certificate.font = "bold 100px Times New Roman";
    certificate.textAlign = "center";
    certificate.fillText(status.toUpperCase(), 2970 / 2, statusPosition, 2970);

    fs.writeFileSync(
      "./test2.png",
      canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, ""),
      "base64"
    );
    console.log(await loadImage(canvas.toBuffer()));
    return {
      mimetype: "image/webp",
      data: await sharp(canvas.toBuffer("image/png"))
        .toFormat("webp")
        .toBuffer(),
    };
  } catch (error) {
    throw error;
  }
}

module.exports = createCertificate;
