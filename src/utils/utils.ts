import AsyncStorage from '@react-native-async-storage/async-storage';

export class Logger {
  static createLog(startingTime: Date) {
    const time = formatTimeIn12HourFormat(startingTime);
    return {time, timeDiff: 0};
  }

  static async log(startingTime: Date) {
    const createdLog = Logger.createLog(startingTime);
    const getPrevItem = JSON.parse(
      (await AsyncStorage.getItem('Logs')) as string,
    );

    console.log('LOGGING...');
    console.log('Prev Item: ', getPrevItem);

    if (!getPrevItem) {
      await AsyncStorage.setItem('Logs', JSON.stringify([createdLog]));
      return;
    }
    const newItem = [...getPrevItem, createdLog];
    await AsyncStorage.setItem('Logs', JSON.stringify(newItem));
  }

  static LastTimeSorter(prevTime: Date) {
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - prevTime.getTime();
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    return {hours, minutes, seconds};
  }

  static async fetchLogs() {
    return await AsyncStorage.getItem('Logs')
      .then(res => JSON.parse(res as string))
      .catch(err => err);
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
