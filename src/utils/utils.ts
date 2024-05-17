import AsyncStorage from '@react-native-async-storage/async-storage';

export class Logger {
  static createLog(startingTime: Date) {
    return startingTime;
  }

  static async log(startingTime: Date) {
    const prevItem = JSON.parse((await AsyncStorage.getItem('Logs')) as string);

    if (!prevItem) {
      await AsyncStorage.setItem('Logs', JSON.stringify([startingTime]));
      return;
    }
    const newItem = [...prevItem, startingTime];
    await AsyncStorage.setItem('Logs', JSON.stringify(newItem));
  }

  static LastTimeSorter(prevTime: Date) {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - prevTime.getTime();
    const day = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    return {day, hours, minutes, seconds};
  }

  static timeDiffSorter(prevTime: Date) {
    prevTime = new Date(prevTime);
    let diff = '';
    const {day, hours, minutes, seconds} = Logger.LastTimeSorter(prevTime);
    if (day) diff = day + ' day';
    else if (hours) diff = hours + ' hrs';
    else if (minutes) diff = minutes + ' min';
    else if (seconds) diff = seconds + ' sec';
    else diff = 0 + 'sec';
    return {time: formatTimeIn12HourFormat(prevTime), timeDiff: diff};
  }

  static async fetchLogs() {
    return await AsyncStorage.getItem('Logs')
      .then(res => JSON.parse(res as string))
      .catch(err => err);
  }

  static async clearLogs() {
    await AsyncStorage.clear();
  }
}

const formatTimeIn12HourFormat = (date: Date) => {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12; // Convert 0 to 12 for midnight
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes}${amPm}`;
};
