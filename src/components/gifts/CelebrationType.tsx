import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import EnvelopeThemeCard from './EnvelopeThemeCard';

interface Theme {
  id: string;
  name: string;
  colors: string[];          // gradient colors
  image: string;
  primaryColor: string;
  description: string;
}

interface CelebrationTypeProps {
  celebrationType: string;
  setCelebrationType: (type: string) => void;
  celebrationTypes: Theme[];
}

const CelebrationType: React.FC<CelebrationTypeProps> = ({
  celebrationType,
  setCelebrationType,
  celebrationTypes,
}) => {
  const [numColumns, setNumColumns] = useState(2);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateLayout = () => {
      const width = Dimensions.get('window').width - 32; // minus padding
      let cols = 2;
      if (width >= 700) cols = 4;
      else if (width >= 400) cols = 3;
      setNumColumns(cols);

      const spacing = 12 * (cols - 1);
      setCardWidth((width - spacing) / cols);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener('change', updateLayout);
    return () => subscription?.remove();
  }, []);

  const renderItem = ({ item }: { item: Theme }) => (
    <View style={{ width: cardWidth }}>
      <EnvelopeThemeCard
        theme={item}
        isSelected={celebrationType === item.id}
        onSelect={() =>
          setCelebrationType(celebrationType === item.id ? '' : item.id)
        }
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Icon name="gift-outline" size={18} color="#7D1128" style={{ marginRight: 6 }} />
        <Text style={styles.headerTitle}>Select Celebration Type</Text>
      </View>

      <FlatList
        data={celebrationTypes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={numColumns}
        scrollEnabled={false} // avoid nested scroll warning
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        contentContainerStyle={{ paddingVertical: 8 }}
        extraData={celebrationType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E3A8A',
  },
});

export default CelebrationType;
