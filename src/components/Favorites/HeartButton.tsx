import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {editFavorites} from '../../api/apiUser';
import HeartIcon from '../../assets/svg_images/heart.svg';
import {COLORS, SPACING} from '../../theme/theme';
import GradientBGIcon from '../GradientBGIcon';

type HeartButtonPropsType = {
  id: number;
  isFavorite: boolean;
};

const HeartButton = ({id, isFavorite}: HeartButtonPropsType) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => editFavorites(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['get-coffee-and-beans']});
      queryClient.invalidateQueries({queryKey: ['get-coffee-details']});
      queryClient.invalidateQueries({queryKey: ['get-favorites']});
    },
    onError: error => {
      console.error(error);
      throw error;
    },
  });

  const handlePress = () => {
    mutation.mutate();
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
