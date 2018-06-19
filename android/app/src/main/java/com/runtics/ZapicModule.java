package com.runtics;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.facebook.react.bridge.WritableMap;
import com.zapic.sdk.android.Zapic;
import com.zapic.sdk.android.ZapicPlayer;

import org.json.JSONException;
import org.json.JSONObject;

public class ZapicModule extends ReactContextBaseJavaModule {
    public ZapicModule(final ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Zapic";
    }

    @ReactMethod
    public void getCurrentPlayer(final Callback callback) {
        final ZapicPlayer player = Zapic.getCurrentPlayer();
        if (player == null) {
            callback.invoke((Object) null);
        } else {
            final WritableMap map = Arguments.createMap();
            map.putString("playerId", player.getPlayerId());
            map.putString("notificationToken", player.getNotificationToken());
            callback.invoke(map);
        }
    }

    @ReactMethod
    public void handleInteraction(String data) {
        try {
            final JSONObject json = new JSONObject(data);
            Zapic.handleInteraction(json);
        } catch (JSONException ignored) {
        }
    }

    @ReactMethod
    public void showDefaultPage() {
        Zapic.showDefaultPage(this.getCurrentActivity());
    }

    @ReactMethod
    public void showPage(final String page) {
        Zapic.showPage(this.getCurrentActivity(), page);
    }

    @ReactMethod
    public void submitEvent(final String parameters) {
        Zapic.submitEvent(parameters);
    }
}