export const uniqueDates = (tasks) => {
    const unique = [];

    tasks.forEach( task =>{
        
        if(!unique.includes(task.dateFormat))unique.push(task.dateFormat);
        
    });
    return unique;
};
//para ordenar la fechas de menor a mayor
export const orderDates = (dates)=> {
    return dates.sort((a, b) => {
        const firstDay = moment(a, "DD/MM/YYYY");
        const secondDay = moment(b, "DD/MM/YYYY");
        return firstDay - secondDay;

    })
}