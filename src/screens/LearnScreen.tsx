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
import * as Speech from 'expo-speech';
import { ArrowLeft, Volume2 } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';
import { linkingTypes } from '../constants/linkingTypes';

type RootStackParamList = {
  Home: undefined;
  Practice: undefined;
  Learn: undefined;
};

type LearnScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Learn'>;
};

export default function LearnScreen({ navigation }: LearnScreenProps) {
  const speakExample = (text: string) => {
    Speech.speak(text, {
      language: 'en-US',
      rate: 0.8,
    });
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
          <Text style={styles.headerTitle}>Learn</Text>
          <View style={styles.headerButton} />
        </View>

        <Text style={styles.introText}>
          Tap any example to hear how the words link together in natural speech.
        </Text>

        {/* Linking Types */}
        {linkingTypes.map((type) => (
          <View key={type.id} style={styles.typeCard}>
            <View style={styles.typeHeader}>
              <View style={[styles.typeBadge, { backgroundColor: type.lightColor }]}>
                <Text style={[styles.typeBadgeText, { color: type.color }]}>
                  {type.shortName}
                </Text>
              </View>
              <Text style={styles.typeName}>{type.name}</Text>
            </View>

            <Text style={styles.typeDescription}>{type.description}</Text>

            <View style={styles.examplesContainer}>
              {type.examples.map((example, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.exampleRow}
                  onPress={() => speakExample(example.original)}
                  activeOpacity={0.7}
                >
                  <View style={styles.exampleContent}>
                    <Text style={styles.exampleOriginal}>"{example.original}"</Text>
                    <Text style={styles.exampleArrow}>→</Text>
                    <Text style={[styles.exampleLinked, { color: type.color }]}>
                      "{example.linked}"
                    </Text>
                  </View>
                  <View style={[styles.playButton, { backgroundColor: type.lightColor }]}>
                    <Volume2 size={16} color={type.color} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
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
  introText: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  typeCard: {
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
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  typeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: typography.sizes.footnote,
    fontWeight: typography.weights.semibold,
  },
  typeName: {
    fontSize: typography.sizes.headline,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    flex: 1,
  },
  typeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  examplesContainer: {
    gap: 0,
    marginTop: spacing.sm,
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  exampleContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  exampleOriginal: {
    fontSize: typography.sizes.body,
    color: colors.textSecondary,
  },
  exampleArrow: {
    fontSize: typography.sizes.body,
    color: colors.textTertiary,
  },
  exampleLinked: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
