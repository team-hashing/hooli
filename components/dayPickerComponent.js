import React, { useState } from 'react';
import { Layout, Button, Text, Icon, Modal, Calendar } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const DayPickerComponent = ({ onDateChange }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setModalVisible] = useState(false);
  
  const handlePrevDay = () => {

    setSelectedDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 1)));
    onDateChange(selectedDate.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    if (isNextDayDisabled) {
      return;
    }
  
    setSelectedDate(prevDate => {
      const nextDate = new Date(prevDate.setDate(prevDate.getDate() + 1));
      return nextDate;
    });
    onDateChange(selectedDate.toISOString().split('T')[0]);
  };

  const handleDateTextClick = () => {
    setModalVisible(true);
  };

  const handleDateSelection = (date) => {
    const selectedDate = new Date(date.setDate(date.getDate() + 1));
    setSelectedDate(selectedDate);
    onDateChange(selectedDate.toISOString().split('T')[0]);
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
      <Modal 
          visible={isModalVisible}
          allowBackdrop={true} 
          onBackdropPress={() => setModalVisible(false)}
          backdropStyle={styles.backdrop}>
        <Calendar
          date={selectedDate}
          onSelect={handleDateSelection}
          max={today}
          style={styles.calendarStyle}
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
    padding: 10,
  },
  button: {
    borderRadius: 10,
    height: 20,
  },
  icons: {
    width: 20,
    height: 20,

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
  calendarStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default DayPickerComponent;