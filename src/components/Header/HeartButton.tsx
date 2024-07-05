import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useRecoilState} from 'recoil';
import HeartIcon from '../../assets/svg_images/heart.svg';
import {favoritesState, toggleFavorite} from '../../recoil';
import {COLORS, SPACING} from '../../theme/theme';
import GradientBGIcon from '../GradientBGIcon';

type HeartButtonPropsType = {
  id: number;
};

const HeartButton = ({id}: HeartButtonPropsType) => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const isFavorite = favorites.includes(id);

  const handlePress = () => {
    toggleFavorite(id, setFavorites);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <GradientBGIcon size={SPACING.space_30}>
        <HeartIcon
          fill={isFavorite ? COLORS.primaryRedHex : COLORS.secondaryWhiteHex}
          width={17}
          height={17}
        />
      </GradientBGIcon>
    </TouchableOpacity>
  );
};

export default HeartButton;
