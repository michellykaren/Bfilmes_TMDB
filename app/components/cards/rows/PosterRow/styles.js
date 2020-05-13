import { StyleSheet } from 'react-native';

import { fontSizeResponsive, width } from '../../../../utils/dimensions';

import { white, pink, darkBlue } from '../../../../utils/colors';


const styles = StyleSheet.create({
  containerMainPhoto: {
    width,
    height: width * 0.90
  },
  mainPhoto: {
    width: '100%',
    height: '100%'
  },
  play: {
    position: 'absolute',
    zIndex: 1,
    top: width * 0.32,
    left: width * 0.40,
    backgroundColor: darkBlue,
    width: width * 0.16,
    height: width * 0.16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerMainPhotoInfo: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  containerBackgroundPhotoInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20
  },
  photoInfo: {
    fontSize: fontSizeResponsive(3.8),
    color: white,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  photoStar: {
    flexDirection: 'row',
    marginTop: 8
  },
  buttonPlay: {
    marginLeft: 5
  }
});

export default styles;
