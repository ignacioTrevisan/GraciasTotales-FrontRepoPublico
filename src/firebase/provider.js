import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, FacebookAuthProvider, GithubAuthProvider, signInWithRedirect } from "firebase/auth"
import { FireBaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const gitHubProvider = new GithubAuthProvider();


export const signWithGoogle = async () => {
    try {
        const data = await signInWithPopup(FireBaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = data.user;
        return {
            user: { displayName, email, photoURL, uid },
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error,
        }
    }
}


export const signWitFacebook = async () => {
    try {
        const data = await signInWithRedirect(FireBaseAuth, facebookProvider);
        const { displayName, email, photoURL, uid } = data.user;
        return {
            user: { displayName, email, photoURL, uid },
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error,
        }
    }
}
export const RegisterWithEmailPassword = async (emailP, password, displayName) => {
    try {
        const resp = await createUserWithEmailAndPassword(FireBaseAuth, emailP, password);
        updateProfile(FireBaseAuth.currentUser, { displayName });
        const { email, uid, photoURL } = resp.user
        return {
            ok: true,
            email, uid, photoURL
        }
    } catch (error) {
        console.log(error);
        const errorMessage = error.message;
        return {
            ok: false, errorMessage: errorMessage
        }
    }
}
export const LogInWithEmailPassword = async (emailP, password) => {

    try {
        const resp = await signInWithEmailAndPassword(FireBaseAuth, emailP, password);
        const { email, uid, photoURL, displayName } = resp.user;
        return {
            ok: true,
            email, uid, photoURL, displayName
        }
    } catch (error) {
        const errorMessage = error.message;
        return {
            ok: false, errorMessage: errorMessage
        }
    }
}