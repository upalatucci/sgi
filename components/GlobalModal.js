import React from 'react';
import Modal from './Modal';
import {HIDE_MODAL} from '../store/mutations';
import {connect} from 'react-redux';

const GlobalModal = ({modalIsVisible, modalMessage, hideModal}) => (
  <Modal
    modalVisible={modalIsVisible}
    onClose={hideModal}
    error={modalMessage}
  />
);

function mapStateToProps(state) {
  return {
    modalIsVisible: state.ui.modalIsVisible,
    modalMessage: state.ui.modalMessage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    hideModal: () => dispatch({type: HIDE_MODAL}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalModal);
