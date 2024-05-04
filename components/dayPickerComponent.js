import React, { useState } from 'react';
import { Layout, Button, Text, Icon, Modal, Calendar } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const DayPickerComponent = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);

  console.log(today);
  console.log(selectedDate);

  const handlePrevDay = () => {
    console.log('prev day');
    setSelectedDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    if (isNextDayDisabled) {
      return;
    }
  
    console.log('aaaa day');
    setSelectedDate(prevDate => {
      const nextDate = new Date(prevDate.setDate(prevDate.getDate() + 1));
      return nextDate;
    });
  };

  const handleDateTextClick = () => {
    setModalVisible(true);
  };

  const handleDateSelection = (date) => {
    const selectedDate = new Date(date.setDate(date.getDate() + 1));
    console.log('bbb day');
    setSelectedDate(selectedDate);
    setModalVisible(false);
  };

  const isNextDayDisabled = new Date(selectedDate).setHours(0,0,0,1) >= new Date(today).setHours(0,0,0,1);
  
  return (
    <Layout style={styles.container}>
      <Button appearance='ghost' onPress={handlePrevDay}>
        <Layout style={styles.iconLayout}>
          <Icon style={styles.icons} name='arrow-back-outline' />
        </Layout>
      </Button>
      <Text style={styles.dateText} onPress={handleDateTextClick}>{selectedDate.toISOString().split('T')[0]}</Text>
      <Button appearance='ghost' onPress={handleNextDay}>
        <Layout style={styles.iconLayout}>
          <Icon style={styles.icons} fill={isNextDayDisabled? '#8F9BB3':'black'} name='arrow-forward-outline' />
        </Layout>
      </Button>
      <Modal visible={isModalVisible} allowBackdrop={true} onBackdropPress={() => setModalVisible(false)}>
        <Calendar
          date={selectedDate}
          onSelect={handleDateSelection}
          max={today}
        />
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
    height: 20,
    color: 'transparent',
  },
  icons: {
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
  },
  disabledIcon: {
    width: 20,
    height: 20,
    color: 'red',
    backgroundColor: 'disabled',
  },
  iconLayout: {
    backgroundColor: 'transparent',
  },
});

export default DayPickerComponent;