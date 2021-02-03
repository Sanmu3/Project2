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

  body: {
    width: '100%',
    height: '80%',
  },
  postChat: {
    backgroundColor: '#75BBA4',
    maxWidth: '75%',
    alignSelf: 'flex-end',
    padding: 15,
    borderRadius: 20,
    margin: 10,
    flexDirection: 'row',
  },
  getChat: {
    backgroundColor: '#D3D3D3',
    maxWidth: '75%',
    alignSelf: 'flex-start',
    padding: 15,
    borderRadius: 20,
    margin: 10,
    flexDirection: 'row',
  },
  message: {
    maxWidth: '80%',
  },

  foot: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  footPic: {
    width: 25,
    height: 25,
    margin: 10,
  },
  inputMessage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  rawMessage: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 50,
    width: '90%',
  },
  shortClik: {
    width: 100,
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    margin: 20,
  },
  shortText: {
    fontWeight: 'bold',
  },
});
