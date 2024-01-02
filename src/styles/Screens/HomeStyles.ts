import {StyleSheet} from 'react-native';
import {pColor10, pColor30, pColor60, sColor60} from '../Colors';
import {BaseStyle} from '../Global';

export const HomeScreenStyles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 11,
    rowGap: 7,
    backgroundColor: pColor60,
    height: '100%',
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
    fontSize: 21,
    color: sColor60,
  },

  //   LIght Display Section Styles
  LightDisplaySectionContainer: {
    backgroundColor: pColor30,
    height: 150,
    width: '100%',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  LightDisplaySectionLightStatusContainer: {
    justifyContent: 'space-between',
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

  // Parameter Display Section && Recent Logs Section
  ParameterDisplayParentStyle: {
    backgroundColor: pColor10,
    padding: 18,
    paddingHorizontal: 12,
    borderRadius: 20,
    rowGap: 20,
  },
  ParameterDisplayLabelStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: sColor60,
    fontSize: 12,
  },
  ParameterDisplayBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    rowGap: 15,
    columnGap: 15,
    marginVertical: 15,
  },
  ParameterDisplayBoxStyle: {
    backgroundColor: '#F3F3F3',
    paddingVertical: 13,
    paddingHorizontal: 27,
    alignItems: 'center',
    borderRadius: 12,
    width: 150,
  },
  ParameterDisplayBoxLabel: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 10,
    color: sColor60,
  },
  ParameterDisplayBoxTextStyle: {
    fontFamily: 'Montserrat-Black',
    fontSize: 40,
  },
  RecentLogsSectionContainer: {
    rowGap: 15,
  },
  RecentLogsSectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  RecentLogsSectionHeaderLabelStyle: {
    fontFamily: 'Montserrat-SemiBold',
    color: sColor60,
    fontSize: 12,
  },
  RecentLogsSectionBoxContainer: {
    backgroundColor: '#B4B4B4',
    padding: 17,
    borderRadius: 20,
  },
  RecentLogsSectionBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.2,
    borderBottomColor: pColor10,
  },
  RecentLogsSectionBoxImageStyle: {
    width: 30,
    height: 30,
    transform: [{scale: 0.6}],
  },
  RecentLogsSectionBoxStyleSection: {
    flexDirection: 'row',
    columnGap: 11,
    alignItems: 'center',
  },
  RecentLogsSectionBoxDurationTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 11,
    color: pColor10,
  },
  RecentLogsSectionBoxLogTextStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
    color: pColor10,
  },
});
