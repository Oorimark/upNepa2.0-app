import AsyncStorage from '@react-native-async-storage/async-storage';

export class Logger {
  static createLog(startingTime: Date) {
    const time = startingTime.getTime();
    return {time, timeDiff: 0};
  }

  static async log(startingTime: Date) {
    const time = startingTime.getTime();
    const getPrevItem = JSON.parse(
      (await AsyncStorage.getItem('Logs')) as string,
    );
    if (!getPrevItem) {
      await AsyncStorage.setItem('Logs', JSON.stringify([{time, timeDiff: 2}]));
    } else {
      const newItem = [...getPrevItem, {time, timeDiff: 2}];
      await AsyncStorage.setItem('Logs', JSON.stringify(newItem));
    }
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
    return JSON.parse((await AsyncStorage.getItem('Logs')) as string);
  }
}
