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
    justifyContent: 'space-between',
  },
  back: {
    width: 25,
    height: 25,
    tintColor: '#f0f0f0',
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#3b3b3b',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 25,
    borderRadius: 50,
  },
  header: {
    backgroundColor: '#3b3b3b',
    width: '70%',
    justifyContent: 'center',
    borderBottomStartRadius: 50,
  },
  headerText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  profile: {
    alignSelf: 'center',
    width: '90%',
    height: 450,
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
    height: '80%',
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
  inputArea: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    maxWidth: '80%',
    maxHeight: 50,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 50,
    width: 300,
    height: 50,
    margin: 5,
  },
  nomor: {
    maxWidth: '80%',
    maxHeight: 50,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 50,
    width: 300,
    height: 50,
    margin: 5,
  },
  alamat: {
    maxWidth: '80%',
    maxHeight: 50,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 50,
    width: 300,
    height: 50,
    margin: 5,
  },
  button: {
    width: 120,
    height: 50,
    backgroundColor: '#3b3b3b',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  forbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchfoto: {
    width: 150,
    height: 150,
    borderRadius: 100,
    position: 'absolute',
  },
});
