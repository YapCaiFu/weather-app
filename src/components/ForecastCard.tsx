import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { icBookmark, icBookmarkActive } from '../assets/icons';
import { Colors } from '../theme';
import fonts from '../theme/fonts';

interface ForecastCardProps {
  area: string;
  forecast: string;
  latitude: number | undefined;
  longitude: number | undefined;
  isFavourite: boolean;
  onToggleFavourite: () => void;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  area,
  forecast,
  latitude,
  longitude,
  isFavourite,
  onToggleFavourite,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.titleLabel}>{area}</Text>
        <Text style={styles.subtitleLabel}>{forecast}</Text>
        <Text style={styles.contentLabel}>latitude: {latitude}</Text>
        <Text style={styles.contentLabel}>longitude: {longitude}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Pressable onPress={onToggleFavourite}>
          <Image testID="bookmark-icon" source={isFavourite ? icBookmarkActive : icBookmark} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 0.8,
  },
  rightContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleLabel: {
    ...fonts(15, 'bold'),
    color: Colors.themeGreen,
  },
  subtitleLabel: {
    ...fonts(13, 'medium'),
    color: Colors.themeGreen07,
  },
  contentLabel: {
    ...fonts(10),
    color: Colors.textLightGrey,
  },
});

export default memo(ForecastCard);
