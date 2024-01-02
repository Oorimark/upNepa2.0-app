import {StyleSheet} from 'react-native';
import {pColor10, pColor30, pColor60} from '../Colors';
import {BaseStyle} from '../Global';

export const StartScreenStyles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 30,
    rowGap: 30,
    backgroundColor: pColor60,
    height: '100%',
  },
  headerContainer: {
    rowGap: 12,
  },
  headerTextContainer: {
    rowGap: 10,
  },
  headerTextMain: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 26,
  },
  inputContainer: {
    rowGap: 25,
  },
  textInputStyle: {
    borderBottomWidth: 0.2,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  buttonStyle: {
    backgroundColor: pColor30,
    height: 50,
    width: '100%',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: pColor10,
    ...BaseStyle.defaultFont,
  },
});
