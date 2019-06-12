package com.agentscove;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;

import android.widget.Toast;

public class CoveNativeModule extends ReactContextBaseJavaModule {

    public CoveNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "CoveNativeModule";
    }
    
     @ReactMethod
    public void showToast(String text) {
        Toast.makeText(getReactApplicationContext(), text, Toast.LENGTH_SHORT).show();
    }
}