import { getDatabase, ref, get, push, set, remove } from "firebase/database";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchPosts() {
  const db = getDatabase();
  const postsRef = ref(db, "posts/");
  const snapshot = await get(postsRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const postsArray = Object.entries(data).flatMap(([groupKey, groupObj]) =>
      Object.entries(groupObj).map(([id, item]) => ({
        groupKey: `${groupKey}-${id}`,
        id,
        ...item,
      }))
    );
    return postsArray;
  }
}

export async function fetchPostsByUserId({ userId }) {
  const db = getDatabase();
  const postsRef = ref(db, "posts/" + userId);
  const snapshot = await get(postsRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const postsArray = Object.entries(data).map(([id, item]) => ({
      groupKey: id,
      ...item,
    }));
    return postsArray;
  }
  return [];
}

export async function fetchPostByPostId({ userId, postId }) {
  const db = getDatabase();
  const postsRef = ref(db, "posts/" + userId + "/" + postId);
  const snapshot = await get(postsRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    return data;
  }
  return null;
}

export async function fetchUserInfo({ userId }) {
  const db = getDatabase();
  const userRef = ref(db, "users/" + userId);
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const data = snapshot.val();
    const userArray = Object.values(data);
    return userArray[0];
  }
}

export async function storeUserData({ userId, filteredData }) {
  const db = getDatabase();
  const userRef = ref(db, "users/" + userId);
  const newUserRef = push(userRef);
  set(newUserRef, filteredData);
}

export async function createNewPost({ userId, data }) {
  const db = getDatabase();
  const postRef = ref(db, "posts/" + userId);
  const newPostRef = push(postRef);
  set(newPostRef, data);
}

export async function updatePost({ userId, postId, data }) {
  const db = getDatabase();
  const postRef = ref(db, "posts/" + userId + "/" + postId);
  set(postRef, data);
}

export async function deletePost({ userId, postId }) {
  const db = getDatabase();
  const postRef = ref(db, "posts/" + userId + "/" + postId);
  await remove(postRef);
}
