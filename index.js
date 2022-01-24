// eslint-disable-next-line no-unused-vars
const functions = require("firebase-functions");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.onUserCreate = functions.firestore.document('permiso/{permiso_Id}').onCreate(async (snap, context) => {
    const values = snap.data();
    const query = db.collection("permiso");
    const snapshot = await query.where("id_permiso", "==", values.id_permiso).get();
    let duracion = 0;
    snapshot.forEach(querysnapshot => {
        duracion = querysnapshot.data().duracion_permiso
    });
    console.log(duracion);
    if (duracion > 15) {
        try {
            await db.collection('permiso').doc(snap.id).delete();
        } catch (error) {
            console.log(error);
        }
    }
})