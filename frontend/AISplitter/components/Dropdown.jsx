import React, {useState, useImperativeHandle} from 'react';
// import styles from './styles';
import Modal from 'react-native-modal';
import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    sideMenuStyle: {
        // width: screenSize.width * 0.75,
        // width: '75vw',
        // margin: 0,
        // position: 'fixed',
        // top: -100,
        // right: -100
    }
});
const Dropdown = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const toggleSideMenu = () => {
        setVisible(!visible);
    };
    useImperativeHandle(ref, () => ({
        toggleSideMenu: () => toggleSideMenu()
    }));
    return (
        <Modal
            isVisible={visible}
            onBackdropPress={toggleSideMenu} // Android back press
            onSwipeComplete={toggleSideMenu} // Swipe to discard
            // animationIn="slideInUp" // Has others, we want slide in from the left
            // animationOut="slideInDown" // When discarding the drawer
            swipeDirection="up" // Discard the drawer with swipe to left
            useNativeDriver // Faster animation
            hideModalContentWhileAnimating // Better performance, try with/without
            propagateSwipe // Allows swipe events to propagate to children components (eg a ScrollView inside a modal)
            style={styles.sideMenuStyle}
        >
            {props.children}
        </Modal>
    );
});

export default Dropdown;
