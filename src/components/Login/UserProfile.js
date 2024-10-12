import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Image, Alert, TextInput, Button, Animated } from 'react-native';
import { getAuth, signOut, onAuthStateChanged, updatePassword } from '@firebase/auth';
import md5 from 'md5';

const UserProfile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isEditingPassword, setEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigation.navigate('Login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigation]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigation.navigate('Login');
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const getGravatarUrl = (email) => {
    const trimmedEmail = email.trim().toLowerCase();
    const hashedEmail = md5(trimmedEmail);
    return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon`;
  };

  const handleChangePassword = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updatePassword(user, newPassword);
        Alert.alert('Succès', 'Mot de passe modifié avec succès !');
        setNewPassword('');
        setEditingPassword(false);
      } catch (error) {
        Alert.alert('Erreur', error.message);
      }
    } else {
      Alert.alert('Erreur', 'Utilisateur non connecté.');
    }
  };

  const handleSaveNotificationPreferences = () => {
    Alert.alert('Préférences enregistrées', `Notifications ${notificationsEnabled ? 'activées' : 'désactivées'}.`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const togglePasswordEdit = () => {
    setEditingPassword(prev => !prev);
    Animated.timing(animation, {
      toValue: isEditingPassword ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  if (!user) {
    return null; // Ou un loader
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={[styles.container, isDarkTheme && styles.darkTheme]} keyboardShouldPersistTaps="handled">
      <View style={[styles.profileContainer, isDarkTheme ? styles.darkProfileContainer : styles.lightProfileContainer]}>
        <Image source={{ uri: getGravatarUrl(user.email) }} style={styles.profileImage} />
        <Text style={[styles.username, isDarkTheme && styles.darkText]}>{user.displayName || 'Nom d’utilisateur'}</Text>
        <Text style={[styles.email, isDarkTheme && styles.darkText]}>{user.email}</Text>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.button} onPress={togglePasswordEdit}>
          <Text style={styles.buttonText}>Changer le mot de passe</Text>
        </TouchableOpacity>

        {isEditingPassword && (
          <Animated.View style={{ opacity: animation }}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nouveau mot de passe"
                secureTextEntry={!showPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text style={styles.visibilityToggle}>{showPassword ? 'Masquer' : 'Afficher'}</Text>
              </TouchableOpacity>
              <Button title="Enregistrer" onPress={handleChangePassword} color="#4CAF50" />
            </View>
          </Animated.View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSaveNotificationPreferences}>
          <Text style={styles.buttonText}>Préférences de notification</Text>
          <Switch value={notificationsEnabled} onValueChange={() => setNotificationsEnabled(prev => !prev)} />
        </TouchableOpacity>
      </View>

      <View style={styles.themeContainer}>
        <Text style={[styles.themeText, isDarkTheme && styles.darkText]}>Changer le Thème</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Se déconnecter</Text>
      </TouchableOpacity>

      {/* Ajout d'éléments pour tester le défilement */}
      <View style={styles.extraContent}>
        <Text style={styles.extraText}>Contenu supplémentaire pour le défilement :</Text>
        {[...Array(20)].map((_, index) => (
          <Text key={index} style={styles.extraItem}>Élément {index + 1}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#E5F9E0',
  },
  scrollView: {
    flex: 1,
  },
  darkTheme: {
    backgroundColor: '#2E3A2A',
  },
  profileContainer: {
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  lightProfileContainer: {
    backgroundColor: '#FFFFFF',
  },
  darkProfileContainer: {
    backgroundColor: '#4B5A4A',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  username: {
    fontSize: 26,
    marginBottom: 4,
    color: '#2E2E2E',
    fontWeight: '600',
  },
  email: {
    fontSize: 18,
    color: '#5A5A5A',
    marginBottom: 20,
  },
  settingsContainer: {
    width: '90%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#B7E9B7',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#2E2E2E',
    fontSize: 18,
  },
  passwordContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  visibilityToggle: {
    color: '#007BFF',
    marginBottom: 10,
    textAlign: 'right',
    fontSize: 16,
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
  },
  themeText: {
    marginRight: 10,
    fontSize: 18,
    color: '#2E2E2E',
  },
  darkText: {
    color: '#FFFFFF',
  },
  signOutButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '90%',
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  extraContent: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  extraText: {
    fontSize: 16,
    marginBottom: 10,
  },
  extraItem: {
    fontSize: 14,
    color: '#333',
  },
});

export default UserProfile;
// ajouter scrolling view pour eviter blockage du pag eapres ouverture de d autres inputs  
//verifier change m d pass 
//verifier notification via email
//