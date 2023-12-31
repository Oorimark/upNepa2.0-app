import {StyleSheet} from 'react-native';
import {pColor10, pColor30} from '../Colors';
import {BaseStyle} from '../Global';

export const StartScreenStyles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 30,
    rowGap: 30,
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
    rowGap: 10,
  },
  textInputStyle: {
    borderBottomWidth: 0.2,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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