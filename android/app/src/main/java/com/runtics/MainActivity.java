package com.runtics;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.zapic.sdk.android.Zapic;
import org.devio.rn.splashscreen.SplashScreen; 
import android.os.Bundle; 
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Runtics";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SplashScreen.show(this); 
        Zapic.attachFragment(this);
    }
}
