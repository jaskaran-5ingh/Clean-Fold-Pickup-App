import React from "react";

import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { SIZES } from "../constants";

function SocialLoginButtons(props) {

  GoogleSignin.configure({
    webClientId: '574422778430-ogd02p1r7qkp13b185ddjvb813of3e3d.apps.googleusercontent.com',
  });

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
    } catch (error) {
      console.log(error)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <>
      <GoogleSigninButton
        title="Google Sign-In"
        style={{ width: '75%', height: SIZES.padding * 6,marginVertical:SIZES.padding / 10 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        disabled={false}
        onPress={
          () => {
            googleSignIn().then(()=>{
              console.log("Login Success")
            })
          }
        }/>
    </>
  );
}

export default SocialLoginButtons;
