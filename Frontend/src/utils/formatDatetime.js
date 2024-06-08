export const convertToDMY = (currentDate_) => {
  const currentDate = new Date(currentDate_);
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const dateFormat = (date_) => {
  const date = new Date(date_);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = date.getMonth();
  const day = date.getDate();

  return `${day} ${monthNames[monthIndex]}`;
};

export const getDayOfWeek = (date_) => {
  const date = new Date(date_);

  return date.toLocaleDateString("en-US", { weekday: "long" });
};

export const getLast4Days = (currentDate) => {
  const last4Days = [];
  for (let i = 3; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);
    last4Days.push(`Ngày ${date.getDate()}`);
  }
  return last4Days;
};

export const getLast4Weeks = (currentDate) => {
  const last4Weeks = [];
  const oneDay = 24 * 60 * 60 * 1000;
  for (let i = 3; i >= 0; i--) {
    const date = new Date(currentDate.getTime() - i * 7 * oneDay);
    const weekNumber = Math.ceil(
      ((date - new Date(date.getFullYear(), 0, 1)) / oneDay + 1) / 7
    );
    last4Weeks.push(`Tuần ${weekNumber}`);
  }
  return last4Weeks;
};

export const getLast4Months = (currentDate) => {
  const last4Months = [];
  for (let i = 3; i >= 0; i--) {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - i);
    last4Months.push(`Tháng ${date.getMonth() + 1}`);
  }
  return last4Months;
};

export const getLast4Years = (currentDate) => {
  const last4Years = [];
  const currentYear = currentDate.getFullYear();
  for (let i = 3; i >= 0; i--) {
    last4Years.push(`Năm ${currentYear - i}`);
  }
  return last4Years;
};
