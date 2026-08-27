import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MovingTransitIcons from '../components/MovingTransitIcons';
import { COLORS } from '../theme';

/**
 * Format a Date as "MM/DD/YY h:mm AM/PM" (e.g. 08/26/26 7:06 PM).
 */
function formatExpiration(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) hours = 12;

  return `${mm}/${dd}/${yy} ${hours}:${minutes} ${ampm}`;
}

/**
 * Ticket display screen matching the internship reference screenshots.
 */
export default function TicketScreen({ onBack }) {
  const insets = useSafeAreaInsets();

  // Blue/green visual state: false = blue (default), true = green.
  // Each tap on the ticket area flips this boolean.
  const [isGreen, setIsGreen] = useState(false);

  // Expiration is calculated once when this screen mounts (ticket "activated"):
  // device now + 2.5 hours. Not hard-coded from the screenshots.
  const expirationLabel = useMemo(() => {
    const expiresAt = new Date(Date.now() + 2.5 * 60 * 60 * 1000);
    return formatExpiration(expiresAt);
  }, []);

  const ticketColors = isGreen
    ? { top: COLORS.greenTop, bottom: COLORS.greenBottom }
    : { top: COLORS.blueTop, bottom: COLORS.blueBottom };

  return (
    <View style={styles.root}>
      {/* TOP: navy navigation bar */}
      <View style={[styles.navBar, { paddingTop: insets.top }]}>
        <View style={styles.navInner}>
          <Pressable onPress={onBack} hitSlop={12} style={styles.backHit}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={styles.navTitle}>Ticket</Text>
          {/* Spacer keeps the title visually centered */}
          <View style={styles.backHit}>
            <Text style={[styles.backText, styles.invisible]}>Back</Text>
          </View>
        </View>
      </View>

      {/* HEADER: yellow/orange METRO band */}
      <View style={styles.metroSection}>
        <View style={[styles.bandHalf, { backgroundColor: COLORS.yellowTop }]} />
        <View style={[styles.bandHalf, { backgroundColor: COLORS.yellowBottom }]} />
        <View style={styles.metroOverlay}>
          <Text style={styles.metroText}>METRO</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* TICKET AREA: tappable; toggles blue ↔ green */}
      <Pressable
        style={styles.ticketArea}
        onPress={() => setIsGreen((prev) => !prev)}
      >
        <View style={[styles.bandHalf, { backgroundColor: ticketColors.top }]} />
        <View style={[styles.bandHalf, { backgroundColor: ticketColors.bottom }]} />

        <MovingTransitIcons />

        <View style={styles.ticketOverlay}>
          <Text style={styles.fareText}>ADULT ($3.00)</Text>
        </View>
      </Pressable>

      <View style={styles.divider} />

      {/* EXPIRATION AREA */}
      <View style={[styles.expirationSection, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={[styles.bandHalf, { backgroundColor: COLORS.yellowTop }]} />
        <View style={[styles.bandHalf, { backgroundColor: COLORS.yellowBottom }]} />
        <View style={styles.expirationOverlay}>
          <Text style={styles.expirationTime}>{expirationLabel}</Text>
          <Text style={styles.expirationLabel}>Expiration Date & Time</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.navBlue,
  },
  navBar: {
    backgroundColor: COLORS.navBlue,
  },
  navInner: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  backHit: {
    minWidth: 56,
  },
  backText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '500',
  },
  invisible: {
    opacity: 0,
  },
  navTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '600',
  },
  metroSection: {
    height: 100,
    position: 'relative',
  },
  bandHalf: {
    flex: 1,
  },
  metroOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metroText: {
    color: COLORS.white,
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 2,
  },
  divider: {
    height: 1.5,
    backgroundColor: COLORS.divider,
  },
  ticketArea: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  ticketOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fareText: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  expirationSection: {
    height: 120,
    position: 'relative',
  },
  expirationOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  expirationTime: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
  },
  expirationLabel: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
  },
});
