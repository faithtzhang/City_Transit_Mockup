import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../theme';

/**
 * Simple home screen with one demo ticket the intern can tap to open.
 */
export default function HomeScreen({ onOpenTicket }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transit Go</Text>
        <Text style={styles.headerSubtitle}>Ticket UI Prototype</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionLabel}>Your Tickets</Text>

        <Pressable
          style={({ pressed }) => [styles.ticketCard, pressed && styles.ticketCardPressed]}
          onPress={onOpenTicket}
        >
          <View style={styles.ticketAccent} />
          <View style={styles.ticketBody}>
            <Text style={styles.ticketBrand}>METRO</Text>
            <Text style={styles.ticketTitle}>ADULT ($3.00)</Text>
            <Text style={styles.ticketHint}>Tap to view ticket</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F8',
  },
  header: {
    backgroundColor: COLORS.navBlue,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5A6475',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  ticketCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    // Subtle elevation for a tappable card (interaction container)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  ticketCardPressed: {
    opacity: 0.88,
  },
  ticketAccent: {
    width: 8,
    backgroundColor: COLORS.yellowBottom,
  },
  ticketBody: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  ticketBrand: {
    color: COLORS.navBlue,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  ticketTitle: {
    color: '#1A1A1A',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 4,
  },
  ticketHint: {
    color: '#7A8494',
    fontSize: 13,
    marginTop: 8,
  },
});
