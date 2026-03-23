import { Link, Redirect } from "expo-router";
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import { useState, useEffect } from "react";
import Carregando from "../../components/Carregando";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[] | null>(null);
  // const [posts, setPosts] = useState<{ id: number; title: string; body: string; userId: number }[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      // const response = await fetch(
      //   `https://jsonplaceholder.typicode.com/posts`,
      // );
      // const data = await response.json();
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts`,
      );
      setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  if (loading) return <Carregando />;

  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Posts</Text>
      <TextInput
        style={commonStyles.inputStyle}
        placeholder="Buscar posts..."
        value={search}
        onChangeText={setSearch}
      />
      <Link href="/users" asChild>
        <TouchableOpacity style={commonStyles.button}>
          <Text style={commonStyles.buttonText}>Ir para Usuários</Text>
        </TouchableOpacity>
      </Link>
      {/* {posts.map((post) => (
        <View style={commonStyles.postItem} key={post.id}>
          <Text style={commonStyles.postTitle}>{post.title}</Text>
          <Text style={commonStyles.postBody}>{post.body}</Text>
        </View>
      ))} */}
      <FlatList
        data={filteredPosts}
        keyExtractor={(post) => post.id.toString()}
        renderItem={({ item: post }) => (
          <View style={commonStyles.postItem}>
            <Text style={commonStyles.postTitle}>{post.title}</Text>
            <Text style={commonStyles.postBody}>{post.body}</Text>
          </View>
        )}
      />
      {/* <Pressable style={commonStyles.button}>
        <Text style={commonStyles.buttonText}>Clique para deslogar</Text>
      </Pressable> */}
    </View>
  );
}
