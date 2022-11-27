import type {PropsWithChildren, ReactElement} from 'react';
import React from 'react';
import {demoScreenStyles as styles} from './DemoScreen.styles';
import nameof from 'ts-nameof.macro';
import type {StackScreenProps} from '@react-navigation/stack';
import {Button, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AppLanguage} from 'src/types/AppLanguage';
import {useDispatch, useSelector} from 'react-redux';
import {languageSelector} from 'src/store/selectors';
import {globalSlice} from 'src/store';
import SvgIcon from 'src/components/atoms/SvgIcon/SvgIcon';
import {
  createHome,
  CreateHomeParams,
  getEmailValidateCode,
  getRegisterEmailValidateCode,
  loginWithEmail,
  registerAccountWithEmail,
  touristRegisterAndLogin,
} from '@ngotientan/react-native-tuya';

export function DemoScreen(
  props: PropsWithChildren<DemoScreenProps>,
): ReactElement {
  const {navigation} = props;

  const handleGoBack = React.useCallback(() => {
    //
    navigation.goBack();
  }, [navigation]);

  const [translate] = useTranslation();

  const selectedLanguage = useSelector(languageSelector);

  const dispatch = useDispatch();

  const {changeLanguage} = globalSlice.actions;

  const handleChangeLanguage = React.useCallback(
    (language: AppLanguage) => () => {
      dispatch(changeLanguage(language));
    },
    [changeLanguage, dispatch],
  );

  const handleGetCode = React.useCallback(async () => {
    // logout().then((result) => console.log(result));

    await getRegisterEmailValidateCode({
      countryCode: '+84',
      email: '',
    }).then(result => {
      console.log(result);
    });
  }, []);

  const handleRegister = React.useCallback(async () => {
    await registerAccountWithEmail({
      countryCode: '+84',
      email: '',
      password: '',
      validateCode: '315775',
    });
  }, []);

  const handleLogin = React.useCallback(async () => {
    await loginWithEmail({
      countryCode: '+84',
      email: 'dattv.155@gmail.com',
      password: '123456a@A',
    }).then(() => {});
  }, []);

  const handleCreateHome = React.useCallback(async () => {
    const home: CreateHomeParams = {
      name: 'test',
      geoName: '144 abc',
      lon: 105.78215,
      lat: 21.036791,
      rooms: [],
    };
    await createHome(home).then(() => {});
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={[styles.title]}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleGoBack}>
            <SvgIcon component={require('assets/icons/24/back.svg')} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Test Translate</Text>

          <View>
            <Text>Choose Your Language:</Text>
            <View>
              {[
                {language: AppLanguage.VIETNAMESE},
                {language: AppLanguage.ENGLISH},
              ].map((item, index) => (
                <Text
                  style={styles.languageChoice}
                  onPress={handleChangeLanguage(item.language)}
                  key={index}>
                  {item.language} {item.language === selectedLanguage && '- ok'}
                </Text>
              ))}
            </View>
          </View>

          <View>
            <Button title={'Get Code'} onPress={handleGetCode} />

            <Button title={'Register'} onPress={handleRegister} />

            <Button title={'Login'} onPress={handleLogin} />
          </View>

          <Text>Result: {translate('demo.helloWorld')}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export interface DemoScreenProps extends StackScreenProps<any> {
  //
}

DemoScreen.defaultProps = {
  //
};

DemoScreen.displayName = nameof(DemoScreen);

export default DemoScreen;
