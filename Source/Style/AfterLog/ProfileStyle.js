import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  headGroup: {
    flexDirection: 'row',
    height: '10%',
    width: '100%',
  },
  header: {
    backgroundColor: '#3b3b3b',
    width: '75%',
    justifyContent: 'center',
    borderBottomEndRadius: 50,
  },
  headerText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  headPic: {
    width: 30,
    height: 30,
  },
  headPicBack: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
  },
  profile: {
    alignSelf: 'center',
    width: '90%',
    height: '60%',
    marginTop: 50,
    alignItems: 'center',
  },
  foto: {
    width: 150,
    height: 150,
    borderRadius: 100,
    position: 'absolute',
    borderColor: '#f0f0f0',
    borderWidth: 10,
  },
  biodata: {
    marginTop: 65,
    backgroundColor: '#fff',
    width: '100%',
    height: '90%',
    borderRadius: 50,
    alignItems: 'center',
  },
  bio: {
    marginTop: 100,
    width: '100%',
    height: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    height: 50,
    maxWidth: '80%',
    maxHeight: 50,
    textAlign: 'center',
  },
  nomor: {
    height: 50,
    maxWidth: '80%',
    maxHeight: 50,
    textAlign: 'center',
  },
  address: {
    height: 50,
    maxWidth: '80%',
    maxHeight: 50,
    textAlign: 'center',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#3b3b3b',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
