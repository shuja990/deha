import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
const config = {
    apiKey: "AIzaSyB690UiW9Oc1nxWAdIfFgyJl7m8jifXuBs",
    authDomain: "deha-d254a.firebaseapp.com",
    projectId: "deha-d254a",
    storageBucket: "deha-d254a.appspot.com",
    messagingSenderId: "900887077554",
    appId: "1:900887077554:web:5394e855fd9c7ea8f45fab",
    measurementId: "G-MWK3QWJF9G"
}
export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const{displayName,email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,email,createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user',error)
        }
    }
    return userRef;
     
}
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });
    return await batch.commit()
}
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title,items} = doc.data();        
        return {
            routeName: encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((accumulator,collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{});
} 
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
