import { StyleSheet } from 'react-native';

import { blue, darkBlue, black } from '../../../../utils/colors';

const styles = StyleSheet.create({
  containerCast: {
    marginRight: 10,
    alignItems: 'center',
    width: 70
  },
  titleCast: {
    marginTop: 10,
    color: darkBlue,
    textAlign: 'center'
  },
  titleCharacter: {
    fontWeight: 'bold'
  },
  castPhoto: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginTop: 13
  },
  productionCompaniesPhoto: {
    width: '100%',
    height: 60,
    borderRadius: 4,
    marginTop: 13
  }
});

export default styles;
