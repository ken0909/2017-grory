import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header/Header';
import InputDistance from '../components/InputDistance/InputDistance';
import Progress from '../components/Progress/Progress';
import { firebaseDbRef } from '../utils/FirebaseUtil';
import { getLocalStorageItem, setLocalStorage } from '../utils/LocalStorageUtil';

const deviceRef = firebaseDbRef('device');
if (!getLocalStorageItem('isAddedUserAgent')) {
    deviceRef.push({
        userAgent: navigator.userAgent,
        platform: navigator.platform,
    });
    setLocalStorage('isAddedUserAgent', 1);
}

const Root = () => (
    <MuiThemeProvider>
        <div className="Root">
            <Header />
            <Progress />
            <InputDistance />
        </div>
    </MuiThemeProvider>
);

export default Root;
