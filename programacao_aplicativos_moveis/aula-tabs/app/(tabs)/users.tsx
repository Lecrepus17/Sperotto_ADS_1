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

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
}

export default function Users() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users`,
      );
      setUsers(data);
      setLoading(false);
    };
    loadUsers();
  }, []);

  if (loading) return <Carregando />;

  const filteredUsers = users?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Usuários</Text>
      <TextInput
        style={commonStyles.inputStyle}
        placeholder="Buscar usuários..."
        value={search}
        onChangeText={setSearch}
      />
      <Link href="/" asChild>
        <TouchableOpacity style={commonStyles.button}>    
          <Text style={commonStyles.buttonText}>Ir para Index</Text>
        </TouchableOpacity>
      </Link>
      <FlatList
        data={filteredUsers}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item: user }) => (
          <View style={commonStyles.postItem}>
            <Text style={commonStyles.postTitle}>{user.name}</Text>
            <Text style={commonStyles.postBody}>@{user.username}</Text>
            <Text style={commonStyles.postBody}>{user.email}</Text>
            <Text style={commonStyles.postBody}>{user.phone}</Text>
          </View>
        )}
      />
    </View>
  );
}