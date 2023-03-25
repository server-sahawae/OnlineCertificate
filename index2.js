// const QRCondeWithLogos = require("qrcode-with-logos");
const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
console.log("sss");

async function create() {
  const canvas = createCanvas(380, 380);
  //   const QRCode = new QRCondeWithLogos({
  //     canvas: canvas,
  //     content: "https://github.com/zxpsuper",
  //     // width: 380,
  //     //   download: true,
  //     // image: document.getElementById("image"),
  //     logo: {
  //       src: "https://avatars1.githubusercontent.com/u/28730619?s=460&v=4",
  //     },
  //   });
  //   console.log(QRCode);
  //   QRCode.toCanvas(canvas, dataForQRcode, {
  //     errorCorrectionLevel: "H",
  //     margin: 1,
  //     color: {
  //       dark: "#000000",
  //       light: "#ffffff",
  //     },
  //     width: 500,
  //   });
  //   console.log(Object.keys(QRCode.toCanvas));
  //   const ctx = canvas.getContext("2d");
  //   const img = await loadImage(center_image);
  //   const center = (width - cwidth) / 2;
  //   ctx.drawImage(img, center, center, cwidth, cwidth);
  //   return canvas.toDataURL("image/png");
}

async function main() {
  const logo = fs.readFileSync("./logo.png", "base64");

  const qrCode = await create(
    "https://docs.google.com/forms/d/e/1FAIpQLSc7_eOB-5BexRHlxM38FFaSIVjHFJXR5iEKCCM4jd7fLWFe4g/viewform",
    `data:image\/png;base64,${logo}`,
    500,
    150
  );
  fs.writeFileSync(
    "./test.png",
    qrCode.replace(/^data:image\/png;base64,/, ""),
    "base64"
  );
}

// main();
create();
