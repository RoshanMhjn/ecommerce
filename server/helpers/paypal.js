const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AeFTM4lx0dKtmChcQGlv796Dpov71mh1cEznbabbV9z7bGxQ_mPFPJcbr28I5ymPCd1aCY2pdIV_shDe",
  client_secret:
    "EPxRT3wy6l-EG_Vbzq7U9PYVliIhVYElVhSlvYAcQTzMMczNL8-o2W4vfmzjOUtRR9KbbyC7Q091b1Mw",
});

module.exports = paypal;
