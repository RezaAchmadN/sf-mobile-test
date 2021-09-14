export const getCurrentDate = (
    datePlus: number,
    monthPlus: number,
    yearPlus: number
  ) => {
    const date = new Date().getDate() + datePlus;
    const month = new Date().getMonth() + 1 + monthPlus;
    const year = new Date().getFullYear() + yearPlus;
    const dd = (date < 10 ? "0" : "") + date;
    const mm = (month < 10 ? "0" : "") + month;
    return year + "-" + mm + "-" + dd;
  };