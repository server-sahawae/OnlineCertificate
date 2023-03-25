const createCertificate = require("./helpers/CreateCertificate");
const createQr = require("./helpers/QRCreate");

createCertificate({
  id: "1b7a056b-f174-4c0a-b81d-25308183944d",
  name: "Muhammad Sayid Sabiq",
  status: "peserta",
  namePosition: 850,
  baseUrl: "http://sertifikat.sayidsabiq.ac.id/",
})
  .then((el) => console.log("done"))
  .catch((err) => console.log(err));
// createQr("asdasdasdf");
