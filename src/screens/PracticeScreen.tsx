import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Speech from 'expo-speech';
import {
  ArrowLeft,
  Settings,
  ArrowRight,
  Volume2,
  Play,
  Gauge,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import { linkingTypes } from '../constants/linkingTypes';

type RootStackParamList = {
  Home: undefined;
  Practice: undefined;
  Learn: undefined;
};

type PracticeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Practice'>;
};

type LinkingChunk = {
  original: string;
  linked: string;
  linkingType?: string;
  color?: string;
  lightColor?: string;
};

// Simple phonetic analysis - in a real app, this would use a more sophisticated approach
function analyzeLinks(sentence: string): { fullLinked: string; chunks: LinkingChunk[] } {
  const words = sentence.toLowerCase().trim().split(/\s+/);
  const chunks: LinkingChunk[] = [];
  let fullLinkedParts: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i];
    const nextWord = words[i + 1];

    if (!nextWord) {
      // Last word - no linking
      chunks.push({
        original: currentWord,
        linked: currentWord,
      });
      fullLinkedParts.push(currentWord);
      continue;
    }

    const lastChar = currentWord[currentWord.length - 1];
    const firstChar = nextWord[0];
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const consonants = 'bcdfghjklmnpqrstvwxyz'.split('');

    // Consonant to Vowel linking
    if (consonants.includes(lastChar) && vowels.includes(firstChar)) {
      const linked = `${currentWord.slice(0, -1)}-${lastChar}${nextWord}`;
      chunks.push({
        original: `${currentWord} ${nextWord}`,
        linked: linked,
        linkingType: 'C→V',
        color: colors.accentBlue,
        lightColor: colors.accentBlueLight,
      });
      fullLinkedParts.push(linked);
      i++; // Skip next word as it's included
      continue;
    }

    // Linking /w/ - words ending in o, oo, ow sounds
    if (['o', 'w'].includes(lastChar) && vowels.includes(firstChar)) {
      const linked = `${currentWord}-w${nextWord}`;
      chunks.push({
        original: `${currentWord} ${nextWord}`,
        linked: linked,
        linkingType: '/w/',
        color: colors.accentPrimary,
        lightColor: colors.accentLight,
      });
      fullLinkedParts.push(linked);
      i++;
      continue;
    }

    // Linking /j/ - words ending in y, i, e sounds
    if (['y', 'i', 'e'].includes(lastChar) && vowels.includes(firstChar)) {
      const linked = `${currentWord}-y${nextWord}`;
      chunks.push({
        original: `${currentWord} ${nextWord}`,
        linked: linked,
        linkingType: '/j/',
        color: colors.accentPurple,
        lightColor: colors.accentPurpleLight,
      });
      fullLinkedParts.push(linked);
      i++;
      continue;
    }

    // Assimilation - "t you" -> "chu", "d you" -> "ju"
    if (
      (lastChar === 't' || lastChar === 'd') &&
      nextWord === 'you'
    ) {
      const linked = lastChar === 't'
        ? `${currentWord.slice(0, -1)}chu`
        : `${currentWord.slice(0, -1)}ju`;
      chunks.push({
        original: `${currentWord} ${nextWord}`,
        linked: linked,
        linkingType: 'Assim.',
        color: colors.accentOrange,
        lightColor: colors.accentOrangeLight,
      });
      fullLinkedParts.push(linked);
      i++;
      continue;
    }

    // No linking detected
    chunks.push({
      original: currentWord,
      linked: currentWord,
    });
    fullLinkedParts.push(currentWord);
  }

  return {
    fullLinked: fullLinkedParts.join(' '),
    chunks,
  };
}

export default function PracticeScreen({ navigation }: PracticeScreenProps) {
  const [sentence, setSentence] = useState('Can I have an apple');
  const [showIPA, setShowIPA] = useState(false);
  const [analysis, setAnalysis] = useState<ReturnType<typeof analyzeLinks> | null>(
    () => analyzeLinks('Can I have an apple')
  );

  const handleAnalyze = () => {
    if (sentence.trim()) {
      setAnalysis(analyzeLinks(sentence));
    }
  };

  const speakText = (text: string, rate: number = 1.0) => {
    Speech.speak(text.replace(/-/g, ' '), {
      language: 'en-US',
      rate,
    });
  };

  const speakChunk = (chunk: LinkingChunk) => {
    speakText(chunk.original, 0.8);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Practice</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Settings size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Enter a sentence</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.textInput}
              value={sentence}
              onChangeText={setSentence}
              placeholder="Type a sentence..."
              placeholderTextColor={colors.textTertiary}
              onSubmitEditing={handleAnalyze}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleAnalyze}>
              <ArrowRight size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Results Section */}
        {analysis && (
          <View style={styles.resultsSection}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Breakdown</Text>
              <View style={styles.ipaToggle}>
                <Text style={styles.ipaLabel}>IPA</Text>
                <Switch
                  value={showIPA}
                  onValueChange={setShowIPA}
                  trackColor={{ false: colors.bgMuted, true: colors.accentLight }}
                  thumbColor={colors.bgSurface}
                />
              </View>
            </View>

            <View style={styles.chunksCard}>
              {/* Linking Sound Overview */}
              <View style={styles.linkingSoundSection}>
                <Text style={styles.linkingSoundLabel}>Linking sound</Text>
                <View style={styles.linkingSoundRow}>
                  <Text style={styles.linkingOriginal}>"{sentence}"</Text>
                  <Text style={styles.linkingArrow}>→</Text>
                  <Text style={styles.linkingResult}>"{analysis.fullLinked}"</Text>
                </View>
              </View>

              {/* Chunks List */}
              <View style={styles.chunksList}>
                {analysis.chunks.map((chunk, index) => (
                  <View
                    key={index}
                    style={[
                      styles.chunkRow,
                      index < analysis.chunks.length - 1 && styles.chunkRowBorder,
                    ]}
                  >
                    <View style={styles.chunkLeft}>
                      <Text style={styles.chunkOriginal}>"{chunk.original}"</Text>
                      <Text style={styles.chunkArrow}>→</Text>
                      <Text
                        style={[
                          styles.chunkLinked,
                          chunk.color && { color: chunk.color },
                        ]}
                      >
                        "{chunk.linked}"
                      </Text>
                    </View>
                    <View style={styles.chunkRight}>
                      {chunk.linkingType && (
                        <View
                          style={[
                            styles.chunkBadge,
                            { backgroundColor: chunk.lightColor },
                          ]}
                        >
                          <Text style={[styles.chunkBadgeText, { color: chunk.color }]}>
                            {chunk.linkingType}
                          </Text>
                        </View>
                      )}
                      <TouchableOpacity
                        style={styles.chunkPlayButton}
                        onPress={() => speakChunk(chunk)}
                      >
                        <Volume2 size={16} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>

              {/* Audio Controls */}
              <View style={styles.audioControls}>
                <TouchableOpacity
                  style={styles.playNaturalButton}
                  onPress={() => speakText(sentence, 1.0)}
                >
                  <Play size={18} color="#FFFFFF" />
                  <Text style={styles.playNaturalText}>Play Natural</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.playSlowButton}
                  onPress={() => speakText(sentence, 0.6)}
                >
                  <Gauge size={18} color={colors.textSecondary} />
                  <Text style={styles.playSlowText}>Play Slow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {/* Legend */}
        <View style={styles.legendSection}>
          <Text style={styles.legendTitle}>Linking Types</Text>
          <View style={styles.legendGrid}>
            <View style={styles.legendColumn}>
              {linkingTypes.slice(0, 3).map((type) => (
                <View key={type.id} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: type.color }]} />
                  <Text style={styles.legendText}>{type.shortName}</Text>
                </View>
              ))}
            </View>
            <View style={styles.legendColumn}>
              {linkingTypes.slice(3, 6).map((type) => (
                <View key={type.id} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: type.color }]} />
                  <Text style={styles.legendText}>{type.shortName}</Text>
                </View>
              ))}
            </View>
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
    gap: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.bgSurface,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A1918',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  headerTitle: {
    fontSize: typography.sizes.headline,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  inputSection: {
    gap: spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  textInput: {
    flex: 1,
    height: 48,
    backgroundColor: colors.bgSurface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.base,
    fontSize: typography.sizes.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  submitButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.accentPrimary,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsSection: {
    gap: spacing.base,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultsTitle: {
    fontSize: typography.sizes.headline,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  ipaToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ipaLabel: {
    fontSize: typography.sizes.footnote,
    fontWeight: typography.weights.medium,
    color: colors.textTertiary,
  },
  chunksCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.lg,
    shadowColor: '#1A1918',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  linkingSoundSection: {
    gap: spacing.sm,
    paddingBottom: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  linkingSoundLabel: {
    fontSize: typography.sizes.footnote,
    fontWeight: typography.weights.medium,
    color: colors.textTertiary,
  },
  linkingSoundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  linkingOriginal: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
  },
  linkingArrow: {
    fontSize: typography.sizes.body,
    color: colors.textTertiary,
  },
  linkingResult: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    color: colors.accentPrimary,
  },
  chunksList: {
    gap: 0,
  },
  chunkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    gap: spacing.md,
  },
  chunkRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  chunkLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  chunkOriginal: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
  },
  chunkArrow: {
    fontSize: typography.sizes.body,
    color: colors.textTertiary,
  },
  chunkLinked: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  chunkRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  chunkBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  chunkBadgeText: {
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.semibold,
  },
  chunkPlayButton: {
    width: 32,
    height: 32,
    backgroundColor: colors.bgMuted,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  playNaturalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accentPrimary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  playNaturalText: {
    fontSize: 14,
    fontWeight: typography.weights.semibold,
    color: '#FFFFFF',
  },
  playSlowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.bgMuted,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
  },
  playSlowText: {
    fontSize: 14,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  legendSection: {
    gap: spacing.md,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
  legendGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  legendColumn: {
    flex: 1,
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: borderRadius.full,
  },
  legendText: {
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
  },
});
