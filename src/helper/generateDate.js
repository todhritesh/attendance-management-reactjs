function generateDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2,'0')
    const month = String(date.getMonth()+1).padStart(2,'0');
    const year = date.getFullYear();
    const curr_date = `${year}-${month}-${day}`
    // return curr_date
    return '2022-03-27'
}

export {
    generateDate
}