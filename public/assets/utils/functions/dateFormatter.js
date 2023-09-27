const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"];
const monthArrayShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov","Dec"];

export function formatDateToDDMMYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Note: Months are zero-based, so we add 1.
    const year = String(date.getFullYear()).slice(-2); // Extract last two digits of the year.
    
    const formattedDate = {
        day: day,   
        month: month,
        year: year,
        monthName: monthArray[month-1],
        monthNameShort: monthArrayShort[month-1]
    }

    return formattedDate;
  }

  export function toFindDayOfWeek(dateString) {
    const date = new Date(dateString);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekIndex = date.getDay();
    const dayOfWeek = weekdays[dayOfWeekIndex];
    return dayOfWeek
  }