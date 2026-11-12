import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  Switch
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const INITIAL_PROFILES = [
  {
    id: '1',
    name: 'Aarav Sharma',
    age: 26,
    occupation: 'Software Engineer',
    bio: 'Looking for a clean 2BHK near tech parks. Quiet on weekdays, love cooking weekend brunches!',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80',
    compatibility: 94,
    habits: {
      sleepTime: '11:00 PM',
      music: 'Low (Headphones)',
      alcohol: 'Occasional',
      smoking: 'Non-Smoker',
      diet: 'Veg Only',
      privacy: 'High',
      setup: '2BHK (Fully Furnished)',
      budget: '₹25,000 / mo'
    }
  },
  {
    id: '2',
    name: 'Rohan Verma',
    age: 28,
    occupation: 'Product Manager',
    bio: 'Night owl working in fintech. Appreciate a spotless kitchen and respectful roommate boundaries.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    compatibility: 88,
    habits: {
      sleepTime: '1:00 AM',
      music: 'Moderate',
      alcohol: 'Social',
      smoking: 'Non-Smoker',
      diet: 'Veg & Non-Veg',
      privacy: 'Moderate',
      setup: '3BHK (Semi Furnished)',
      budget: '₹22,000 / mo'
    }
  },
  {
    id: '3',
    name: 'Priya Nair',
    age: 25,
    occupation: 'UX Designer',
    bio: 'Plant lover and coffee enthusiast. Seeking a peaceful female or co-living flatmate.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
    compatibility: 82,
    habits: {
      sleepTime: '10:30 PM',
      music: 'Low (Headphones)',
      alcohol: 'Non-Drinker',
      smoking: 'Non-Smoker',
      diet: 'Veg Only',
      privacy: 'High',
      setup: '1BHK (Fully Furnished)',
      budget: '₹30,000 / mo'
    }
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState('discover');
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState(false);

  const [userHabits, setUserHabits] = useState({
    gender: 'Male',
    genderPreference: 'No Preference',
    sleepTime: '11:00 PM',
    music: 'Low (Headphones)',
    alcohol: 'Occasional',
    smoking: 'Non-Smoker',
    diet: 'Veg Only',
    privacy: 'High',
    setup: '2BHK (Fully Furnished)',
    budget: '₹25,000 / mo',
    dealbreakerSleep: true,
    dealbreakerSmoking: true,
    dealbreakerGender: true
  });

  const handleSwipe = (direction) => {
    const current = profiles[currentIndex];
    if (direction === 'right' || direction === 'super') {
      setMatchedProfile(current);
      setMatches((prev) => [...prev, current]);
      setShowMatchModal(true);
    }
    setCurrentIndex((prev) => prev + 1);
    setExpandedDetails(false);
  };

  const currentProfile = profiles[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <MaterialCommunityIcons name="home-heart" size={28} color="#FF385C" />
          <Text style={styles.logoText}>NestMate</Text>
        </View>
        <Text style={styles.subLogoText}>Find Your Ideal Flatmate</Text>
      </View>

      {currentTab === 'discover' && (
        <View style={styles.discoverContainer}>
          {currentIndex < profiles.length ? (
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <View style={styles.compatibilityBadge}>
                  <Ionicons name="flash" size={14} color="#FFF" />
                  <Text style={styles.compatibilityText}>
                    {currentProfile.compatibility}% Match
                  </Text>
                </View>
                {currentProfile.distanceKm !== undefined && (
                  <View style={styles.distanceBadge}>
                    <Ionicons name="location" size={14} color="#FFF" />
                    <Text style={styles.distanceText}>
                      {currentProfile.distanceKm} km away
                    </Text>
                  </View>
                )}
                <ScrollView contentContainerStyle={styles.cardContent}>
                  <View style={styles.profileHeaderInfo}>
                    <Text style={styles.profileName}>
                      {currentProfile.name}, {currentProfile.age}
                    </Text>
                    <Text style={styles.profileOccupation}>
                      {currentProfile.occupation}
                    </Text>
                    <Text style={styles.profileBio}>{currentProfile.bio}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.habitToggleBar}
                    onPress={() => setExpandedDetails(!expandedDetails)}
                  >
                    <Text style={styles.habitToggleText}>
                      {expandedDetails ? 'Hide Habit Breakdown' : 'Compare Habits & Dealbreakers'}
                    </Text>
                    <Ionicons
                      name={expandedDetails ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color="#FF385C"
                    />
                  </TouchableOpacity>

                  {expandedDetails && (
                    <View style={styles.habitGrid}>
                      <HabitRow icon="bed" label="Sleep" value={currentProfile.habits.sleepTime} userValue={userHabits.sleepTime} />
                      <HabitRow icon="musical-notes" label="Music" value={currentProfile.habits.music} userValue={userHabits.music} />
                      <HabitRow icon="wine" label="Alcohol" value={currentProfile.habits.alcohol} userValue={userHabits.alcohol} />
                      <HabitRow icon="shield-checkmark" label="Smoking" value={currentProfile.habits.smoking} userValue={userHabits.smoking} />
                      <HabitRow icon="restaurant" label="Diet" value={currentProfile.habits.diet} userValue={userHabits.diet} />
                      <HabitRow icon="home" label="Setup" value={currentProfile.habits.setup} userValue={userHabits.setup} />
                    </View>
                  )}
                </ScrollView>
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.passBtn]}
                  onPress={() => handleSwipe('left')}
                >
                  <Ionicons name="close" size={28} color="#FF4458" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.superBtn]}
                  onPress={() => handleSwipe('super')}
                >
                  <FontAwesome5 name="star" size={20} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.connectBtn]}
                  onPress={() => handleSwipe('right')}
                >
                  <Ionicons name="heart" size={28} color="#00C853" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="home-search" size={64} color="#999" />
              <Text style={styles.emptyTitle}>No More Profiles Nearby</Text>
              <Text style={styles.emptySubtitle}>
                Adjust your habit filters or check back later for new flatmate matches!
              </Text>
              <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => setCurrentIndex(0)}
              >
                <Text style={styles.resetBtnText}>Restart Deck</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      {currentTab === 'habits' && (
        <ScrollView style={styles.habitsContainer}>
          <Text style={styles.sectionTitle}>Your Lifestyle & Dealbreakers</Text>
          <Text style={styles.sectionSubtitle}>
            We use these parameters to calculate compatibility and filter incompatible flatmates.
          </Text>

          <HabitSelector
            label="Flatmate Gender Preference"
            value={userHabits.genderPreference}
            options={['No Preference', 'Male Only', 'Female Only']}
            onChange={(val) => setUserHabits({ ...userHabits, genderPreference: val })}
            isDealbreaker={userHabits.dealbreakerGender}
            onToggleDealbreaker={(val) => setUserHabits({ ...userHabits, dealbreakerGender: val })}
          />

          <HabitSelector
            label="Sleep Schedule"
            value={userHabits.sleepTime}
            options={['10:00 PM', '11:00 PM', '12:00 AM', '1:00 AM+']}
            onChange={(val) => setUserHabits({ ...userHabits, sleepTime: val })}
            isDealbreaker={userHabits.dealbreakerSleep}
            onToggleDealbreaker={(val) => setUserHabits({ ...userHabits, dealbreakerSleep: val })}
          />

          <HabitSelector
            label="Smoking Habit"
            value={userHabits.smoking}
            options={['Non-Smoker', 'Outdoor Only', 'Smoker']}
            onChange={(val) => setUserHabits({ ...userHabits, smoking: val })}
            isDealbreaker={userHabits.dealbreakerSmoking}
            onToggleDealbreaker={(val) => setUserHabits({ ...userHabits, dealbreakerSmoking: val })}
          />

          <HabitSelector
            label="Dietary Preference"
            value={userHabits.diet}
            options={['Veg Only', 'Eggetarian', 'Veg & Non-Veg', 'Vegan']}
            onChange={(val) => setUserHabits({ ...userHabits, diet: val })}
          />

          <HabitSelector
            label="Apartment Setup"
            value={userHabits.setup}
            options={['1BHK (Fully Furnished)', '2BHK (Fully Furnished)', '3BHK (Semi Furnished)', 'Studio']}
            onChange={(val) => setUserHabits({ ...userHabits, setup: val })}
          />
        </ScrollView>
      )}

      {currentTab === 'matches' && (
        <ScrollView style={styles.matchesContainer}>
          <Text style={styles.sectionTitle}>Your NestMatches ({matches.length})</Text>
          {matches.length === 0 ? (
            <Text style={styles.emptySubtitle}>
              Connect with flatmates on the Discover tab to start chatting!
            </Text>
          ) : (
            matches.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={styles.matchItem}
                onPress={() => {
                  setActiveChat(m);
                  setCurrentTab('chat');
                }}
              >
                <View style={styles.matchAvatarPlaceholder}>
                  <Ionicons name="person" size={24} color="#FF385C" />
                </View>
                <View style={styles.matchInfo}>
                  <Text style={styles.matchName}>{m.name}</Text>
                  <Text style={styles.matchSub}>{m.occupation} • {m.compatibility}% Match</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CCC" />
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      )}

      {currentTab === 'chat' && activeChat && (
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <TouchableOpacity onPress={() => setCurrentTab('matches')}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.chatTitle}>{activeChat.name}</Text>
            <View style={{ width: 24 }} />
          </View>
          <View style={styles.chatBody}>
            <Text style={styles.chatIcebreaker}>
              🎉 You matched with {activeChat.name}! Both of you agree on {activeChat.habits.setup} preferences.
            </Text>
          </View>
          <View style={styles.chatInputBar}>
            <TextInput style={styles.chatInput} placeholder="Type a message..." />
            <TouchableOpacity style={styles.sendBtn}>
              <Ionicons name="send" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.navBar}>
        <NavItem icon="compass" label="Discover" active={currentTab === 'discover'} onPress={() => setCurrentTab('discover')} />
        <NavItem icon="options" label="Habits" active={currentTab === 'habits'} onPress={() => setCurrentTab('habits')} />
        <NavItem icon="heart" label="Matches" active={currentTab === 'matches'} onPress={() => setCurrentTab('matches')} />
      </View>

      <Modal visible={showMatchModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>It's a NestMatch! 🏠</Text>
            <Text style={styles.modalSub}>
              You and {matchedProfile?.name} have aligned living habits and mutual interest.
            </Text>
            <TouchableOpacity
              style={styles.modalChatBtn}
              onPress={() => {
                setShowMatchModal(false);
                setActiveChat(matchedProfile);
                setCurrentTab('chat');
              }}
            >
              <Text style={styles.modalChatText}>Send Icebreaker Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowMatchModal(false)}
              style={styles.modalCloseBtn}
            >
              <Text style={styles.modalCloseText}>Keep Swiping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function HabitRow({ icon, label, value, userValue }) {
  const isMatch = userValue ? value === userValue : true;
  return (
    <View style={styles.habitRow}>
      <Ionicons name={icon} size={16} color="#666" style={{ width: 24 }} />
      <Text style={styles.habitLabel}>{label}:</Text>
      <Text style={[styles.habitValue, { color: isMatch ? '#00C853' : '#333' }]}>{value}</Text>
    </View>
  );
}

function HabitSelector({ label, value, options, onChange, isDealbreaker, onToggleDealbreaker }) {
  return (
    <View style={styles.selectorCard}>
      <View style={styles.selectorHeader}>
        <Text style={styles.selectorTitle}>{label}</Text>
        {onToggleDealbreaker && (
          <View style={styles.dealbreakerRow}>
            <Text style={styles.dealbreakerText}>Dealbreaker</Text>
            <Switch value={isDealbreaker} onValueChange={onToggleDealbreaker} trackColor={{ true: '#FF385C' }} />
          </View>
        )}
      </View>
      <View style={styles.optionsRow}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.optionChip, value === opt && styles.optionChipActive]}
            onPress={() => onChange(opt)}
          >
            <Text style={[styles.optionChipText, value === opt && styles.optionChipTextActive]}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function NavItem({ icon, label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <Ionicons name={icon} size={24} color={active ? '#FF385C' : '#888'} />
      <Text style={[styles.navText, active && styles.navTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoText: { fontSize: 22, fontWeight: 'bold', color: '#FF385C', marginLeft: 8 },
  subLogoText: { fontSize: 12, color: '#666', marginTop: 2 },
  discoverContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  card: { width: width * 0.92, height: height * 0.68, backgroundColor: '#FFF', borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5, overflow: 'hidden' },
  imageContainer: { flex: 1, backgroundColor: '#E1E4E8' },
  compatibilityBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.7)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, zIndex: 10 },
  compatibilityText: { color: '#FFF', fontWeight: 'bold', marginLeft: 4, fontSize: 12 },
  distanceBadge: { position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(0,0,0,0.7)', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, zIndex: 10 },
  distanceText: { color: '#FFF', fontWeight: 'bold', marginLeft: 4, fontSize: 12 },
  cardContent: { padding: 20, paddingTop: 40 },
  profileHeaderInfo: { marginBottom: 16 },
  profileName: { fontSize: 24, fontWeight: 'bold', color: '#111' },
  profileOccupation: { fontSize: 14, color: '#666', marginTop: 2 },
  profileBio: { fontSize: 14, color: '#444', marginTop: 8, lineHeight: 20 },
  habitToggleBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF0F2', padding: 12, borderRadius: 10, marginVertical: 10 },
  habitToggleText: { color: '#FF385C', fontWeight: '600', fontSize: 13 },
  habitGrid: { backgroundColor: '#FAFAFA', padding: 12, borderRadius: 10 },
  habitRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  habitLabel: { fontSize: 13, color: '#666', width: 70 },
  habitValue: { fontSize: 13, fontWeight: '600' },
  actionRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 16, backgroundColor: '#FFF' },
  actionBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  passBtn: { borderWidth: 1, borderColor: '#FF4458' },
  superBtn: { borderWidth: 1, borderColor: '#007AFF', width: 46, height: 46, borderRadius: 23 },
  connectBtn: { borderWidth: 1, borderColor: '#00C853' },
  emptyState: { alignItems: 'center', justifyContent: 'center', padding: 32 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 12 },
  emptySubtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginTop: 6 },
  resetBtn: { marginTop: 20, backgroundColor: '#FF385C', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25 },
  resetBtnText: { color: '#FFF', fontWeight: 'bold' },
  navBar: { flexDirection: 'row', height: 60, borderTopWidth: 1, borderTopColor: '#EEE', backgroundColor: '#FFF', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 11, color: '#888', marginTop: 2 },
  navTextActive: { color: '#FF385C', fontWeight: 'bold' },
  habitsContainer: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  sectionSubtitle: { fontSize: 13, color: '#666', marginBottom: 16 },
  selectorCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  selectorHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  selectorTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
  dealbreakerRow: { flexDirection: 'row', alignItems: 'center' },
  dealbreakerText: { fontSize: 11, color: '#888', marginRight: 6 },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#DDD', backgroundColor: '#FAFAFA', marginRight: 6, marginBottom: 6 },
  optionChipActive: { backgroundColor: '#FF385C', borderColor: '#FF385C' },
  optionChipText: { fontSize: 12, color: '#444' },
  optionChipTextActive: { color: '#FFF', fontWeight: '600' },
  matchesContainer: { flex: 1, padding: 16 },
  matchItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 12, borderRadius: 12, marginBottom: 10 },
  matchAvatarPlaceholder: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFE6EA', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  matchInfo: { flex: 1 },
  matchName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  matchSub: { fontSize: 12, color: '#666', marginTop: 2 },
  chatContainer: { flex: 1, backgroundColor: '#FFF' },
  chatHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  chatTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  chatBody: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  chatIcebreaker: { backgroundColor: '#FFF0F2', color: '#FF385C', padding: 16, borderRadius: 12, textAlign: 'center', fontSize: 14, overflow: 'hidden' },
  chatInputBar: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#EEE', alignItems: 'center' },
  chatInput: { flex: 1, backgroundColor: '#F1F3F5', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, fontSize: 14 },
  sendBtn: { backgroundColor: '#FF385C', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: width * 0.82, backgroundColor: '#FFF', borderRadius: 20, padding: 24, alignItems: 'center' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#FF385C', marginBottom: 8, textAlign: 'center' },
  modalSub: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  modalChatBtn: { backgroundColor: '#FF385C', width: '100%', paddingVertical: 12, borderRadius: 25, alignItems: 'center', marginBottom: 10 },
  modalChatText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  modalCloseBtn: { paddingVertical: 8 },
  modalCloseText: { color: '#888', fontWeight: '600' }
});
