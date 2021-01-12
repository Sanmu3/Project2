import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#3b3b3b',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    paddingTop: 20,
    fontSize: 14,
    fontWeight: '700',
  },
  box: {
    backgroundColor: '#fff',
    width: '80%',
    // height: 350,
    borderRadius: 20,
    margin: 20,
    padding: 25,
  },

  input: {
    backgroundColor: '#F2F2F2',
    elevation: 5,
    marginTop: 10,
  },

  button: {
    backgroundColor: '#3B3B3B',
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textButton: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  text2: {
    color: '#fff',
    fontWeight: 'bold',
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
