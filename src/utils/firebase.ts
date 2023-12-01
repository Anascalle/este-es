import { initializeApp } from "firebase/app";
import { collection, addDoc,getDocs,where, setDoc, getFirestore, query,onSnapshot,doc  } from "firebase/firestore";
import { UserData } from "../types/userdata";
import { FavoriteData } from "../types/favorite";
import { PostData } from "../types/post";
import { firebaseConfig } from "../service/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); 

//agregar imagen al storage 

export const addPost = async (file: File, description: string, userId: string) => {
  try {
    const storageRef = ref(storage, file.name);
    const res = await uploadBytes(storageRef, file);
    const imageStorageRef = ref(storage, file.name)
    const imageURL = await getDownloadURL(imageStorageRef)
    console.log("Image uploaded successfully", res);

    const postCollection = collection(db, "post");
    const newPost = {
      imageUrl: imageURL,
      description: description,
      userId: userId,
    };

    await addDoc(postCollection, newPost);
  } catch (error) {
    console.error("Error adding post:", error);
  }
};

 const userCollection = collection(db, "user")
 const postCollection = collection(db, "post");
 const friendsCollection = collection(db, "friends");


// Recupera los datos del usuario de Firebase 

 export async function getUserData() {
  const querySnapshot = await getDocs(userCollection);
  const userData: UserData[] = [];
  querySnapshot.forEach((doc) => {
    const user = doc.data() as UserData;
    // Accede al ID del documento
    const userId = doc.id;
    
    userData.push({ ...user, id: userId });
  });
  return userData;
}
// Recupera los datos del post de Firebase 

 export async function getPostData(): Promise<PostData[]> {
  const querySnapshot = await getDocs(postCollection);
  const postData: PostData[] = [];
  querySnapshot.forEach((doc) => {
    const post = doc.data() as PostData;
    postData.push(post);
  });
  console.log(postData);
  return postData;
}


//obtener el id del artista
  export async function getPostsByArtistId(artistId: string): Promise<PostData[]> {
    const q = query(postCollection, where("userId", "==", artistId));
    const querySnapshot = await getDocs(q);
    const artistPosts: PostData[] = [];
  
    querySnapshot.forEach((doc) => {
      const post = doc.data() as PostData;
      artistPosts.push(post);
    });
  
    return artistPosts;
  }
  //agregar a favoritos
  export const addFavorite = async (userId: string, postId: string) => {
    const favoritesCollection = collection(db, "favorites");
    
    try {
      const favoriteData = {
        userId: userId,
        postId: postId,
      };
      
      const docRef = await addDoc(favoritesCollection, favoriteData);
      const docId = docRef.id; 
      console.log("Documento agregado a la colección de favoritos con ID: ", docId);
      return docId; 
    } catch (error) {
      console.error("Error al agregar un documento a la colección de favoritos: ", error);
      return null; 
    }
  };

//obtener de favoritos

  export const getFavorites = async (): Promise<FavoriteData[]> => {
    const querySnapshot = await getDocs(collection(db, "favorites"));
    const favorites: FavoriteData[] = [];
  
    querySnapshot.forEach((doc) => {
      const favorite = doc.data() as FavoriteData;
      favorites.push(favorite);
    });
  
    return favorites;
  }
//añadir a amigos

  export const addFriend = async (friendData:any) => {
    try {
      const friendRef = await addDoc(friendsCollection, friendData);
      console.log("Amigo añadido con ID:", friendRef.id);
      return friendRef.id;
    } catch (error) {
      console.error("Error al añadir amigo:", error);
      return null;
    }
  }
  //añadir a favoritos

  export const getFriends = async () => {
    const querySnapshot = await getDocs(friendsCollection);
    const friendsData: any = [];
  
    querySnapshot.forEach((doc) => {
      const friend = doc.data();
      friendsData.push({
        id: doc.id,
        ...friend,
      });
    });
  
    return friendsData;
  }
  export const escuchar = (fn:any) => {
    const q = query(collection(db, "post"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const post:any = [];
  querySnapshot.forEach((doc) => {
      post.push(doc.data().text);
      console.log(doc.data());
  });
  console.log( post.join(", "));
  fn(post)
  });
  
}

export default {
 
  getUserData,
  getPostData,
  escuchar,
  getPostsByArtistId,
  addPost,
  addFavorite,
  getFavorites,
  getFriends,
  addFriend
}
