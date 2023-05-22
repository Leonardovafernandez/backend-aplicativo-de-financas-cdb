function isDateAfterOrToday(dateStr) {

    const today = new Date();
    const [day, month, year] = dateStr.split('/');
    const inputDate = new Date(`${year}-${month}-${day}`);

    return inputDate >= today;
};

module.exports = isDateAfterOrToday; 