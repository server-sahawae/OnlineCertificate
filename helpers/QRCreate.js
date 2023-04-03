const QRCode = require("qrcode");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const { Logo } = require("../models");
const sharp = require("sharp");

async function getPngBufferFromWebp(data) {
  try {
    return await sharp(data).toFormat("png").toBuffer();
  } catch (error) {
    throw error;
  }
}

async function createQr(baseUrl, id, LogoId) {
  // WORKING QRCODE WITHOUT LOGO
  const dataLogo = await Logo.findOne({
    where: { id: LogoId },
  });

  baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";

  const width = 500;
  const canvas = createCanvas(width, width);
  const stamp = await loadImage(await getPngBufferFromWebp(dataLogo.file));
  // console.log(stamp.);
  const backgroundCTX = canvas.getContext("2d");
  // console.log(stamp.width, stamp.height);
  const stampWidth = () => {
    if (stamp.width >= stamp.height) {
      return width;
    } else {
      return (width * stamp.width) / stamp.height;
    }
  };

  const stampHeight = () => {
    if (stamp.height >= stamp.width) {
      return width;
    } else {
      return (height * stamp.height) / stamp.width;
    }
  };
  // console.log(stampWidth(), stampHeight());
  backgroundCTX.globalAlpha = 0.5;
  backgroundCTX.drawImage(
    stamp,
    (width - stampWidth()) / 2,
    (width - stampHeight()) / 2,
    stampWidth(),
    stampHeight()
  );
  backgroundCTX.globalAlpha = 1;
  const frontCanvas = createCanvas(width, width);
  const ctx = frontCanvas.getContext("2d");
  QRCode.toCanvas(frontCanvas, baseUrl + id, {
    errorCorrectionLevel: "H",

    color: {
      dark: "#000000",
      light: "#0000",
    },
    width: width,
  });
  ctx.textAlign = "center";
  ctx.font = "25px arial";
  ctx.fillText(id, width / 2, width - 10, width);
  ctx.fillText(dataLogo.name.toUpperCase(), width / 2, 25, width - 10);
  backgroundCTX.drawImage(frontCanvas, 0, 0, width, width);
  // fs.writeFileSync(
  //   "./QR.png",
  //   canvas.toDataURL("image/png").replace(/^data:image\/png;base64,/, ""),
  //   "base64"
  // );
  return canvas.toDataURL("image/png");
  // END WORKING QRCODE WITHOUT LOGO
}

module.exports = createQr;
// main();
