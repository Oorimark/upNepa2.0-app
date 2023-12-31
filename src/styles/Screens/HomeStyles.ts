import {StyleSheet} from 'react-native';
import {pColor10, pColor30, sColor60} from '../Colors';
import {BaseStyle} from '../Global';

export const HomeScreenStyles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 11,
    rowGap: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 21,
  },
  headerImageStyle: {
    transform: [{scale: 0.5}],
  },
  headerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 23,
    color: sColor60,
  },
  LightDisplaySectionContainer: {
    backgroundColor: pColor30,
    height: 130,
    width: '100%',
    padding: 20,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LightDisplaySectionLightStatusContainer: {
    justifyContent: 'space-around',
  },
  LightDisplaySectionLightExistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  LightDisplaySectionLightExistTextStyle: {
    fontFamily: 'Montserrat-Medium',
    color: pColor10,
    fontSize: 16,
  },
  LightDisplaySectionLightConditionContainer: {
    flexDirection: 'row',
  },
  LightDisplaySectionLightConditionStatusStyle: {
    backgroundColor: pColor10,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 16,
  },
  LightDisplaySectionLightConditionStatusTextStyle: {
    ...BaseStyle.defaultFont,
    fontSize: 10,
  },
  LightDisplaySectionLightConditionStyle: {
    backgroundColor: '#BBF3BB',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 25,
  },
  LightDisplaySectionLightConditionTextStyle: {
    ...BaseStyle.defaultFont,
    fontFamily: 'Montserrat-Bold',
    fontSize: 10,
    color: '#00FF00',
  },
  LightDisplaySectionLightDurationContainer: {},
  LightDisplaySectionLightDurationLabelStyle: {
    ...BaseStyle.defaultFont,
    fontSize: 8,
    color: pColor10,
  },
  LightDisplaySectionLightDurationTimerStyle: {
    ...BaseStyle.defaultFont,
    fontFamily: 'Montserrat-ExtraBold',
    fontSize: 24,
    color: pColor10,
  },
});
