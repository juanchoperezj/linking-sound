import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AudioWaveform, BookOpen, PencilLine, ChevronRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import { linkingTypes } from '../constants/linkingTypes';

type RootStackParamList = {
  Home: undefined;
  Practice: undefined;
  Learn: undefined;
};

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <AudioWaveform size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Linking Sound</Text>
          <Text style={styles.tagline}>Master the flow of natural speech</Text>
        </View>

        {/* Intro */}
        <Text style={styles.introText}>
          Learn how words connect in natural English speech. Discover linking
          patterns that make you sound more fluent.
        </Text>

        {/* Mode Cards */}
        <View style={styles.modesSection}>
          <Text style={styles.sectionTitle}>Choose a Mode</Text>

          <TouchableOpacity
            style={styles.modeCard}
            onPress={() => navigation.navigate('Learn')}
            activeOpacity={0.7}
          >
            <View style={[styles.modeIcon, { backgroundColor: colors.accentLight }]}>
              <BookOpen size={28} color={colors.accentPrimary} />
            </View>
            <View style={styles.modeContent}>
              <Text style={styles.modeTitle}>Learn</Text>
              <Text style={styles.modeDescription}>
                Explore the 6 types of linking sounds with curated examples and audio
              </Text>
            </View>
            <ChevronRight size={24} color={colors.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeCard}
            onPress={() => navigation.navigate('Practice')}
            activeOpacity={0.7}
          >
            <View style={[styles.modeIcon, { backgroundColor: colors.accentWarmLight }]}>
              <PencilLine size={28} color={colors.accentWarm} />
            </View>
            <View style={styles.modeContent}>
              <Text style={styles.modeTitle}>Practice</Text>
              <Text style={styles.modeDescription}>
                Enter your own sentences and see how words link together with audio playback
              </Text>
            </View>
            <ChevronRight size={24} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Preview Section */}
        <View style={styles.previewSection}>
          <Text style={styles.sectionTitle}>What you'll learn</Text>
          <View style={styles.previewCard}>
            {linkingTypes.slice(0, 4).map((type, index) => (
              <View key={type.id} style={styles.previewRow}>
                <View style={[styles.previewDot, { backgroundColor: type.color }]} />
                <Text style={styles.previewText}>
                  "{type.examples[0].original}" → "{type.examples[0].linked}"
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  scrollContent: {
    padding: spacing.xl,
    gap: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    width: 64,
    height: 64,
    backgroundColor: colors.accentPrimary,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.sizes.largeTitle,
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
  },
  introText: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: spacing.sm,
  },
  modesSection: {
    gap: spacing.base,
  },
  sectionTitle: {
    fontSize: typography.sizes.headline,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.base,
    shadowColor: '#1A1918',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  modeIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeContent: {
    flex: 1,
    gap: spacing.xs,
  },
  modeTitle: {
    fontSize: typography.sizes.headline,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  modeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  previewSection: {
    gap: spacing.md,
  },
  previewCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    gap: spacing.md,
    shadowColor: '#1A1918',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  previewDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
  },
  previewText: {
    fontSize: 14,
    fontWeight: typography.weights.medium,
    color: colors.textPrimary,
  },
});
