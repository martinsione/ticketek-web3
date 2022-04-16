export default function dateFilter(events: [], option: any) {
  return events.filter((ev: any) => {
    const { date } = ev.metadata;
    let filter: boolean; // switch asigna filter, que se retorna a la salida
    switch (option) {
      case "all": {
        filter = true;
        break;
      }
      case "days": {
        const coupleOfDays = new Date(
          new Date().setDate(new Date().getDate() + 3)
        );
        filter = date > new Date() && date < coupleOfDays;
        break;
      }
      case "week": {
        const week = new Date(new Date().setDate(new Date().getDate() + 8));
        filter = date > new Date() && date < week;
        break;
      }
      case "weekend": {
        const fridayDay = new Date().getDate() + (4 - new Date().getDay() + 1);
        const fridayDate = new Date(new Date().setDate(fridayDay));

        const saturdayDay =
          new Date().getDate() + (5 - new Date().getDay() + 1);
        const saturdayDate = new Date(new Date().setDate(saturdayDay));

        const sundayDay = new Date().getDate() + (6 - new Date().getDay() + 1);
        const sundayDate = new Date(new Date().setDate(sundayDay));

        filter =
          date > new Date() &&
          (date.toDateString() === fridayDate.toDateString() ||
            date.toDateString() === saturdayDate.toDateString() ||
            date.toDateString() === sundayDate.toDateString());
        break;
      }
      case "month": {
        const oneMonth = new Date(
          new Date().setMonth(new Date().getMonth() + 1)
        );
        filter = date > new Date() && date < oneMonth;
        break;
      }
      default: {
        const chosenDate = new Date(`${option}Z`); // Raro, toma el dia anterior !!!
        chosenDate.setDate(chosenDate.getDate() + 1); //  Acá la corrijo
        filter = date.toDateString() === chosenDate.toDateString();
      }
    }
    return filter;
  });
}
