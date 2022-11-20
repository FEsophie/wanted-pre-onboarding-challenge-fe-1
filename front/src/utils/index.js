import dayjs from "dayjs";

class Util {
  constructor() {}

  uuidV4(short) {
    const cryptoObj = window.crypto;
    const id = ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (cryptoObj.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );

    return short ? id.substring(0, 8) : id;
  }

  isValidEmail(email) {
    const emailRegex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    return emailRegex.test(email);
  }

  dateFormat(date) {
    const newDate = dayjs(date);
    return newDate.format("YYYY-MM-DD HH:MM");
  }
}

export default new Util();
