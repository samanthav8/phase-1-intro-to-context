// Your code here
function createEmployeeRecord(employeeArray){
    //Destructure the employeeArray to extract the first name, family name, title, and pay rate per hour
    const [firstName, familyName, title, payPerHour] = employeeArray; 
    //Create the empty timeInEvents and timeOutEvents arrays
    const timeInEvents = [];
    const timeOutEvents = [];
    // Create the employee object with the specified properties
    const employeeRecord = {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents,
        timeOutEvents,
    };
    //Return the Employee Object
    return employeeRecord;
}

function createEmployeeRecords(employeeArrays) {
    // Create an empty array to store the employee records
    const employeeRecords = [];
    // Iterate over each nested array
    for (let i = 0; i < employeeArrays.length; i++){
        // Call createEmployeeRecord function on each nested array and push the result to employeeRecords array
        const employeeRecord = createEmployeeRecord(employeeArrays[i]);
        employeeRecords.push(employeeRecord);
    }
    // Return the array of employee records
    return employeeRecords;
}

function createTimeInEvent(employeeRecord, dateStamp) {
    // Extract the hour and minutes from the dateStamp
    const hour = parseInt(dateStamp.slice(11, 13), 10);
    const minutes = parseInt(dateStamp.slice(14), 10);
  
    // Convert the hour and minutes to a four-digit time value
    const timeValue = hour * 100 + minutes;
  
    // Create a new timeInEvent object
    const timeInEvent = {
      type: "TimeIn",
      hour: timeValue,
      date: dateStamp.slice(0, 10),
    };
  
    // Push the timeInEvent to the timeInEvents array of the employee record
    employeeRecord.timeInEvents.push(timeInEvent);
  
    // Return the updated employee record object
    return employeeRecord;
  }

  function createTimeOutEvent(employeeRecord, dateStamp) {
    // Extract the hour and minutes from the dateStamp
    const hour = parseInt(dateStamp.slice(11, 13), 10);
    const minutes = parseInt(dateStamp.slice(14), 10);
  
    // Calculate the time value in HHMM format
    const timeValue = hour * 100 + minutes;
  
    // Create a new timeOutEvent object
    const timeOutEvent = {
      type: "TimeOut",
      hour: timeValue,
      date: dateStamp.slice(0, 10),
    };
  
    // Push the timeOutEvent to the timeOutEvents array of the employee record
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    // Return the updated employee record object
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const timeInHour = Math.floor(timeInEvent.hour / 100);
      const timeInMinutes = timeInEvent.hour % 100;
      const timeOutHour = Math.floor(timeOutEvent.hour / 100);
      const timeOutMinutes = timeOutEvent.hour % 100;
  
      const hoursWorked = timeOutHour - timeInHour;
      const minutesWorked = timeOutMinutes - timeInMinutes;
      const totalHoursWorked = hoursWorked + minutesWorked / 60;
  
      return totalHoursWorked;
    }
  
    return 0;
  }

  function wagesEarnedOnDate(employeeRecord, date) {
    // Use the hoursWorkedOnDate function to calculate the hours worked
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  
    // Multiply the hours worked by the employee's pay rate to determine the amount owed
    const amountOwed = hoursWorked * employeeRecord.payPerHour;
  
    // Return the amount owed as a number
    return amountOwed;
  }

  function allWagesFor(employeeRecord) {
    let totalWages = 0;
  
    employeeRecord.timeInEvents.forEach(timeInEvent => {
      const date = timeInEvent.date;
      const wages = wagesEarnedOnDate(employeeRecord, date);
      totalWages += wages;
    });
  
    return totalWages;
  }

  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
  
    employeeRecords.forEach(employeeRecord => {
      employeeRecord.timeInEvents.forEach(timeInEvent => {
        const date = timeInEvent.date;
        const wages = wagesEarnedOnDate(employeeRecord, date);
        totalPayroll += wages;
      });
    });
  
    return totalPayroll;
  }
  