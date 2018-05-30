package com.runtics;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.evollu.react.fa.FIRAnalyticsPackage;
import com.babisoft.ReactNativeLocalization.ReactNativeLocalizationPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import android.support.annotation.NonNull;
import android.util.Log;
import com.zapic.sdk.android.Zapic;
import com.zapic.sdk.android.ZapicPlayer;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
            new SplashScreenReactPackage(),
            new ZapicPackage(),
            new FIRAnalyticsPackage(),
            new ReactNativeLocalizationPackage(),
            new GoogleAnalyticsBridgePackage(),
            new RNSoundPackage(),
            new RNAdMobPackage(),
            new LinearGradientPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    Zapic.start(new Zapic.AuthenticationHandler() {
        @Override
        public void onLogin(@NonNull ZapicPlayer player) {
            Log.d("ZAPIC", "Player logged in: " + player.getPlayerId());        }

        @Override
        public void onLogout(@NonNull ZapicPlayer player) {
            Log.d("ZAPIC", "Player logged out: " + player.getPlayerId());
        }
    });
    SoLoader.init(this, /* native exopackage */ false);
  }
}
