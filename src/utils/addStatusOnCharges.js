const isDateAfterOrToday = require("./verifyDate");

const addStatusOnCharges = (chargesArray) => {
  const charges = chargesArray.map(charge => {

    if (!charge.paid_out && isDateAfterOrToday(charge.due_date)) {
      return { ...charge, status: 'pendente' }
    }

    if (!charge.paid_out && !isDateAfterOrToday(charge.due_date)) {
      return { ...charge, status: 'vencida' }
    }

    return { ...charge, status: 'paga' }
  });
  return charges;
}

module.exports = addStatusOnCharges