import {StyleSheet} from 'react-native';
import {pColor10, pColor60, sColor60} from '../Colors';

export const LogsScreenStyle = StyleSheet.create({
  listContainer: {
    backgroundColor: pColor60,
    height: '100%',
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 9,
    rowGap: 30,
    height: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerTitleStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 27,
    color: sColor60,
  },
  displayBoxContainer: {
    backgroundColor: pColor10,
    width: '100%',
    height: '90%',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
  displayBoxContainerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    height: '100%',
    rowGap: 12,
  },
  boxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#B4B4B4',
    height: 50,
    width: '100%',
    borderRadius: 50,
    paddingHorizontal: 15,
  },
  noLogsAvailableStyle: {
    height: '100%',
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
    textAlign: 'center',
  },
});
