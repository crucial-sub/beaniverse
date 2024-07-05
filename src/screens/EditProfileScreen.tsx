import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {launchImageLibrary} from 'react-native-image-picker';
import {useRecoilState} from 'recoil';
import {patchProfile} from '../api/apiUser';
import DeleteIcon from '../assets/svg_images/delete.svg';
import EditIcon from '../assets/svg_images/edit.svg';
import HeaderWithoutBottomTab from '../components/Header/HeaderWithoutBottomTab';
import {profileImageState, userNameState, userState} from '../recoil';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userState);
  const [profileImage, setProfileImage] = useRecoilState(profileImageState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [isUserNameValid, setIsUserNameValid] = useState(true);

  React.useEffect(() => {
    setProfileImage(user!.profileImage);
    setUserName(user!.user_name);
  }, [user]);

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (
        response.assets &&
        response.assets.length > 0 &&
        response.assets[0].uri
      ) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const handleDeleteImage = () => {
    setProfileImage(user!.profileImage);
  };

  const handleUserNameChange = (text: string) => {
    setUserName(text);
    setIsUserNameValid(text.length >= 3);
  };

  const handleSave = async () => {
    const data = new FormData();
    if (profileImage !== user?.profileImage) {
      data.append('file', {
        uri: profileImage,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });
    }
    if (userName !== user?.user_name) {
      data.append('user_name', userName);
    }

    try {
      const response = await patchProfile(data);
      setUser(prevUser => {
        if (prevUser) {
          return {
            ...prevUser,
            profileImage:
              profileImage !== prevUser.profileImage
                ? profileImage
                : prevUser.profileImage,
            user_name:
              userName !== prevUser.user_name ? userName : prevUser.user_name,
          };
        }
        return prevUser;
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <HeaderWithoutBottomTab title="Edit Profile" />
      <View style={styles.Container}>
        <View style={styles.ProfileImageWrapper}>
          <FastImage source={{uri: profileImage}} style={styles.ProfileImage} />
          <TouchableOpacity
            style={styles.EditProfileImageButton}
            onPress={
              profileImage !== user!.profileImage
                ? handleDeleteImage
                : handleImagePicker
            }>
            {profileImage !== user!.profileImage ? (
              <DeleteIcon />
            ) : (
              <EditIcon />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.UserNameLabel}>User Name</Text>
        <TextInput
          style={styles.UserNameInput}
          placeholder="at least 3 characters"
          placeholderTextColor={COLORS.tertiaryLightGreyHex}
          value={userName}
          onChangeText={handleUserNameChange}
        />
      </View>
      <TouchableOpacity
        style={[styles.SaveButton, !isUserNameValid && styles.InActiveButton]}
        onPress={handleSave}
        disabled={!isUserNameValid}>
        <Text style={styles.ButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  Container: {
    paddingHorizontal: 20,
  },
  ProfileImageWrapper: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 30,
  },
  ProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  EditProfileImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  UserNameLabel: {
    color: COLORS.tertiaryLightGreyHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginBottom: 10,
  },
  UserNameInput: {
    width: '100%',
    height: 50,
    borderRadius: 19.5,
    borderWidth: 1,
    borderColor: COLORS.secondarySilverGreyHex,
    paddingHorizontal: 20,
    paddingVertical: 15,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  SaveButton: {
    position: 'absolute',
    height: 46,
    left: 20,
    right: 20,
    bottom: 50,
    backgroundColor: COLORS.primaryOrangeHex,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 19.5,
  },
  InActiveButton: {
    backgroundColor: COLORS.secondarySilverGreyHex,
  },
  ButtonText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});
