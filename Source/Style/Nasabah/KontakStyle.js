import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#3b3b3b',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backHeaderPic: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  headerPic: {
    width: 25,
    height: 25,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    margin: 10,
  },
  headerName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    margin: 10,
  },

  kontak: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
});
