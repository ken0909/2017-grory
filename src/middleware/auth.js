import * as auth from "../modules/auth";
import { firebaseAuth } from "../lib/Firebase";
import { push } from "react-router-redux";

export default store => next => action => {
  const { email, password, name, user } = action.payload
  switch (action.type) {
    case auth.SIGN_IN:
      next(action)
      firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        store.dispatch(auth.signInSuccess({ user }))
        store.dispatch(auth.updateProfile({ user, name }))
      })
      .catch(error => store.dispatch(auth.signInFailure(error)));
      break;
    case auth.SIGN_IN_SUCCESS:
      next(action)
      store.dispatch(push('/'))
      break
    case auth.LOG_IN:
      next(action)
      firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(user => store.dispatch(auth.logInSuccess({ user })))
      .catch(error => store.dispatch(auth.logInFailure(error)));
      break;
    case auth.LOG_IN_SUCCESS:
      next(action)
      store.dispatch(push('/'))
      break;
    case auth.UPDATE_PROFILE:
      next(action)
      user.updateProfile({
        displayName: name
      })
      .then(() => store.dispatch(auth.updateProfileSuccess({ name: user.displayName })))
      .catch(error => store.dispatch(auth.updateProfileFailure(error)))
      break
    case auth.LOG_OUT:
      next(action)
      firebaseAuth.signOut().then(() => store.dispatch(auth.logOutSuccess({})))
      break;
    case auth.LOG_OUT_SUCCESS:
      next(action)
      store.dispatch(push('/login'))
      break;
    case auth.LOAD_LOG_IN_STATE:
      next(action)
      firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          store.dispatch(auth.logInSuccess({ user }))
          // this.userRef = firebaseDbRef(`user/${user.uid}`);
          // this.userRef.on('value', snapshot =>
          //   this.props.actions.setUserDistance({
          //     distance: snapshot.val().distance
          //   })
          // );
        }
      });
      break;
    default:
      next(action)
      break;
  }
}
