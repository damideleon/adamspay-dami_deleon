const md5 = require("md5");

var body = {
 "notify": {
 "id": 2549,
 "type": "debtStatus",
 "version": 1,
 "time": "2021-11-28T19:01:46+00:00",
 "merchant": "damian-de-232",
 "app": "immense-peak-48972",
 "env": "test"
 },
 "debt": {
 "docId": "12",
 "label": "Pedido: 12",
"slug": "12",
"payUrl": "https://staging.adamspay.com/pay/damian-de-232/debt/12",
 "amount": { currency: "PYG", value: "80569.000000", paid: "80569.000000" },
 "exchangeMode": null,
 "target": { type: null, number: null, label: null },
 "description": null,
"validPeriod": {
"start": "2021-11-28T19:01:03+00:00",
"end": "2021-11-30T19:01:03+00:00"
},
"payStatus": {
"status": "paid",
 "code": null,
 "time": "2021-11-28T19:01:46+00:00",
 "text": null
 },
 "statusHash": "2866269e4586c68d0456f8c162ffb5a8",
 "attr": null,
 "uiTheme": null,
 "objId": "20549",
 "objStatus": {
 "status": "success",
 "code": null,
"time": "2021-11-28T19:01:46+00:00",
"text": null
},
"created": "2021-11-28T19:01:03+00:00",
"updated": "2021-11-28T19:01:46+00:00",
"refs": null,
 "meta": {
 "merchantObjId": "1099",
 "appObjId": "72",
 "firstTxObjId": "13156",
 "lastTxObjId": "13156"
 }
}
}
const apiSecret = "0e5810e847bb12580b";
const apiKey = "adams-14331675fbc0b2"
var esperado = "293e846140212b5068aca809eb17d0bc"
var recibido = "128153ef02c28efb37ec5e3c536a8867"

//api secret
console.log("API SECRET \n"+ md5("adams" + body + apiSecret))
//body Stringify
console.log("body Stringify: \n" + md5("adams" + JSON.stringify(body) + apiSecret))

console.log("apiKey \n"+ md5("adams" + body + apiKey))
//body Stringify
console.log("body Stringify apiKey: \n" + md5("adams" + JSON.stringify(body) + apiKey))