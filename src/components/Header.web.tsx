import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../constants/theme';

type HeaderProps = {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
};

export default function Header({ title, onBack, rightElement }: HeaderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <View style={styles.container}>
      {onBack ? (
        <Pressable
          style={[styles.backButton, isHovered && styles.backButtonHovered]}
          onPress={onBack}
          // @ts-ignore - Web-only props
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ArrowLeft size={20} color={colors.textPrimary} />
        </Pressable>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      {rightElement || <View style={styles.placeholder} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    maxWidth: 600,
    width: '100%',
    alignSelf: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.bgSurface,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transitionDuration: '150ms',
    transitionProperty: 'background-color',
  } as any,
  backButtonHovered: {
    backgroundColor: colors.bgMuted,
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: typography.sizes.headline,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
});
