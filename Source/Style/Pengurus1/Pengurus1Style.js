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
  headPic: {
    width: 50,
    height: 50,
  },
  headPicBack: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25,
  },
  logo: {
    width: 175,
    height: 37,
    marginLeft: 10,
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
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2,
    margin: 10,
  },
  mainBottom: {
    marginTop: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomItem: {
    backgroundColor: '#3b3b3b',
    width: '40%',
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemBottomItem: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
  },
  bottomPic: {
    width: 50,
    height: 50,
  },
  bottomText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
