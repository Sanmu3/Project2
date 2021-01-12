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
  mainHeader: {
    backgroundColor: '#FFCC57',
    width: '90%',
    height: '10%',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 30,
  },
  mainHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  main: {
    backgroundColor: '#3b3b3b',
    width: '90%',
    height: '22%',
    alignSelf: 'center',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
  },
  mainitem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  itemMainitem: {
    alignItems: 'center',
    // backgroundColor: '#3f3f',
    width: 100,
    padding: 10,
  },
  mainPic: {
    width: 50,
    height: 50,
    tintColor: '#fff',
  },
  mainText: {
    marginTop: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
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
