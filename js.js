const testPlays = {
    "Гамлет": {
        "type": "tragedy",
        "name": "Гамлет"
    },
    "Отелло": {
        "type": "comedy",
        "name": "Отелло"
    },
    "Ромео и Джульетта": {
        "type": "tragedy",
        "name": "Ромео и Джульетта"
    }
};
 
const testInvoices = 
[
    {
	"customer": "MDT",
	"performance": [{
			"playId": "Гамлет",
			"audience": 90,
			"type": "tragedy",
		},
		{
			"playId": "Ромео и Джульетта",
			"audience": 45,
			"type": "tragedy"
		},
		{
			"playId": "Отелло",
			"audience": 77,
			"type": "comedy"
		}
	]
}]

const format = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2,
  }).format;

function countSum(type, audience) {
    let thisAmount = 0;
    let thisVolumeCredits = 0;
    switch (type) {
        case "tragedy":
          thisAmount = 40000;
          if (audience > 30) {
            thisAmount += 1000 * (audience - 30);
          }
          break;
        case "comedy":
          thisAmount = 30000;
          if (audience > 20) {
            thisAmount += 10000 + 500 * (audience - 20);
          }
          thisAmount += 300 * audience;
          break;
        default:
          throw new Error(`неизвестный тип: ${type}`);
        }
        thisVolumeCredits += Math.max(audience - 30, 0);
        if ("comedy" === type) {
            thisVolumeCredits += Math.floor(audience / 5);
        }
        return [thisAmount, thisVolumeCredits];  
    }


function statement(invoice, plays) {
  let totalAmount = 0;
  let totalCredits = 0;
  let result = `Счет для ${invoice.customer}\n`;
  for (const perf of invoice.performance) {
    const play = plays[perf.playId];
    let [thisAmount, thisVolumeCredits] =  countSum (play.type, perf.audience);
    result += `${play.name}: ${format(thisAmount / 100)}`;
    result += `(${perf.audience} мест)\n`;
    totalAmount += thisAmount;
    totalCredits += thisVolumeCredits;
  }
  result += `Итого с вас ${format(totalAmount/100)}\n`;
  result += `Вы заработали ${totalCredits} бонусов\n`;
  return result;
}
