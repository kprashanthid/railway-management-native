import React from "react";
import { View, Text, Button, Modal, StyleSheet } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const TrainAddedSuccessfully = ({ visible, onClose }: Props) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.successText}>Train added successfully!</Text>
          <Button title="OK" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  successText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default TrainAddedSuccessfully;
