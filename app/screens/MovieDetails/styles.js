import { StyleSheet } from 'react-native';

import { fontSizeResponsive } from '../../utils/dimensions';

import { white, pink, darkBlue } from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  buttonShare: {
    paddingRight: 15,
    paddingLeft: 20,
    color: white
  },
  containerMovieInfo: {
    margin: 20,
    marginTop: 35,
    textAlign: 'center'
  },
  subTitleInfo: {
    fontSize: fontSizeResponsive(2.1),
    color: darkBlue,
    textAlign: 'justify'
  },
  readMore: {
    color: pink,
    marginTop: 7,
    textAlign: 'center'
  }
});

export default styles;
