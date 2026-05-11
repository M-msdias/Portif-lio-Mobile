import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configuração do Parse
Parse.setAsyncStorage(AsyncStorage);
Parse.initialize('sWDSR13wBuvlQqrYWCLvakHcE9E7S3g7rOFSYKSG', 'rj8RmRAVg2KhIaIWuYDzF8xwtGVT3zpBdkrFm2Jz');
Parse.serverURL = 'https://parseapi.back4app.com/';

export default Parse;