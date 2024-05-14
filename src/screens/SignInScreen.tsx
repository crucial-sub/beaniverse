import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {signIn} from '../api/auth';
import {accessTokenState} from '../recoil';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const SignInScreen = () => {
  const [activeBorder, setActiveBorder] = React.useState({
    email: false,
    password: false,
  });
  const [activeButton, setActiveButton] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = useRecoilState(accessTokenState);
  const handleSignIn = () => {
    const getAccessToken = async () => {
      const accessToken = await signIn(email, password);
      if (accessToken) setToken(accessToken);
    };
    getAccessToken();
  };
  const handleFocus = (inputType: string) =>
    setActiveBorder({...activeBorder, [inputType]: true});
  const handleBlur = (inputType: string) =>
    setActiveBorder({...activeBorder, [inputType]: false});
  const handleEmailText = (email: string) => {
    setEmail(email);
  };
  const handlePasswordText = (password: string) => {
    setPassword(password);
  };

  React.useEffect(() => {
    if (email && password.length > 5) setActiveButton(true);
    else setActiveButton(false);
  }, [email, password]);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.Container}>
        <View style={styles.InputWrapper}>
          <Text style={styles.TitleText}>Sign In</Text>
          <TextInput
            style={[
              styles.TextInput,
              {
                borderColor: activeBorder.email
                  ? COLORS.primaryOrangeHex
                  : COLORS.secondarySilverGreyHex,
              },
            ]}
            placeholder="Email"
            placeholderTextColor={COLORS.secondarySilverGreyHex}
            autoCapitalize="none"
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            value={email}
            onChangeText={handleEmailText}
          />
          <TextInput
            style={[
              styles.TextInput,
              {
                borderColor: activeBorder.password
                  ? COLORS.primaryOrangeHex
                  : COLORS.secondarySilverGreyHex,
              },
            ]}
            placeholder="Password"
            placeholderTextColor={COLORS.secondarySilverGreyHex}
            autoCapitalize="none"
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            value={password}
            onChangeText={handlePasswordText}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.Button,
            {
              backgroundColor: activeButton
                ? COLORS.primaryOrangeHex
                : COLORS.secondarySilverGreyHex,
            },
          ]}
          onPress={handleSignIn}>
          <Text style={styles.ButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  Container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: SPACING.space_30,
    gap: SPACING.space_60,
  },
  InputWrapper: {
    marginTop: SPACING.space_60,
    gap: SPACING.space_24,
  },
  TitleText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  TextInput: {
    borderRadius: BORDERRADIUS.radius_15,
    borderWidth: 1,
    padding: SPACING.space_15,
    borderColor: COLORS.secondarySilverGreyHex,
    color: COLORS.primaryWhiteHex,
  },
  Button: {
    backgroundColor: COLORS.secondarySilverGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
  },
});
