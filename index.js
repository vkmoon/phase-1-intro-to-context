function createEmployeeRecord(array) {
    let employeeRecord = {};
    employeeRecord["firstName"] = array[0];
    employeeRecord["familyName"] = array[1];
    employeeRecord["title"] = array[2];
    employeeRecord["payPerHour"] = array[3];
    employeeRecord["timeInEvents"] = [];
    employeeRecord["timeOutEvents"] = [];
    return employeeRecord;
}

function createEmployeeRecords(arrays) {
    return arrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(employeeRecord, timeIn) {
    let dateTime = timeIn.split(" ");
    employeeRecord["timeInEvents"].push({
    "type": "TimeIn",
    "hour": parseInt(dateTime[1]),
    "date": dateTime[0]
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeOut) {
    let dateTime = timeOut.split(" ");
    employeeRecord["timeOutEvents"].push({
        "type": "TimeOut",
        "hour": parseInt(dateTime[1]),
        "date": dateTime[0]
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
   let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
   let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

   if (timeInEvent && timeOutEvent) {
    let timeInMinutes = parseInt(timeInEvent.hour);
    let timeOutMinutes = parseInt(timeOutEvent.hour);
    let hoursWorked = (timeOutMinutes - timeInMinutes) / 100;
    return hoursWorked;
   }
   else {
    return 0;
   }
}

function wagesEarnedOnDate(employeeRecord, date) {
    let employeeData = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
    return employeeData;
}

function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
        let date = timeInEvent.date;
        let wages = wagesEarnedOnDate(employeeRecord, date);
        return totalWages + wages;
    }, 0);
}

function calculatePayroll(employeeArray) {
    return employeeArray.reduce((totalPayroll, employeeRecord) => {
        let employeeWages = allWagesFor(employeeRecord);
        return totalPayroll + employeeWages;
    }, 0);
}