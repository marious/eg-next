import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import LoginForm from '~/components/auth/login-form';
import SignUpForm from '~/components/auth/sign-up-form';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(77,77,77,0.6)',
        zIndex: '9000',
    },
};

Modal.setAppElement('body');

function LoginModal() {
    const [open, setOpen] = useState(false);
    let timer;

    useEffect(() => {
        return () => {
            if (timer) clearTimeout(timer);
        };
    });

    function closeModal() {
        document
            .getElementById('login-modal')
            .classList.remove('ReactModal__Content--after-open');

        if (document.querySelector('.ReactModal__Overlay')) {
            document.querySelector('.ReactModal__Overlay').style.opacity = '0';
        }

        timer = setTimeout(() => {
            setOpen(false);
        }, 350);
    }

    function openModal(e) {
        e.preventDefault();
        setOpen(true);
    }

    return (
        <li>
            <a href="#" onClick={openModal}>
                Sign in / Sign up
            </a>
            {open ? (
                <Modal
                    isOpen={open}
                    style={customStyles}
                    contentLabel="login Modal"
                    className="modal-dialog"
                    overlayClassName="d-flex align-items-center justify-content-center"
                    id="login-modal"
                    onRequestClose={closeModal}
                    closeTimeoutMS={10}
                >
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                className="close"
                                onClick={closeModal}
                            >
                                <span aria-hidden="true">
                                    <i className="icon-close"></i>
                                </span>
                            </button>
                            <div className="form-box">
                                <div className="form-tab">
                                    <Tabs
                                        selectedTabClassName="show"
                                        defaultIndex={0}
                                    >
                                        <TabList className="nav nav-pills nav-fill">
                                            <Tab className="nav-item">
                                                <span className="nav-link">
                                                    Sign In
                                                </span>
                                            </Tab>

                                            <Tab className="nav-item">
                                                <span className="nav-link">
                                                    Register
                                                </span>
                                            </Tab>
                                        </TabList>

                                        <div className="tab-content">
                                            <TabPanel
                                                style={{ paddingTop: '2rem' }}
                                            >
                                                <LoginForm />
                                            </TabPanel>

                                            <TabPanel>
                                                <SignUpForm />
                                            </TabPanel>
                                        </div>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            ) : (
                ''
            )}
        </li>
    );
}

export default LoginModal;
